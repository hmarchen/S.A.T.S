import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { useRouter } from 'expo-router';
import ICAL from 'ical.js';

type CalendarEvent = {
  start: string; // or Date if you want to parse it later
  end: string;   // or Date
  // Add other properties as needed
};

const CalendarAvailability = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [availability, setAvailability] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [icsUrl, setIcsUrl] = useState(''); // State for the ICS URL

  const handleDownloadAndCheckAvailability = async () => {
    setLoading(true);
    setError(null);
    setAvailability([]);

    try {
      const response = await fetch('http://10.0.2.2:3001/download-ics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: icsUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to download ICS file');
      }

      const icsContent = await response.text();
      const jcalData = ICAL.parse(icsContent);
      const comp = new ICAL.Component(jcalData);
      const events = comp.getAllSubcomponents('vevent').map(vevent => {
        const event = new ICAL.Event(vevent);
        return {
          start: event.startDate.toJSDate(),
          end: event.endDate.toJSDate()
        };
      });

      // Check availability starting after next 24 hours and for the following 7 days
      const startDate = new Date();
      startDate.setHours(startDate.getHours() + 24, 0, 0, 0); // Start after 24 hours, at midnight
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6); // 7 days total (including start date)
      endDate.setHours(23, 59, 59, 999); // End at the last moment of the day

      const availableTimes: { date: string; slots: string[] }[] = [];

      // Initialize arrays for each day
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        availableTimes.push({ 
          date: new Date(d).toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
          }), 
          slots: [] 
        });
      }

      // Check availability for each day
      availableTimes.forEach((dayAvailability, dayIndex) => {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + dayIndex);
        
        // Generate all possible 30-minute slots between 9 AM and 5 PM
        for (let hour = 9; hour < 17; hour++) {
          for (let minute = 0; minute < 60; minute += 30) {
            const slotStart = new Date(currentDate);
            slotStart.setHours(hour, minute, 0, 0);
            
            const slotEnd = new Date(slotStart);
            slotEnd.setMinutes(slotStart.getMinutes() + 30);

            // Check if this slot overlaps with any events
            const isSlotBusy = events.some(event => {
              return event.start.toDateString() === currentDate.toDateString() &&
                     !(slotEnd <= event.start || slotStart >= event.end);
            });

            if (!isSlotBusy) {
              availableTimes[dayIndex].slots.push(
                `${slotStart.toLocaleTimeString('en-US', { 
                  hour: 'numeric', 
                  minute: '2-digit',
                  hour12: true 
                })} - ${slotEnd.toLocaleTimeString('en-US', { 
                  hour: 'numeric', 
                  minute: '2-digit',
                  hour12: true 
                })}`
              );
            }
          }
        }
      });

      // Format the availability data for display
      const formattedAvailability = availableTimes.flatMap(day => [
        `\n${day.date}:`,
        ...(day.slots.length > 0 
          ? day.slots.map(slot => `Available: ${slot}`)
          : ['No available slots'])
      ]);

      setAvailability(formattedAvailability);

      // Update the styles to show all results
      return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Check Calendar Availability</Text>
          <TextInput
            style={styles.input}
            placeholder="Paste your ICS link here"
            value={icsUrl}
            onChangeText={setIcsUrl}
          />
          <Pressable style={styles.button} onPress={handleDownloadAndCheckAvailability}>
            <Text style={styles.buttonText}>Download Calendar</Text>
          </Pressable>

          {loading && <ActivityIndicator size="large" color="#358f71" />}
          {error && <Text style={styles.errorText}>{error}</Text>}
          {availability.length > 0 && (
            <View style={styles.availabilityContainer}>
              <ScrollView style={styles.scrollView}>
                {availability.map((time, index) => (
                  <Text key={index} style={[
                    styles.availabilityText,
                    time.startsWith('\n') ? styles.dateHeader : null
                  ]}>
                    {time}
                  </Text>
                ))}
              </ScrollView>
            </View>
          )}
        </SafeAreaView>
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Check Calendar Availability</Text>
      <TextInput
        style={styles.input}
        placeholder="Paste your ICS link here"
        value={icsUrl}
        onChangeText={setIcsUrl}
      />
      <Pressable style={styles.button} onPress={handleDownloadAndCheckAvailability}>
        <Text style={styles.buttonText}>Download Calendar</Text>
      </Pressable>

      {loading && <ActivityIndicator size="large" color="#358f71" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {availability.length > 0 && (
        <View style={styles.availabilityContainer}>
          <ScrollView style={styles.scrollView}>
            {availability.map((time, index) => (
              <Text key={index} style={[
                styles.availabilityText,
                time.startsWith('\n') ? styles.dateHeader : null
              ]}>
                {time}
              </Text>
            ))}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5', // Light background
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 40,
    color: '#333333',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#358f71',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    color: '#dc3545',
    marginTop: 10,
    fontSize: 14,
  },
  availabilityContainer: {
    flex: 1,
    width: '100%',
    marginTop: 20,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  dateHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 16,
    color: '#358f71',
  },
  availabilityText: {
    marginTop: 8,
    fontSize: 16,
    color: '#333333',
    paddingVertical: 4,
  },
  input: {
    height: 50,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    color: '#333333',
  },
});

export default CalendarAvailability; 
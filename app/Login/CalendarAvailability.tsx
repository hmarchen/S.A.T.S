import React, { useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, SafeAreaView, ScrollView, ImageBackground, TextInput, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ICAL from 'ical.js';
import { Ionicons } from '@expo/vector-icons';
import styles from '../css/styles';

interface DayAvailability {
  date: string;
  slots: string[];
}

const CalendarAvailability = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [availability, setAvailability] = useState<DayAvailability[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [icsUrl, setIcsUrl] = useState('');

  const handleDownloadAndCheckAvailability = async () => {
    setLoading(true);
    setError(null);
    setAvailability([]);

    try {
      const response = await fetch('http://10.190.8.112:3000/download-ics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: icsUrl }),
      });

      if (!response.ok) throw new Error('Failed to download ICS file');

      const icsContent = await response.text();
      const jcalData = ICAL.parse(icsContent);
      const comp = new ICAL.Component(jcalData);
      const events = comp.getAllSubcomponents('vevent').map(vevent => {
        const event = new ICAL.Event(vevent);
        return {
          start: event.startDate.toJSDate(),
          end: event.endDate.toJSDate(),
        };
      });

      const startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      startDate.setDate(startDate.getDate() + 1);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6);

      const availableTimes: DayAvailability[] = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        return {
          date: date.toLocaleDateString('en-US', {
            weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
          }),
          slots: []
        };
      });

      availableTimes.forEach(day => {
        for (let hour = 9; hour < 17; hour++) {
          for (let minute = 0; minute < 60; minute += 30) {
            const slotStart = new Date(day.date);
            slotStart.setHours(hour, minute, 0, 0);
            const slotEnd = new Date(slotStart);
            slotEnd.setMinutes(slotStart.getMinutes() + 30);

            if (!events.some(event => slotEnd > event.start && slotStart < event.end)) {
              day.slots.push(
                `${slotStart.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} - ` +
                `${slotEnd.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`
              );
            }
          }
        }
      });

      setAvailability(availableTimes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.background} resizeMode="cover">
      <View style={styles.arrowContainer}>
        <Pressable style={styles.arrowButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </Pressable>
      </View>

      <View style={styles.transparentContainer}>
        <Text style={styles.whiteTitle}>Check Calendar Availability</Text>
        <TextInput
          style={styles.input}
          placeholder="Paste your ICS link here"
          placeholderTextColor="rgba(255,255,255,0.6)"
          value={icsUrl}
          onChangeText={setIcsUrl}
        />
        <Pressable style={[styles.arrowButton, styles.activeArrow]} onPress={handleDownloadAndCheckAvailability}>
          <Text style={styles.buttonText}>Download Calendar</Text>
        </Pressable>
        {loading && <ActivityIndicator size="large" color="#358f71" />}
        {error && <Text style={styles.errorText}>{error}</Text>}
        {availability.length > 0 && (
          <ScrollView style={styles.scrollView}>
            {availability.map((day, index) => (
              <View key={index}>
                <Text style={styles.dateHeader}>{day.date}</Text>
                {day.slots.length > 0 ? (
                  day.slots.map((slot, idx) => (
                    <Text key={idx} style={styles.availabilityText}>Available: {slot}</Text>
                  ))
                ) : (
                  <Text style={styles.availabilityText}>No available slots</Text>
                )}
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </ImageBackground>
  );
};

export default CalendarAvailability;

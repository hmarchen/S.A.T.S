import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from "react-native";
import { Calendar } from 'react-native-calendars';
import { useRouter } from "expo-router";
import Breadcrumb from "./breadcrumb";
import Arrows from "./arrows";
import styles from "../css/styles";
import * as FileSystem from "expo-file-system";
import ICAL from 'ical.js';

const filePath = FileSystem.documentDirectory + "user.json";
// This would typically come from your environment variables or config
const calendarUrl = "https://outlook.office365.com/owa/calendar/b325e82263a8475588faa2bbfc361837@dcmail.ca/d981e389098149ec940733ebd78594b21905603363431473149/calendar.ics";

interface Day {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

export default function AppointmentCalendar() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const checkAvailability = async (date: string) => {
    try {
      setLoading(true);
      const response = await fetch('http://10.0.2.2:3001/download-ics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: calendarUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to download calendar data');
      }

      const icsContent = await response.text();
      const jcalData = ICAL.parse(icsContent);
      const comp = new ICAL.Component(jcalData);
      const events = comp.getAllSubcomponents('vevent').map(vevent => {
        const event = new ICAL.Event(vevent);
        // Convert to local timezone and ensure dates are properly set
        const startDate = event.startDate.toJSDate();
        const endDate = event.endDate.toJSDate();
        return {
          start: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 
                         startDate.getHours(), startDate.getMinutes()),
          end: new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 
                       endDate.getHours(), endDate.getMinutes())
        };
      });

      // Set up the date to check (use the selected date but keep current time)
      const [year, month, day] = date.split('-').map(num => parseInt(num));
      const checkDate = new Date(year, month - 1, day); // month is 0-based in Date constructor
      const slots: string[] = [];

      // Generate all possible 30-minute slots between 9 AM and 5 PM
      for (let hour = 9; hour < 17; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const slotStart = new Date(year, month - 1, day, hour, minute);
          const slotEnd = new Date(year, month - 1, day, hour, minute + 30);

          // Check if this slot overlaps with any events
          const isSlotBusy = events.some(event => {
            // Compare dates using local time components
            const sameDay = event.start.getFullYear() === year &&
                          event.start.getMonth() === (month - 1) &&
                          event.start.getDate() === day;
            
            return sameDay && !(slotEnd <= event.start || slotStart >= event.end);
          });

          if (!isSlotBusy) {
            slots.push(
              slotStart.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
              })
            );
          }
        }
      }

      return slots;
    } catch (error) {
      console.error('Error checking availability:', error);
      Alert.alert('Error', 'Failed to check calendar availability');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleDayPress = async (day: Day) => {
    setSelectedDate(day.dateString);
    const slots = await checkAvailability(day.dateString);
    setAvailableSlots(slots);
  };

  const handleSubmit = async () => {
    try {
      if (!selectedDate) {
        Alert.alert("Error", "Please select a date before proceeding.");
        return;
      }

      if (availableSlots.length === 0) {
        Alert.alert("Error", "No available time slots for this date.");
        return;
      }

      const fileExists = await FileSystem.getInfoAsync(filePath);
      let updatedData = fileExists.exists ? JSON.parse(await FileSystem.readAsStringAsync(filePath)) : [];

      if (updatedData.length > 0) {
        updatedData[0].appointmentDate = selectedDate;
        updatedData[0].availableSlots = availableSlots;
      } else {
        updatedData.push({
          firstname: '',
          lastname: '',
          studentID: '',
          DCMail: '',
          campus: '',
          program: '',
          reason: '',
          appointmentDate: selectedDate,
          availableSlots: availableSlots,
          appointmentTime: '',
          appointmentType: ''
        });
      }

      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));

      console.log("Form Submitted: Calendar");
      console.log("Selected Date:", selectedDate);
      console.log("Available Slots:", availableSlots);
      console.log("Navigating to TimeSelection...");
      router.push("/Login/TimeSelection");

    } catch (error) {
      console.error(`Error writing to file (Date: ${selectedDate}):`, error);
      Alert.alert("Error", "Failed to save selected date.");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={20}>
      <Arrows handleSubmit={handleSubmit} router={router} />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Select an Appointment Date</Text>
        {loading && <ActivityIndicator size="large" color="#358f71" />}
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{ [selectedDate]: { selected: true, selectedColor: "#358f71" } }}
          style={{
            width: "100%",
            alignSelf: 'center',
            padding: 20,
            borderRadius: 10,
            backgroundColor: '#ffffff',
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            borderWidth: 2,
            borderColor: '#358f71',
          }}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#358f71',
            selectedDayBackgroundColor: '#358f71',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#358f71',
            dayTextColor: '#333',
            textDisabledColor: '#d9e1e8',
            dotColor: '#358f71',
            selectedDotColor: '#ffffff',
            arrowColor: '#358f71',
            monthTextColor: '#358f71',
            indicatorColor: '#358f71',
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textDayFontSize: 18,
            textMonthFontSize: 36,
            textDayHeaderFontSize: 16,
          }}
        />
        <Breadcrumb entities={['Disclaimer', 'StudentNumber', 'Firstname', 'Lastname', 'DCMail', 'Institution', 'Program', 'Reason', 'Calendar']} flowDepth={8} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

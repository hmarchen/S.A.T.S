import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  ScrollView,
  ImageBackground,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { useRouter } from 'expo-router';
import ICAL from 'ical.js';
import { Ionicons } from '@expo/vector-icons';
import styles from '../css/styles';

type CalendarEvent = {
  start: string;
  end: string;
};

const CalendarAvailability = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [availability, setAvailability] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [icsUrl, setIcsUrl] = useState('');

  const handleDownloadAndCheckAvailability = async () => {
    setLoading(true);
    setError(null);
    setAvailability([]);

    try {
      const response = await fetch('http://10.0.2.2:3000/download-ics', {
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
      startDate.setHours(startDate.getHours() + 24, 0, 0, 0);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);

      const availableTimes: { date: string; slots: string[] }[] = [];

      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        availableTimes.push({
          date: new Date(d).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          slots: [],
        });
      }

      availableTimes.forEach((dayAvailability, dayIndex) => {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + dayIndex);

        for (let hour = 9; hour < 17; hour++) {
          for (let minute = 0; minute < 60; minute += 30) {
            const slotStart = new Date(currentDate);
            slotStart.setHours(hour, minute, 0, 0);
            const slotEnd = new Date(slotStart);
            slotEnd.setMinutes(slotStart.getMinutes() + 30);

            const isSlotBusy = events.some(event => {
              return (
                event.start.toDateString() === currentDate.toDateString() &&
                !(slotEnd <= event.start || slotStart >= event.end)
              );
            });

            if (!isSlotBusy) {
              availableTimes[dayIndex].slots.push(
                `${slotStart.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                })} - ${slotEnd.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                })}`
              );
            }
          }
        }
      });

      const formattedAvailability = availableTimes.flatMap(day => [
        `\n${day.date}:`,
        ...(day.slots.length > 0
          ? day.slots.map(slot => `Available: ${slot}`)
          : ['No available slots']),
      ]);

      setAvailability(formattedAvailability);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
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
          <View style={styles.availabilityContainer}>
            <ScrollView style={styles.scrollView}>
              {availability.map((time, index) => (
                <Text
                  key={index}
                  style={[
                    styles.availabilityText,
                    time.startsWith('\n') ? styles.dateHeader : null,
                  ]}
                >
                  {time}
                </Text>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default CalendarAvailability;
import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator, Pressable, ImageBackground } from "react-native";
import { Calendar } from "react-native-calendars";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import styles from "../css/styles";
import * as FileSystem from "expo-file-system";
import ICAL from "ical.js";
import Breadcrumb from "./breadcrumb";

const filePath = FileSystem.documentDirectory + "user.json";
const calendarUrl = "https://outlook.office365.com/owa/calendar/b325e82263a8475588faa2bbfc361837@dcmail.ca/d981e389098149ec940733ebd78594b21905603363431473149/calendar.ics";

export default function AppointmentCalendar() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const todayStr = new Date().toISOString().split("T")[0];

  const fetchAvailability = async (date) => {
    setLoading(true);
    try {
      const response = await fetch("http://10.0.2.2:3000/download-ics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: calendarUrl }),
      });
      if (!response.ok) throw new Error("Failed to download calendar data");

      const icsContent = await response.text();
      const events = new ICAL.Component(ICAL.parse(icsContent))
        .getAllSubcomponents("vevent")
        .map(vevent => new ICAL.Event(vevent))
        .map(event => ({ start: event.startDate.toJSDate(), end: event.endDate.toJSDate() }));

      const [year, month, day] = date.split("-").map(Number);
      const slots = [];

      for (let hour = 9; hour < 17; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const slotStart = new Date(year, month - 1, day, hour, minute);
          const slotEnd = new Date(year, month - 1, day, hour, minute + 30);

          if (!events.some(event => !(slotEnd <= event.start || slotStart >= event.end))) {
            slots.push(slotStart.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }));
          }
        }
      }
      setAvailableSlots(slots);
    } catch (error) {
      Alert.alert("Error", "Failed to check calendar availability");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDayPress = async ({ dateString }) => {
    if (dateString < todayStr) return;
    setSelectedDate(dateString);
    await fetchAvailability(dateString);
  };

  const handleSubmit = async () => {
    if (!selectedDate || availableSlots.length === 0) {
      Alert.alert("Error", !selectedDate ? "Please select a date." : "No available time slots.");
      return;
    }
    try {
      const fileExists = await FileSystem.getInfoAsync(filePath);
      const userData = fileExists.exists ? JSON.parse(await FileSystem.readAsStringAsync(filePath)) : [{}];

      Object.assign(userData[0], { appointmentDate: selectedDate, availableSlots });
      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(userData, null, 2));
      router.push("/Login/TimeSelection");
    } catch (error) {
      Alert.alert("Error", "Failed to save selected date.");
      console.error(error);
    }
  };

  return (
    <ImageBackground source={require("../../assets/background.jpg")} style={styles.background} resizeMode="cover">
      <View style={styles.arrowContainer}>
        <Pressable style={styles.arrowButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </Pressable>
        <Pressable style={[styles.arrowButton, selectedDate ? styles.activeArrow : styles.disabledArrow]} onPress={handleSubmit} disabled={!selectedDate}>
          <Ionicons name="arrow-forward" size={32} color="white" />
        </Pressable>
      </View>
      <View style={styles.transparentContainer}>
        <Text style={styles.whiteTitle}>Select an Appointment Date</Text>
        {loading && <ActivityIndicator size="large" color="#358f71" />}
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{ [selectedDate]: { selected: true, selectedColor: "#358f71" } }}
          minDate={todayStr}
          disableAllTouchEventsForDisabledDays
          style={styles.calendar}
          theme={styles.calendarTheme}
        />
        <Breadcrumb entities={["Disclaimer", "StudentNumber", "Firstname", "Lastname", "DCMail", "Institution", "Program", "Reason", "Calendar"]} flowDepth={8} />
      </View>
    </ImageBackground>
  );
}

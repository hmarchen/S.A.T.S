import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator, Pressable, ImageBackground } from "react-native";
import { Calendar } from "react-native-calendars";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import styles from "../css/styles";
import * as FileSystem from "expo-file-system";
import ICAL from "ical.js";
import Breadcrumb from "./breadcrumb";
import Arrows from "./arrows";

const filePath = FileSystem.documentDirectory + "user.json";

export default function AppointmentCalendar() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const todayStr = new Date().toISOString().split("T")[0];
  // const [disabledWeekends, setDisabledWeekends] = useState<Array<string>>();

  const fetchAvailability = async (date: string) => {
    setLoading(true);
    try {
      const fileExists = await FileSystem.getInfoAsync(filePath);
      const userData = fileExists.exists ? JSON.parse(await FileSystem.readAsStringAsync(filePath)) : [{}];
      const calendarUrl = userData[0].ics;
      const response = await fetch("http://192.168.193.60:3000/download-ics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: calendarUrl }),
      });
      if (!response.ok) throw new Error("Failed to download calendar data");
      
      const [year, month, day] = date.split("-").map(Number);
      const slots = [];




      // const events = new ICAL.Component(ICAL.parse(icsContent))
      //   .getAllSubcomponents("vevent")
      //   .map(vevent => new ICAL.Event(vevent))
      //   .map(event => ({ start: event.startDate.toJSDate(), end: event.endDate.toJSDate() }));



      
      
      const targetDate = new Date(year, month - 1, day);
      const targetStart = new Date(targetDate);
      const targetEnd = new Date(targetDate);
      targetEnd.setHours(23, 59, 59, 999); // End of that day

      const icsContent = await response.text();
      const jcalData = ICAL.parse(icsContent);
      const comp = new ICAL.Component(jcalData);
      
      const RecEvents: Array<{start: Date, end: Date}> = [];
      
      const vevents = comp.getAllSubcomponents("vevent")
      .map(vevent => new ICAL.Event(vevent));

      vevents.forEach((vevent) => {
        const event = vevent;

        if (event.isRecurring()) {
          const iterator = event.iterator();
          let next;
          while ((next = iterator.next())) {
            const occurrence = event.getOccurrenceDetails(next);
            const start = occurrence.startDate.toJSDate();
            const end = occurrence.endDate.toJSDate();

            if (start >= targetStart && start <= targetEnd) {
              if (!occurrence.startDate.isDate && !occurrence.endDate.isDate) {
                RecEvents.push({ start, end });
              }
              break;
            }

            if (start > targetEnd) break; // Optimization
          }
        } 
        else {
          const start = event.startDate.toJSDate();
          const end = event.endDate.toJSDate();

          if (
            start.toDateString() === targetDate.toDateString() &&
            (!event.startDate.isDate || !event.endDate.isDate)
          ) {
            RecEvents.push({ start, end });
          }
        }
      });

      for (let hour = 9; hour < 16; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const slotStart = new Date(year, month - 1, day, hour, minute);
          const slotEnd = new Date(year, month - 1, day, hour, minute + 30);

          if (!RecEvents.some(event => !(slotEnd <= event.start || slotStart >= event.end)) && new Date < slotStart) {
            slots.push(slotStart.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }));
          }
        }
      }
      setAvailableSlots(slots);
      
      // No slots on weekends
      const dayOfWeek = new Date(year, month - 1, day).getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
      setAvailableSlots([]); 
      return;
      }
    } catch (error) {
      Alert.alert("Error", "Failed to check calendar availability");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDayPress = async ({ dateString }: { dateString: string }) => {
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
  // const getDisabledWeekends = () => {
  //   const disabledDates: Array<string> = [];
  //   const today = new Date();
  //   const daysToCheck = 90; // Number of days ahead to disable weekends
  
  //   for (let i = 0; i < daysToCheck; i++) {
  //     const date = new Date();
  //     date.setDate(today.getDate() + i);
  //     const day = date.getDay();
  
  //     if (day === 0 || day === 6) {
  //       const dateStr = date.toISOString().split('T')[0];
  //       disabledDates.push(dateStr);
  //     }
  //   }
  
  //   return disabledDates;
  // };

  
  // setDisabledWeekends(getDisabledWeekends())

  return (
    <ImageBackground source={require("../../assets/background.jpg")} style={styles.background} resizeMode="cover">

    {/* Arrows navigation */}
    <Arrows handleSubmit={handleSubmit} router={router} isValid={selectedDate != "" && loading === false}></Arrows>
      <View>
        <Text style={styles.whiteTitle}>Select an Appointment Date</Text>
        {loading && <ActivityIndicator size="large" color="#358f71" />}
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{ /*[disabledWeekends]: {disabled: true, disableTouchEvent: true},*/ [selectedDate]: { selected: true, selectedColor: "#358f71" } }}
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

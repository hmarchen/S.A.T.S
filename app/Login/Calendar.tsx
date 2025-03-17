import React from "react";
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { Calendar } from 'react-native-calendars';
import { useRouter } from "expo-router";
import Breadcrumb from "./breadcrumb";
import Arrows from "./arrows";
import styles from "../css/styles";
import * as FileSystem from "expo-file-system";

const filePath = FileSystem.documentDirectory + "user.json";

export default function AppointmentCalendar() {
  const router = useRouter();

  const handleSubmit = async () => {
    console.log("Form Submitted: Calendar");
    console.log("Navigating to TimeSelection...");
    router.push("/Login/TimeSelection");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={20}>
      <Arrows handleSubmit={handleSubmit} router={router} />
      <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select an Appointment Date</Text>
              <Calendar
                style={{
                  width: 1000,
                  alignSelf: 'center', // Centers the calendar on the screen
                  padding: 20, // Adds spacing for a cleaner look
                  borderRadius: 10, // Soft rounded edges
                  backgroundColor: '#ffffff', // Match radioGroup background
                  elevation: 4, // Adds a shadow for a raised look
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  borderWidth: 2, // Add a border like radioButton
                  borderColor: '#358f71', // Matches radioButton border
                }}
                theme={{
                  backgroundColor: '#ffffff', // Consistent white background
                  calendarBackground: '#ffffff', // Keep it aligned with radioGroup
                  textSectionTitleColor: '#358f71', // Matches radio button border
                  selectedDayBackgroundColor: '#358f71', // Keeps selection on theme
                  selectedDayTextColor: '#ffffff', // High contrast on selection
                  todayTextColor: '#358f71', // Highlight today with the theme color
                  dayTextColor: '#333', // Dark text for readability
                  textDisabledColor: '#d9e1e8',
                  dotColor: '#358f71', // Themed dots
                  selectedDotColor: '#ffffff',
                  arrowColor: '#358f71', // Themed arrows
                  monthTextColor: '#358f71',
                  indicatorColor: '#358f71',
                  textDayFontFamily: 'monospace',
                  textMonthFontFamily: 'monospace',
                  textDayHeaderFontFamily: 'monospace',
                  textDayFontSize: 24, // Increased for better visibility
                  textMonthFontSize: 36, // Bigger for emphasis
                  textDayHeaderFontSize: 16, // Consistent with others
                }}
              />
        <Breadcrumb entities={['Disclaimer', 'StudentNumber', 'Firstname', 'Lastname', 'DCMail', 'Institution', 'Program', 'Reason', 'Calendar']} flowDepth={8} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

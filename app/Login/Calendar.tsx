import React, { useState } from "react";
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { Calendar } from 'react-native-calendars';
import { useRouter } from "expo-router";
import Breadcrumb from "./breadcrumb";
import Arrows from "./arrows";
import styles from "../css/styles";
import * as FileSystem from "expo-file-system";

const filePath = FileSystem.documentDirectory + "user.json";

export default function AppointmentCalendar() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("");

  const handleDayPress = (day) => { setSelectedDate(day.dateString); };

 const handleSubmit = async () => {
     try {
         if (!selectedDate) {
             Alert.alert("Error", "Please select a date before proceeding.");
             return;
         }

         const fileExists = await FileSystem.getInfoAsync(filePath);
         let updatedData = fileExists.exists ? JSON.parse(await FileSystem.readAsStringAsync(filePath)) : [];

         if (updatedData.length > 0) {
             updatedData[0].date = selectedDate;
         } else {
             updatedData.push({
                 firstname: '',
                 lastname: '',
                 studentID: '',
                 DCMail: '',
                 campus: '',
                 program: '',
                 reason: '',
                 AppointmentDate: selectedDate,
                 time: '',
                 appointmentType: ''
             });
         }

         await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));

         console.log("Form Submitted: Calendar");
         console.log("Selected Date:", selectedDate);
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
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: "#358f71" } // Highlight selected date
          }}
          style={{
            width: 1000,
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
            textDayFontSize: 24,
            textMonthFontSize: 36,
            textDayHeaderFontSize: 16,
          }}
        />
        <Breadcrumb entities={['Disclaimer', 'StudentNumber', 'Firstname', 'Lastname', 'DCMail', 'Institution', 'Program', 'Reason', 'Calendar']} flowDepth={8} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

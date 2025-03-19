import React, { useState } from "react";
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { useRouter } from "expo-router";
import Breadcrumb from "./breadcrumb";
import Arrows from "./arrows";
import styles from "../css/styles";
import * as FileSystem from "expo-file-system";

const filePath = FileSystem.documentDirectory + "user.json";

const timeslots = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
];

const CustomRadioButton = ({ label, selected, onSelect }) => (
  <TouchableOpacity
    style={[
      styles.radioButton, { backgroundColor: selected ? "#007BFF" : "#FFF", borderColor: "#007BFF" }
    ]}
    onPress={() => onSelect(label)}>
    <Text style={{ color: selected ? "#FFF" : "#007BFF" }}>{label}</Text>
  </TouchableOpacity>
);

export default function TimeSelection() {
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedType, setAppointmentType] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const handleSubmit = async () => {
    console.log("Form Submitted: Time Selection");
    console.log("Selected Type:", selectedType);
    console.log("Selected Time:", selectedTime);
    router.push("/Login/EndScreen");
  };

  const HandleSubmit = async () => {
    if (selectedTime === '' || selectedType === '') {
      Alert.alert('Validation Error', 'Please select an appointment time and type.');
      return;
    }

    try {
      const fileExists = await FileSystem.getInfoAsync(filePath);
      let updatedData = [];

      if (fileExists.exists) {
        const fileContent = await FileSystem.readAsStringAsync(filePath);
        updatedData = fileContent ? JSON.parse(fileContent) : [];
      }

      if (updatedData.length > 0) {
        updatedData[0] = {
            ...updatedData[0], // Preserve existing data
            appointmentTime: selectedTime,
            appointmentType: selectedType,
          };
      }
       else {
        updatedData.push({
          firstname: '',
          lastname: '',
          studentID: '',
          DCMail: '',
          campus: '',
          program: '',
          reason: '',
          appointmentDate: '',
          appointmentTime: selectedTime,
          appointmentType: selectedType
        });
      }

      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
      console.log("Data saved successfully:", updatedData);
      router.push("/Login/EndScreen");
    } catch (error) {
      console.error("Error writing to file:", error);
      Alert.alert("Error", "Failed to save data.");
    }
  };


  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={20}>

      <SafeAreaView style={styles.container}>
          <Arrows handleSubmit={handleSubmit} router={router} />

          <Text style={styles.title}>Select an Appointment Time</Text>

          {/* Appointment Type Selection */}
          <View style={styles.radioContainer}>
              <CustomRadioButton
                  label="Online"
                  selected={selectedType === 'Online'}
                  onSelect={() => setAppointmentType('Online')}
              />
              <CustomRadioButton
                  label="In Person"
                  selected={selectedType === 'In Person'}
                  onSelect={() => setAppointmentType('In Person')}
              />
          </View>

          {/* Time Slots Grid */}
          <View style={styles.timeslotContainer}>
              {timeslots.map((time, index) => (
                  <View key={index} style={styles.timeslotItem}>
                      <CustomRadioButton
                          label={time}
                          selected={selectedTime === time}
                          onSelect={() => setSelectedTime(time)}
                      />
                  </View>
              ))}
          </View>

          <Breadcrumb
              entities={['Disclaimer', 'StudentNumber', 'Firstname', 'Lastname', 'DCMail', 'Institution', 'Program', 'Reason', 'Calendar']}
              flowDepth={8}
          />
      </SafeAreaView>


    </KeyboardAvoidingView>
  );
}

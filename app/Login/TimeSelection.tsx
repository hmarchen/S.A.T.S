import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { useRouter } from "expo-router";
import Breadcrumb from "./breadcrumb";
import Arrows from "./arrows";
import styles from "../css/styles";
import * as FileSystem from "expo-file-system";

const filePath = FileSystem.documentDirectory + "user.json";

interface CustomRadioButtonProps {
  label: string;
  selected: boolean;
  onSelect: (label: string) => void;
}

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({ label, selected, onSelect }) => (
  <TouchableOpacity
    style={[
      styles.radioButton,
      { backgroundColor: selected ? "#358f71" : "#FFF", borderColor: "#358f71" }
    ]}
    onPress={() => onSelect(label)}>
    <Text style={{ color: selected ? "#FFF" : "#358f71" }}>{label}</Text>
  </TouchableOpacity>
);

export default function TimeSelection() {
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedType, setAppointmentType] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const fileExists = await FileSystem.getInfoAsync(filePath);
      if (fileExists.exists) {
        const fileContent = await FileSystem.readAsStringAsync(filePath);
        const userData = JSON.parse(fileContent);
        if (userData.length > 0 && userData[0].availableSlots) {
          setAvailableSlots(userData[0].availableSlots);
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      setError("Failed to load available time slots");
    }
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
      } else {
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
      <SafeAreaView style={{ flex: 1, width: '100%' }}>
        <Arrows handleSubmit={HandleSubmit} router={router} />

        <Text style={styles.title}>Select an Appointment Time</Text>

        {/* Fixed Appointment Type Selection */}
        <View style={styles.fixedTypeContainer}>
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
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* Scrollable Time Slots */}
        <View style={styles.timeSlotScrollContainer}>
          <ScrollView 
            style={{ width: '100%' }}
            contentContainerStyle={styles.timeslotContainer}
            showsVerticalScrollIndicator={true}
          >
            {availableSlots.map((time, index) => (
              <View key={index} style={styles.timeslotItem}>
                <CustomRadioButton
                  label={time}
                  selected={selectedTime === time}
                  onSelect={() => setSelectedTime(time)}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={{ paddingVertical: 10 }}>
          <Breadcrumb
            entities={['Disclaimer', 'StudentNumber', 'Firstname', 'Lastname', 'DCMail', 'Institution', 'Program', 'Reason', 'Calendar']}
            flowDepth={8}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

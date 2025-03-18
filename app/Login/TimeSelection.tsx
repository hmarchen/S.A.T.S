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
  const [appointmentType, setAppointmentType] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const handleSubmit = async () => {
    console.log("Form Submitted: Calendar");
    console.log("Selected Time:", selectedTime);
    router.push("/Login/EndScreen");
  };

  const HandleSubmit = async () => {
      if (selectedTime === '') {
          Alert.alert('Validation Error', 'Please select an option');
          handleClear();
      }
      else {
          try {
            const fileExists = await FileSystem.getInfoAsync(filePath);
            let updatedData = fileExists.exists ? JSON.parse(await FileSystem.readAsStringAsync(filePath)) : [];

            updatedData.length > 0
              ? (updatedData[0].time = selectedTime)
              : updatedData.push(
                  {
                      firstname: '',
                      lastname: '',
                      studentID: '',
                      DCMail: '',
                      campus: '',
                      program: '',
                      reason: '',
                      AppointmentDate: '',
                      time: selectedTime,
                      appointmentType: appointmentType
                  }
              );

            await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
            console.log("Form Submitted: TimeSelection");
            console.log("Navigating to EndScreen...");
            router.push("/Login/EndScreen");
          } catch (error) {
            console.error("Error writing to file:", error);
            Alert.alert("Error", "Failed to save data.");
          }
      }
    };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={20}>

      <SafeAreaView style={styles.container}>
      <Arrows handleSubmit={handleSubmit} router={router} />
        <Text style={styles.title}>Select an Appointment Time</Text>
        <View style={[{ flexDirection: 'row', justifyContent: 'space-around' }]}>
            <CustomRadioButton label="Online" selected={appointmentType === 'Online'} onSelect={() => setAppointmentType('Online')}/>
            <CustomRadioButton label="In Person" selected={appointmentType === 'In Person'} onSelect={() => setAppointmentType('In Person')}/>
        </View>

        <View style={{ marginLeft: 100, flexDirection: "row", flexWrap: "wrap", gap: 2 }}>
          {timeslots.map((time, index) => (
            <View key={index} style={{ width: "30%" }}>
              <CustomRadioButton label={time} selected={selectedTime === time} onSelect = {() => setSelectedTime(time)} />
            </View>
          ))}
        </View>
        <Breadcrumb entities={['Disclaimer', 'StudentNumber', 'Firstname', 'Lastname', 'DCMail', 'Institution', 'Program', 'Reason', 'Calendar']} flowDepth={8} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

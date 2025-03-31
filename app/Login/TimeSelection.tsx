import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert, ScrollView  ImageBackground, Pressable, } from "react-native";
import { Calendar } from "react-native-calendars";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Breadcrumb from "./breadcrumb";
import styles from "../css/styles";
import * as FileSystem from "expo-file-system";

const filePath = FileSystem.documentDirectory + "user.json";

interface CustomRadioButtonProps {
  label: string;
  selected: boolean;
  onSelect: (label: string) => void;
}

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({
  label,
  selected,
  onSelect,
}) => (
  <TouchableOpacity
    style={[
      styles.radioButton,
      {
        backgroundColor: selected ? "#358f71" : "rgba(255, 255, 255, 0.1)",
        borderColor: "#ffffff",
        borderWidth: 2,
        margin: 5,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 90,
      },
    ]}
    onPress={() => onSelect(label)}
  >
    <Text
      style={[
        styles.radioButtonText,
        { color: selected ? "#ffffff" : "#ffffff", fontWeight: "bold" },
      ]}
      numberOfLines={1}
      adjustsFontSizeToFit
    >
      {label}
    </Text>
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
    if (selectedTime === "" || selectedType === "") {
      Alert.alert(
        "Validation Error",
        "Please select an appointment time and type."
      );
      return;
    } else {
      try {
        const fileExists = await FileSystem.getInfoAsync(filePath);
        let updatedData = [];

        if (fileExists.exists) {
          const fileContent = await FileSystem.readAsStringAsync(filePath);
          updatedData = fileContent ? JSON.parse(fileContent) : [];
        }

        if (updatedData.length > 0) {
          updatedData[0] = {
            ...updatedData[0],
            appointmentTime: selectedTime,
            appointmentType: selectedType,
          };
        } else {
          updatedData.push({
            firstname: "",
            lastname: "",
            studentID: "",
            DCMail: "",
            campus: "",
            program: "",
            reason: "",
            appointmentDate: "",
            appointmentTime: selectedTime,
            appointmentType: selectedType,
          });
        }

        await FileSystem.writeAsStringAsync(
          filePath,
          JSON.stringify(updatedData, null, 2)
        );
        console.log("Data saved successfully:", updatedData);
        router.push("/Login/EndScreen");
      } catch (error) {
        console.error("Error writing to file:", error);
        Alert.alert("Error", "Failed to save data.");
      }
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Arrow Navigation */}
      <View style={styles.arrowContainer}>
        <Pressable style={[styles.arrowButton, { position: "absolute", left: 10 }]} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </Pressable>

        <Pressable
          style={[
            styles.arrowButton,
            selectedTime && selectedType ? styles.activeArrow : styles.disabledArrow,
            { position: "absolute", right: 10 },
          ]}
          onPress={HandleSubmit}
          disabled={!selectedTime || !selectedType}
        >
          <Ionicons name="arrow-forward" size={32} color="white" />
        </Pressable>
      </View>

      <View style={styles.transparentContainer}>
        <Text style={styles.whiteTitle}>Select an Appointment Time</Text>

        {error && (
          <Text style={[styles.errorText, { marginVertical: 10 }]}>{error}</Text>
        )}

        {/* Appointment Type Selection */}
        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
          <CustomRadioButton
            label="Online"
            selected={selectedType === "Online"}
            onSelect={() => setAppointmentType("Online")}
          />
          <CustomRadioButton
            label="In Person"
            selected={selectedType === "In Person"}
            onSelect={() => setAppointmentType("In Person")}
          />
        </View>

        {/* Time Slot Selection */}
        <ScrollView
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            paddingHorizontal: 20, // Added padding to prevent overlap with arrows
            marginTop: 20,
          }}
          showsVerticalScrollIndicator={true}
        >
          {availableSlots.map((time, index) => (
            <View key={index} style={{ margin: 5, width: "30%" }}>
              <CustomRadioButton
                label={time}
                selected={selectedTime === time}
                onSelect={() => setSelectedTime(time)}
              />
            </View>
          ))}
        </ScrollView>

        <View style={styles.breadcrumbContainer}>
          <Breadcrumb
            entities={[
              "Disclaimer",
              "StudentNumber",
              "Firstname",
              "Lastname",
              "DCMail",
              "Institution",
              "Program",
              "Reason",
              "Calendar",
              "Time Selection",
            ]}
            flowDepth={9}
          />
        </View>
      </View>
    </ImageBackground>
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
	else {
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
	}
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={20}>
      <SafeAreaView style={{ flex: 1, width: '100%' }}>
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
          <Arrows handleSubmit={HandleSubmit} router={router} />
        </View>

        <View>
          <Breadcrumb
            entities={['Disclaimer', 'StudentNumber', 'Firstname', 'Lastname', 'DCMail', 'Institution', 'Program', 'Reason', 'Calendar']}
            flowDepth={8}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

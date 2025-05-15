import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Alert, ImageBackground, Pressable, ActivityIndicator, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import Breadcrumb from "./breadcrumb";
import styles from "../css/styles";
import Arrows from "./arrows";

const filePath = FileSystem.documentDirectory + "user.json";

interface RadioParams {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

const CustomRadioButton = ({ label, selected, onSelect }: RadioParams) => (
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
    onPress={onSelect}
  >
    <Text style={{ color: "#ffffff", fontWeight: "bold" }} numberOfLines={1} adjustsFontSizeToFit>
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
  const [isLoading, setIsLoading] = useState(true);

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
          console.log(userData[0].availableSlots);
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      setError("Failed to load available time slots");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedTime || !selectedType) {
      Alert.alert("Validation Error", "Please select an appointment time and type.");
      return;
    }

    try {
      const fileExists = await FileSystem.getInfoAsync(filePath);
      let updatedData = fileExists.exists
        ? JSON.parse(await FileSystem.readAsStringAsync(filePath))
        : [];

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

      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
      console.log("Data saved successfully:", updatedData);
      router.push("/Login/EndScreen");
    } catch (error) {
      console.error("Error writing to file:", error);
      Alert.alert("Error", "Failed to save data.");
    }
  };

  return (
    <ImageBackground source={require("../../assets/background.jpg")} style={styles.background} resizeMode="cover">
      {/* Arrows Navigation */}
      <Arrows handleSubmit={handleSubmit} router={router} isValid={(selectedTime && selectedType) != ""}></Arrows>

      <View style={styles.transparentContainer}>
        <Text style={styles.whiteTitle}>Select an Appointment Time</Text>
        {error && <Text style={[styles.errorText, { marginVertical: 10 }]}>{error}</Text>}
        {isLoading ? (
          <ActivityIndicator size="large" color="#358f71" />
        ) : (
          <>
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
              <CustomRadioButton label="Online" selected={selectedType === "Online"} onSelect={() => setAppointmentType("Online")} />
              <CustomRadioButton label="In Person" selected={selectedType === "In Person"} onSelect={() => setAppointmentType("In Person")} />
            </View>

            <ScrollView
              contentContainerStyle={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                paddingHorizontal: 20,
                marginTop: 20,
              }}
              showsVerticalScrollIndicator={false}
            >
              {availableSlots.map((time, index) => (
                <View key={index} style={{ margin: 5, width: "30%" }}>
                  <CustomRadioButton label={time} selected={selectedTime === time} onSelect={() => setSelectedTime(time)} />
                </View>
              ))}
            </ScrollView>

            <View style={styles.breadcrumbContainer}>
              <Breadcrumb
                entities={["Disclaimer", "StudentNumber", "Firstname", "Lastname", "DCMail", "Institution", "Program", "Reason", "Calendar", "Time Selection"]}
                flowDepth={9}
              />
            </View>
          </>
        )}
      </View>
    </ImageBackground>
  );
}

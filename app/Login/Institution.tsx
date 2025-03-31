import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ImageBackground,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import styles from "../css/styles";
import Breadcrumb from "./breadcrumb";
import { Ionicons } from "@expo/vector-icons";

const filePath = FileSystem.documentDirectory + "user.json";

export default function Institution() {
  const router = useRouter();
  const [institution, setInstitution] = useState("");

  const isValid = institution !== "";

  const handleClear = () => setInstitution("");

  const HandleSubmit = async () => {
    if (!isValid) {
      Alert.alert("Validation Error", "Please select a campus.");
      handleClear();
      return;
    }

    try {
      const fileExists = await FileSystem.getInfoAsync(filePath);
      let updatedData = fileExists.exists
        ? JSON.parse(await FileSystem.readAsStringAsync(filePath))
        : [];

      updatedData.length > 0
        ? (updatedData[0].campus = institution)
        : updatedData.push({
            firstname: "",
            lastname: "",
            studentID: "",
            DCMail: "",
            campus: institution,
            program: "",
            reason: "",
            appointmentDate: "",
            appointmentTime: "",
            appointmentType: "",
          });

      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
      console.log("✅ Form Submitted: Institution:", institution);
      router.push("/Login/Program");
    } catch (error) {
      console.error("❌ Error writing to file:", error);
      Alert.alert("Error", "Failed to save data.");
    }
  };

const CustomRadioButton = ({ label, selected, onSelect }) => (
  <Pressable
    onPress={onSelect}
    style={({ pressed }) => [
      styles.radioButton,
      {
        backgroundColor: selected ? '#358f71' : 'rgba(255, 255, 255, 0.1)',
        borderColor: '#ffffff',
        borderWidth: 2,
        opacity: pressed ? 0.8 : 1,
      },
    ]}
    android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
    hitSlop={10}
  >
    <Text style={[styles.radioButtonText, { color: '#fff', fontWeight: 'bold' }]}>
      {label}
    </Text>
  </Pressable>
);



  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Arrows */}
      <View style={styles.arrowContainer}>
        <Pressable style={styles.arrowButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </Pressable>

        <Pressable
          style={[styles.arrowButton, !isValid && styles.disabledArrow]}
          onPress={HandleSubmit}
          disabled={!isValid}
        >
          <Ionicons name="arrow-forward" size={32} color="white" />
        </Pressable>
      </View>

      {/* Content */}
      <View style={styles.transparentContainer}>
        <Text style={styles.whiteTitle}>Select Your Campus</Text>

        <View style={{ flexDirection: "row", justifyContent: "center", gap: 20, marginTop: 10 }}>
          <CustomRadioButton
            label="Whitby"
            selected={institution === "Whitby"}
            onSelect={() => setInstitution("Whitby")}
          />
          <CustomRadioButton
            label="Oshawa"
            selected={institution === "Oshawa"}
            onSelect={() => setInstitution("Oshawa")}
          />
        </View>


        <View style={styles.breadcrumbContainer}>
          <Breadcrumb
            entities={["Disclaimer", "Student ID", "Full Name", "DCMail", "Institution"]}
            flowDepth={4}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

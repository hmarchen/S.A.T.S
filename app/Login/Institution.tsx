import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ImageBackground, Alert, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import Breadcrumb from "./breadcrumb";
import { Ionicons } from "@expo/vector-icons";
import styles from "../css/styles";

const filePath = FileSystem.documentDirectory + "user.json";

const CustomRadioButton = ({ label, selected, onSelect }: { label: string, selected: boolean, onSelect: () => void }) => (
  <Pressable
    onPress={onSelect}
    style={[
      styles.radioButton,
      {
        backgroundColor: selected ? "#358f71" : "rgba(255, 255, 255, 0.1)",
        minWidth: 300, // Ensures button is large enough
        minHeight: 100,
        alignItems: "center",
        justifyContent: "center",
      },
    ]}
    android_ripple={{ color: "rgba(255,255,255,0.2)" }}
    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
  >
    <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 32 }} adjustsFontSizeToFit>
      {label}
    </Text>
  </Pressable>
);

export default function Institution() {
  const router = useRouter();
  const [institution, setInstitution] = useState('Oshawa');
  const [isValid, setIsValid] = useState(true);
  const [program, setProgram] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsValid(!!institution);
  }, [institution]);

  const handleSubmit = async () => {
    if (!isValid) {
      Alert.alert("Validation Error", "Please select a campus.");
      return;
    }

    try {
      const fileExists = await FileSystem.getInfoAsync(filePath);
      let updatedData = fileExists.exists ? JSON.parse(await FileSystem.readAsStringAsync(filePath)) : [];

      if (fileExists.exists) {
        const fileContents = await FileSystem.readAsStringAsync(filePath);
        updatedData = JSON.parse(fileContents);
      }

      updatedData.campus = institution;

      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
      console.log("✅ Form Submitted: Institution:", institution);
      router.push("/Login/Program");
    } catch (error) {
      console.error("❌ Error writing to file:", error);
      Alert.alert("Error", "Failed to save data.");
    }
  };

  return (
    <ImageBackground source={require("../../assets/background.jpg")} style={styles.background} resizeMode="cover">
      {/* Arrows */}
      <View style={styles.arrowContainer}>
        <Pressable style={styles.arrowButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </Pressable>

        <Pressable
          style={[styles.arrowButton, !isValid && styles.disabledArrow]}
          onPress={handleSubmit}
          disabled={!isValid}
        >
          <Ionicons name="arrow-forward" size={32} color="white" />
        </Pressable>
      </View>

      {/* Content */}
      <SafeAreaView style={styles.transparentContainer}>
        <Text style={styles.whiteTitle}>Select Your Campus</Text>

        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
          <CustomRadioButton label="Whitby" selected={institution === "Whitby"} onSelect={() => setInstitution("Whitby")} />
          <CustomRadioButton label="Oshawa" selected={institution === "Oshawa"} onSelect={() => setInstitution("Oshawa")} />
        </View>

        <View style={styles.breadcrumbContainer}>
          <Breadcrumb
            entities={["Disclaimer", "Student ID", "Full Name", "DCMail", "Institution"]}
            flowDepth={4}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

import React, { useState } from "react";
import { View, Text, TextInput, Alert, Pressable, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import Breadcrumb from "./breadcrumb";
import { Ionicons } from "@expo/vector-icons";
import styles from "../css/styles";
import * as FileSystem from "expo-file-system";

const filePath = FileSystem.documentDirectory + "user.json";

export default function DCMail() {
  const router = useRouter();
  const [DCMail, setMail] = useState("");

  const [error, setError] = useState('');

  const DCMailREGEX = /^[a-z]+(\.[a-z\d]+)?@dcmail\.ca$/;
  const isValid = DCMailREGEX.test(DCMail.trim());

  const validateEmail = () => {
    const trimmedMail = DCMail.trim();
    if (!trimmedMail) return "DC Mail address is required.";
    if (!DCMailREGEX.test(trimmedMail))
      return "Email must be lowercase and follow: firstname.lastname@dcmail.ca";
    return null;
  };

  const handleSubmit = async () => {
    const error = validateEmail();
    if (error) {
      Alert.alert("Validation Error", error);
      return;
    }

    try {
      const fileContent = await FileSystem.readAsStringAsync(filePath).catch(() => "[]");
      const updatedData = JSON.parse(fileContent);

      if (updatedData.length > 0) {
        updatedData[0].DCMail = DCMail;
      } else {
        updatedData.push({
          firstname: "",
          lastname: "",
          studentID: "",
          DCMail,
          campus: "",
          program: "",
          reason: "",
          appointmentDate: "",
          appointmentTime: "",
          appointmentType: "",
        });
      }

      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
      console.log("✅ Form Submitted: Email:", DCMail);
      router.push("/Login/Institution");
    } catch (error) {
      console.error("❌ Error writing to file:", error);
      Alert.alert("Error", "Failed to save data.");
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Navigation Arrows */}
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

      {/* Main UI */}
      <View style={styles.transparentContainer}>
        <Text style={styles.whiteTitle}>Enter your Durham College Email Address</Text>

        <TextInput
          style={styles.input}
          placeholder="Durham College Email"
          placeholderTextColor="rgba(255,255,255,0.6)"
          value={DCMail}
          //onChangeText={setMail}
          onChangeText={(text) => {
            setMail(text);
            const trimmed = text.trim();
            if (!trimmed) {
              setError("DC Mail address is required.");
            } else if (!DCMailREGEX.test(trimmed)) {
              setError("Email must be lowercase and follow: firstname.lastname@dcmail.ca");
            } else {
              setError('');
            }
          }}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {error ? <Text style={{ color: 'red', marginTop: 8 }}>{error}</Text> : null}

        <View style={styles.breadcrumbContainer}>
          <Breadcrumb entities={["Disclaimer", "StudentNumber", "Firstname", "Lastname", "DCMail"]} flowDepth={4} />
        </View>
      </View>
    </ImageBackground>
  );
}

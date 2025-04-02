import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import styles from "../css/styles";
import Breadcrumb from "./breadcrumb";
import { Ionicons } from "@expo/vector-icons";

const filePath = FileSystem.documentDirectory + "user.json";

export default function VisitReason() {
  const router = useRouter();
  const [visit, setVisit] = useState("");
  const [charCount, setCharCount] = useState(0);

  const VisitREGEX = /^.{200,}$/; // Requires at least 200 characters
  const isValid = VisitREGEX.test(visit);

  const REQ_ERROR = "A reason for visit is required.";
  const REG_ERROR = "Your reason must contain at least 200 characters.";

  const validateForm = () => {
    if (!visit) return REQ_ERROR;
    if (!VisitREGEX.test(visit)) return REG_ERROR;
    return null;
  };

  const handleSubmit = async () => {
    const error = validateForm();
    if (error) {
      Alert.alert("Validation Error", error);
      return;
    }

    try {
      const fileExists = await FileSystem.getInfoAsync(filePath);
      const updatedData = fileExists.exists
        ? JSON.parse(await FileSystem.readAsStringAsync(filePath))
        : [];

      if (updatedData.length > 0) {
        updatedData[0].reason = visit;
      } else {
        updatedData.push({
          firstname: "",
          lastname: "",
          studentID: "",
          DCMail: "",
          campus: "",
          program: "",
          reason: visit,
          appointmentDate: "",
          appointmentTime: "",
          appointmentType: "",
        });
      }

      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
      console.log("✅ Form Submitted: Reason");
      router.push("/Login/Calendar");
    } catch (error) {
      console.error("❌ Error writing to file:", error);
      Alert.alert("Error", "Failed to save data.");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.arrowContainer}>
        <Pressable style={styles.arrowButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </Pressable>

        <Pressable
          style={[styles.arrowButton, isValid ? styles.activeArrow : styles.disabledArrow]}
          onPress={handleSubmit}
          disabled={!isValid}
        >
          <Ionicons name="arrow-forward" size={32} color="white" />
        </Pressable>
      </View>

      <View style={styles.transparentContainer}>
        <Text style={styles.whiteTitle}>Reason for Visit</Text>

        <TextInput
          multiline
          numberOfLines={12}
          maxLength={2000}
          style={[styles.messageBox, { height: 250 }]}
          value={visit}
          onChangeText={(text) => {
            setVisit(text);
            setCharCount(text.length);
          }}
          placeholder="I want to visit my student advisor because..."
          placeholderTextColor="gray"
        />

        <View style={styles.counterContainer}>
          <Text style={[styles.charCounter, { color: charCount >= 200 ? 'lightgreen' : 'red' }]}>
            {charCount} / 200 characters
          </Text>
          <Text style={styles.statusSymbol}>{charCount >= 200 ? '✅' : '❌'}</Text>
        </View>

        <View style={styles.breadcrumbContainer}>
          <Breadcrumb entities={["Disclaimer", "StudentNumber", "Firstname", "Lastname", "DCMail", "Institution", "Program", "Reason"]} flowDepth={7} />
        </View>
      </View>
    </ImageBackground>
  );
}

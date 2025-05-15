import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, Alert, ImageBackground, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import styles from "../css/styles";
import Breadcrumb from "./breadcrumb";
import { Ionicons } from "@expo/vector-icons";

const filePath = FileSystem.documentDirectory + "user.json";
const { width } = Dimensions.get('window');
const textAreaWidth = Math.min(450, width * 0.85); // Cap width at 450px

export default function VisitReason() {
  const router = useRouter();
  const [visit, setVisit] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const VisitREGEX = /^.{100,}$/;
  const isValid = VisitREGEX.test(visit);

  const validateInput = () => {
    if (!visit.trim()) {
      setError("Please provide a reason for your visit.");
      return false;
    }
    if (visit.length < 100) {
      setError(`Please enter at least 100 characters (${100 - visit.length} more needed).`);
      return false;
    }
    setError(null);
    return true;
  };

  useEffect(() => {
    if (touched) {
      validateInput();
    }
  }, [visit]);

  const handleChangeText = (text: string) => {
    setVisit(text);
    setCharCount(text.length);
    setTouched(true);
  };

  const validateForm = () => {
    if (!visit.trim()) return "A reason for visit is required.";
    if (!VisitREGEX.test(visit)) return "Your reason must contain at least 100 characters.";
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

  const progressPercentage = Math.min(charCount / 100, 1) * 100;

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
        <Text style={styles.whiteTitle}>Tell Us Why You're Visiting</Text>
        
        <Text style={localStyles.subtitle}>
          Please provide details about your visit (minimum 100 characters/maximum 500 characters)
        </Text>

        <View style={[localStyles.textareaContainer, { width: textAreaWidth, height: 200 }]}>
          <ScrollView contentContainerStyle={localStyles.scrollViewContent}>
            <TextInput
              multiline
              style={localStyles.textarea}
              value={visit}
              onChangeText={handleChangeText}
              placeholder="I would like to meet with my student advisor because..."
              placeholderTextColor="rgba(255,255,255,0.5)"
              maxLength={500}
              numberOfLines={10}
              textAlignVertical="top"
            />
          </ScrollView>
        </View>

        {error && touched && (
          <Text style={[localStyles.errorText, { width: textAreaWidth }]}>
            {error}
          </Text>
        )}

        <View style={[localStyles.counterContainer, { width: textAreaWidth }]}>
          <View style={localStyles.progressBarBackground}>
            <View 
              style={[
                localStyles.progressBar, 
                { width: `${progressPercentage}%` },
                progressPercentage >= 100 ? localStyles.progressBarComplete : {}
              ]} 
            />
          </View>
          <Text style={localStyles.counterText}>
            {charCount} / 100 characters
            {charCount >= 100 ? " ✓" : ""}
          </Text>
        </View>

        <View style={styles.breadcrumbContainer}>
          <Breadcrumb entities={["Disclaimer", "StudentNumber", "Firstname", "Lastname", "DCMail", "Institution", "Program", "Reason"]} flowDepth={7} />
        </View>
      </View>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  textareaContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  textarea: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    padding: 12,
    lineHeight: 24,
    minHeight: 200, // Ensure the input can grow with content
  },
  counterContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  progressBarBackground: {
    width: '100%',
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 5,
    marginBottom: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FF6347',
    borderRadius: 5,
  },
  progressBarComplete: {
    backgroundColor: '#4CAF50',
  },
  counterText: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF6347',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  }
});

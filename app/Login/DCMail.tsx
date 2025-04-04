import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, Pressable, ImageBackground, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import Breadcrumb from "./breadcrumb";
import { Ionicons } from "@expo/vector-icons";
import styles from "../css/styles";
import * as FileSystem from "expo-file-system";

const filePath = FileSystem.documentDirectory + "user.json";

export default function DCMail() {
  const router = useRouter();
  const [DCMail, setMail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  
  const DCMailREGEX = /^[a-z]+(\.[a-z\d]+)?@dcmail\.ca$/;
  const isValid = DCMailREGEX.test(DCMail.trim());

  // Validate on every change once touched
  const validateInput = () => {
    const trimmedMail = DCMail.trim();
    if (!trimmedMail) {
      setError("DC Mail address is required.");
      return false;
    }
    if (!DCMailREGEX.test(trimmedMail)) {
      setError("Must be lowercase and follow: firstname.lastname@dcmail.ca");
      return false;
    }
    setError(null);
    return true;
  };

  // This ensures we check for errors on each keystroke after first interaction
  useEffect(() => {
    if (touched) {
      validateInput();
    }
  }, [DCMail]);

  // Force a validation check when user starts typing
  const handleChangeText = (text: string) => {
    setMail(text);
    setTouched(true);
  };

  const handleBlur = () => {
    setTouched(true);
    validateInput();
  };

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
        <SafeAreaView>
          <TextInput
            style={[
              styles.input, 
              (error && touched) ? { borderColor: '#FF6347', borderWidth: 2 } : {}
            ]}
            placeholder="Durham College Email"
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={DCMail}
            onChangeText={handleChangeText}
            autoCapitalize="none"
            keyboardType="email-address"
            onBlur={handleBlur}
          />
          
          {/* Enhanced error message styling */}
          {error && touched && (
            <Text style={{
              color: '#FF6347',
              backgroundColor: 'rgba(0,0,0,0.5)',
              padding: 10,
              borderRadius: 5,
              marginTop: 5,
              fontSize: 18,
              textAlign: 'center',
              marginBottom: 10,
              fontWeight: 'bold'
            }}>
              {error}
            </Text>
          )}
        </SafeAreaView>
        <View style={styles.breadcrumbContainer}>
          <Breadcrumb entities={["Disclaimer", "StudentNumber", "Firstname", "Lastname", "DCMail"]} flowDepth={4} />
        </View>
      </View>
    </ImageBackground>
  );
}

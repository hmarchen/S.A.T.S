import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput, Alert, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import Breadcrumb from "./breadcrumb";
import Arrows from './arrows';
import styles from "../css/styles";
import * as FileSystem from "expo-file-system";

const filePath = FileSystem.documentDirectory + "user.json";

export default function DCMail() {
  const router = useRouter();
  const [DCMail, setMail] = useState("");
  const DCMailREGEX = /^[a-z]+(\.[a-z]+)?@dcmail\.ca$/;
  const REQ_ERROR = "DC Mail address is required.";
  const REG_ERROR = "DC Mail address must have the following structure all lowercase: firstname.lastname@dcmail.ca";
  const handleClear = () => (setMail(''));

    /*
        Explanation of the regex:
        ^                 // Start of the string
        [a-z]+            // Ensures the email starts with at least one lowercase letter (a-z)
        (\.[a-z]+)?       // Optionally allows a single dot (.) followed by more lowercase letters
                          // The `?` makes this optional (e.g., "firstname.lastname" is allowed)
        @dcmail\.ca       // Ensures the domain is exactly "@dcmail.ca"
                          // The `\.` escapes the dot to match a literal "."
        $                 // End of the string (ensures no extra characters after "dcmail.ca")
    */
  const validateForm = () => {
    let errors = {};
    const trimmedMail = DCMail.trim();

    if (!trimmedMail) {
        errors.DCMail = REQ_ERROR;
        handleClear();
    }
    else if (!DCMailREGEX.test(trimmedMail)) {
        errors.DCMail = REG_ERROR;
        handleClear();
    }
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
        Alert.alert("Validation Error", Object.values(errors).join('\n'));
        return;
    }
    else {
        try {
          const fileExists = await FileSystem.getInfoAsync(filePath);
          let updatedData = fileExists.exists ? JSON.parse(await FileSystem.readAsStringAsync(filePath)) : [];

          updatedData.length > 0 ? (updatedData[0].DCMail = DCMail) :
          updatedData.push(
              {
                  firstname: "",
                  lastname: "",
                  studentID: "",
                  DCMail: DCMail,
                  campus: "",
                  program: "",
                  reason: ""
              }
          );

          await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
          console.log("Form Submitted: Email Address");
          console.log("Navigating to Institution...");
          router.push("/Login/Institution");
        }
        catch (error) {
          console.error("Error writing to file:", error);
          Alert.alert("Error", "Failed to save data.");
        }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={20}>
      <Arrows handleSubmit={handleSubmit} router={router} />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Enter your Durham College Email Address</Text>
        <TextInput style={styles.input} value={DCMail} onChangeText={setMail} autoCapitalize = "none" placeholder="Durham College Email Address" />
        <Breadcrumb entities={['Disclaimer', 'StudentNumber', 'Firstname', 'Lastname', 'DCMail']} flowDepth={4} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

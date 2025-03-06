import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput, Alert, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import Breadcrumb from "./breadcrumb";
import styles from "../css/styles";

const filePath = FileSystem.documentDirectory + "user.json";

export default function Institution() {
  const router = useRouter();
  const [institution, setInstitution] = useState("");

  const handleSubmit = async () => {
    try {
      const fileExists = await FileSystem.getInfoAsync(filePath);
      let updatedData = fileExists.exists ? JSON.parse(await FileSystem.readAsStringAsync(filePath)) : [];

      updatedData.length > 0
        ? (updatedData[0].campus = institution)
        : updatedData.push({ firstname: "", lastname: "", studentID: "", DCMail: "", campus: institution, program: "", reason: "" });

      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
      Alert.alert("Form Submitted", `${institution}`);
      console.log("Navigating to Program...");
      router.push("/Login/Program");
    } catch (error) {
      console.error("Error writing to file:", error);
      Alert.alert("Error", "Failed to save data.");
    }
  };

  const handleClear = () => (setInstitution(""));

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={20}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Institutional Information</Text>
        <TextInput style={styles.studentNumber} value={institution} onChangeText={setInstitution} placeholder="Campus Location" />
        <View style={styles.buttonContainer}>
          <Pressable style={[styles.button, styles.clearButton]} onPress={handleClear}>
            <Text style={styles.buttonText}>CLEAR</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>NEXT</Text>
          </Pressable>
        </View>
        <Breadcrumb entities={['Disclaimer', 'StudentNumber', 'Firstname', 'Lastname', 'DCMail', 'Institution']} flowDepth={5} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

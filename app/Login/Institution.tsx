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
  const [program, setProgram] = useState("");

  const handleSubmit = async () => {
    try {
      const fileExists = await FileSystem.getInfoAsync(filePath);
      let updatedData = fileExists.exists ? JSON.parse(await FileSystem.readAsStringAsync(filePath)) : [];

      updatedData.length > 0
        ? (updatedData[0].campus = institution, updatedData[0].program = program)
        : updatedData.push({ firstname: "", lastname: "", studentID: "", DCMail: "", campus: institution, program: program, reason: "" });

      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
      Alert.alert("Form Submitted", `${institution}, ${program}`);
      console.log("Navigating to Reason...");
      router.push("/Login/reason");
    } catch (error) {
      console.error("Error writing to file:", error);
      Alert.alert("Error", "Failed to save data.");
    }
  };

  const handleClear = () => (setInstitution(""), setProgram(""));

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={20}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Institutional Information</Text>
        <TextInput style={styles.studentNumber} value={institution} onChangeText={setInstitution} placeholder="Campus Location" />
        <TextInput style={styles.input} value={program} onChangeText={setProgram} placeholder="Program Name" />
        <View style={styles.buttonContainer}>
          <Pressable style={[styles.button, styles.clearButton]} onPress={handleClear}>
            <Text style={styles.buttonText}>CLEAR</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>NEXT</Text>
          </Pressable>
        </View>
        <Breadcrumb entities={["Disclaimer", "Full Name", "Student ID", "DCMail", "Institution"]} flowDepth={4} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

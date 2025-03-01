import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput, Alert, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import Breadcrumb from "./breadcrumb";
import styles from "../css/styles";
import * as FileSystem from "expo-file-system";

const filePath = FileSystem.documentDirectory + "user.json";

export default function DCMail() {
  const router = useRouter();
  const [DCMail, setMail] = useState("");

  const handleSubmit = async () => {
    try {
      const fileExists = await FileSystem.getInfoAsync(filePath);
      let updatedData = fileExists.exists ? JSON.parse(await FileSystem.readAsStringAsync(filePath)) : [];

      updatedData.length > 0 ? (updatedData[0].DCMail = DCMail) :
      updatedData.push({ firstname: "", lastname: "", studentID: "", DCMail, campus: "", program: "", reason: "" });

      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
      Alert.alert("Form Submitted", `Email Address: ${DCMail}`);
      console.log("Navigating to Institution...");
      router.push("/Login/Institution");
    }
    catch (error) {
      console.error("Error writing to file:", error);
      Alert.alert("Error", "Failed to save data.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={20}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Enter your Durham College Email Address</Text>
        <TextInput style={styles.input} value={DCMail} onChangeText={setMail} placeholder="Durham College Email Address" />
        <View style={styles.buttonContainer}>
          <Pressable style={[styles.button, styles.clearButton]} onPress={() => setMail("")}>
            <Text style={styles.buttonText}>CLEAR</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>NEXT</Text>
          </Pressable>
        </View>
        <Breadcrumb entities={["Disclaimer", "Full Name", "Student ID", "DCMail"]} flowDepth={3} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

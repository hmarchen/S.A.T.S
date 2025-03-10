import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput, Alert, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import Breadcrumb from "./breadcrumb";
import styles from "../css/styles";

const filePath = FileSystem.documentDirectory + "user.json";

export default function Program() {
  const router = useRouter();
  const [program, setProgram] = useState("");

  const HandleSubmit = async () => {
    try {
      const fileExists = await FileSystem.getInfoAsync(filePath);
      let updatedData = fileExists.exists ? JSON.parse(await FileSystem.readAsStringAsync(filePath)) : [];

      if (updatedData.length > 0) {
        updatedData[0].program = program;
      }

      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
      console.log("Navigating to Reason...");
      router.push("/Login/Reason");
    } catch (error) {
      console.error("Error writing to file:", error);
      Alert.alert("Error", "Failed to save data.");
    }
  };

  const handleClear = () => (setProgram(""));

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={20}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Program Information</Text>
        <TextInput style={styles.input} value={program} onChangeText={setProgram} placeholder="Program Name" />
        <View style={styles.buttonContainer}>
                  <Pressable style={[styles.button, styles.clearButton]} onPress={handleClear}>
                    <Text style={styles.buttonText}>CLEAR</Text>
                  </Pressable>
                  <Pressable style={styles.button} onPress={HandleSubmit}>
                    <Text style={styles.buttonText}>NEXT</Text>
                  </Pressable>
                </View>
        <Breadcrumb entities={['Disclaimer', 'StudentNumber', 'Firstname', 'Lastname', 'DCMail', 'Institution', 'Program']} flowDepth={6} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

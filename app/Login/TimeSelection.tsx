import React from "react";
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { Calendar } from 'react-native-calendars';
import { useRouter } from "expo-router";
import Breadcrumb from "./breadcrumb";
import Arrows from "./arrows";
import styles from "../css/styles";
import * as FileSystem from "expo-file-system";

const filePath = FileSystem.documentDirectory + "user.json";

export default function TimeSelection() {
  const router = useRouter();

  const handleSubmit = async () => {
    console.log("Form Submitted: Calendar");
    console.log("Navigating to EndScreen...");
    router.push("/Login/EndScreen");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={20}>
      <Arrows handleSubmit={handleSubmit} router={router} />
      <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select an Appointment Time</Text>
        <Text style={styles.title}>[INSERT TIME LIST ON RIGHT SIDE AND APPOINTMENT TYPE ON THE LEFT SIDE]</Text>
        <Breadcrumb entities={['Disclaimer', 'StudentNumber', 'Firstname', 'Lastname', 'DCMail', 'Institution', 'Program', 'Reason', 'Calendar']} flowDepth={8} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

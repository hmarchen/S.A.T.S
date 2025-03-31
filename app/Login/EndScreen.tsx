import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Card } from "@rneui/themed";
import * as FileSystem from "expo-file-system";
import Breadcrumb from "./breadcrumb";
import styles from "../css/styles";

export default function EndScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const filePath = FileSystem.documentDirectory + "user.json";

  useEffect(() => {
    const loadJsonFile = async () => {
      try {
        const fileInfo = await FileSystem.getInfoAsync(filePath);
        console.log(fileInfo.exists ? `File exists at: ${filePath}` : "File does not exist. Copying from assets...");

        if (!fileInfo.exists) {
          const userJson = require("../../assets/data/user.json");
          await FileSystem.writeAsStringAsync(filePath, JSON.stringify(userJson));
          console.log(`File copied to: ${filePath}`);
        }

        const data = JSON.parse(await FileSystem.readAsStringAsync(filePath));
        setUserData(data);
      } catch (error) {
        console.error("Error reading JSON file:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    loadJsonFile();
  }, []);

  const handleConfirm = async () => {
    try {
      
      if (userData) {
        await fetch('http://10.0.2.2:3000/send-invite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userData }),
        });
        
        Alert.alert("Success", "Invite sent successfully.");
        router.push("/Login/Disclaimer");
      }
    } catch (error) {
      console.error("Error sending invite:", error);
      Alert.alert("Error", "Failed to send invite.");
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#358f71" />
        <Text style={styles.text}>Loading user data...</Text>
      </SafeAreaView>
    );
  }

  if (!userData || !Array.isArray(userData) || userData.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>No user data found.</Text>
      </SafeAreaView>
    );
  }

  const {
    firstname = "N/A",
    lastname = "N/A",
    studentID = "N/A",
    DCMail = "N/A",
    campus = "N/A",
    program = "N/A",
    reason = "N/A",
    advisor = "N/A",
    appointmentDate = "N/A",
    appointmentTime = "N/A",
    appointmentType = "N/A",
  } = userData[0] || {};


  return (
    <SafeAreaView style={styles.container}>
      <Card containerStyle={{ marginTop: 15, marginBottom: 20 }}>
        <Card.Title>Thank you for your application!</Card.Title>
        <Card.Divider />
        <Text style={styles.text}>Your Details:</Text>
        <Text style={styles.text}>First Name: {firstname}</Text>
        <Text style={styles.text}>Last Name: {lastname}</Text>
        <Text style={styles.text}>Student ID: {studentID}</Text>
        <Text style={styles.text}>Email: {DCMail}</Text>
        <Text style={styles.text}>Campus: {campus}</Text>
        <Text style={styles.text}>Program: {program}</Text>
        <Text style={styles.text}>Advisor: {advisor}</Text>
        <Text style={styles.text}>Reason: {reason}</Text>
        <Text style={styles.text}>Date: {appointmentDate}</Text>
        <Text style={styles.text}>Time: {appointmentTime}</Text>
        <Text style={styles.text}>Appointment Type: {appointmentType}</Text>
      </Card>

      <Pressable style={styles.loginButton} onPress={handleConfirm} accessibilityLabel="Tap to confirm and return to the menu">
        <Text style={styles.buttonText}>Confirm Appointment</Text>
      </Pressable>

      <Breadcrumb entities={['Disclaimer', 'StudentNumber', 'Firstname', 'Lastname', 'DCMail', 'Institution', 'Program', 'Reason', 'Calendar', 'Time Selection', 'END']} flowDepth={10} />
    </SafeAreaView>
  );
}

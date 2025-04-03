import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Alert, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Card } from "@rneui/themed";
import * as FileSystem from "expo-file-system";
import Breadcrumb from "./breadcrumb";
import styles from "../css/styles";

interface LayoutProps {
  setRoute: (route: string) => void;
}

const EndScreen: React.FC<LayoutProps> = ({setRoute}) => {
  const router = useRouter();
  const isWeb = Platform.OS === 'web';
  const [userData, setUserData] = useState(null);
  const filePath = FileSystem.documentDirectory + "user.json";

  useEffect(() => {
    const loadJsonFile = async () => {
      try {
        if (isWeb) {
          const existingData = localStorage.getItem('user');
          const fileInfo = existingData ? JSON.parse(existingData) : [];
  
          if (!fileInfo.exists) {
            const userJson = require("../../assets/data/user.json");
            localStorage.setItem('user', JSON.stringify(userJson));
            console.log(`File copied to: ${filePath}`);
          }

          setUserData(fileInfo);
        }
        else {
          const fileInfo = await FileSystem.getInfoAsync(filePath);
          console.log(fileInfo.exists ? `File exists at: ${filePath}` : "File does not exist. Copying from assets...");

          if (!fileInfo.exists) {
            const userJson = require("../../assets/data/user.json");
            await FileSystem.writeAsStringAsync(filePath, JSON.stringify(userJson));
            console.log(`File copied to: ${filePath}`);
          }

          setUserData(JSON.parse(await FileSystem.readAsStringAsync(filePath)));
        }
      } catch (error) {
        console.error("Error reading JSON file:", error);
      }
    };

    loadJsonFile();
  }, []);

  const handleConfirm = async () => {
    try {
      if (userData) {
        // Modify the userData object here if necessary before saving
        await FileSystem.writeAsStringAsync(filePath, JSON.stringify(userData, null, 2));
        Alert.alert("Success", "User data saved successfully.");
        router.push("/Login/Disclaimer");
      }
    } catch (error) {
      console.error("Error writing to file:", error);
      Alert.alert("Error", "Failed to save data.");
    }
  };

  if (!userData) return <SafeAreaView style={styles.container}><Text style={styles.text}>Loading user data...</Text></SafeAreaView>;

  const { firstname, lastname, studentID, DCMail, campus, program, reason } = userData[0];

  return (
    <SafeAreaView style={styles.container}>
      <Card containerStyle={{ marginTop: 15, marginBottom: 20 }}>
        <Card.Title>Thank you for your application!</Card.Title>
        <Text style={styles.text}>Your Details:</Text>
        <Text style={styles.text}>First Name: {firstname}</Text>
        <Text style={styles.text}>Last Name: {lastname}</Text>
        <Text style={styles.text}>Student ID: {studentID}</Text>
        <Text style={styles.text}>Email: {DCMail}</Text>
        <Text style={styles.text}>Campus: {campus}</Text>
        <Text style={styles.text}>Program: {program}</Text>
        <Text style={styles.text}>Reason: {reason}</Text>
      </Card>

      <Pressable style={styles.loginButton} onPress={handleConfirm} accessibilityLabel="Tap to confirm and return to the menu">
        <Text style={styles.buttonText}>Confirm Appointment</Text>
      </Pressable>

      <Breadcrumb entities={['Disclaimer', 'StudentNumber', 'Firstname', 'Lastname', 'DCMail', 'Institution', 'Program', 'Reason', 'END']} flowDepth={8} />
    </SafeAreaView>
  );
}

export default EndScreen;
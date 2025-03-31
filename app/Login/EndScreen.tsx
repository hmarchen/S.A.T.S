import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
  ImageBackground,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
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
        setLoading(false);
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
        router.push("/Login/AppConfirmation");
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
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.arrowContainer}>
        <Pressable style={styles.arrowButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </Pressable>
      </View>

      <View style={styles.transparentContainer}>
        <Text style={styles.whiteTitle}>Thank You for Your Application!</Text>

        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
            width: "100%",
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 10,
              padding: 20,
              marginVertical: 20,
              width: "100%",
              backgroundColor: "rgba(255,255,255,0.05)"
            }}
          >
            <Text style={{ color: "white", fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
              Your Details:
            </Text>
            <Text style={{ color: "white", fontSize: 16 }}>First Name: {firstname}</Text>
            <Text style={{ color: "white", fontSize: 16 }}>Last Name: {lastname}</Text>
            <Text style={{ color: "white", fontSize: 16 }}>Student ID: {studentID}</Text>
            <Text style={{ color: "white", fontSize: 16 }}>Email: {DCMail}</Text>
            <Text style={{ color: "white", fontSize: 16 }}>Campus: {campus}</Text>
            <Text style={{ color: "white", fontSize: 16 }}>Program: {program}</Text>
            <Text style={{ color: "white", fontSize: 16 }}>Reason: {reason}</Text>
            <Text style={{ color: "white", fontSize: 16 }}>Advisor: {advisor}</Text>
            <Text style={{ color: "white", fontSize: 16 }}>Date: {appointmentDate}</Text>
            <Text style={{ color: "white", fontSize: 16 }}>Time: {appointmentTime}</Text>
            <Text style={{ color: "white", fontSize: 16 }}>Appointment Type: {appointmentType}</Text>
          </View>

          <Pressable
            onPress={handleConfirm}
            style={{
              backgroundColor: "#007C41",
              paddingVertical: 20,
              paddingHorizontal: 50,
              borderRadius: 10,
              marginBottom: 25,
              elevation: 4,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
              Confirm Appointment
            </Text>
          </Pressable>
        </ScrollView>

        <View style={styles.breadcrumbContainer}>
          <Breadcrumb
            entities={[
              "Disclaimer",
              "StudentNumber",
              "Firstname",
              "Lastname",
              "DCMail",
              "Institution",
              "Program",
              "Reason",
              "Calendar",
              "Time Selection",
              "END"
            ]}
            flowDepth={10}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

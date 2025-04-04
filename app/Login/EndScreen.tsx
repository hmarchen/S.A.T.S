import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import {
  View,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from "react-native";
=======
import { View, Text, Pressable, Alert, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
>>>>>>> f2ce5511a0e46cbc1cd88c913bde165ac763111a
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import Breadcrumb from "./breadcrumb";
import { Card } from "@rneui/themed";
import styles from "../css/styles";
import e from "express";

<<<<<<< HEAD

const filePath = FileSystem.documentDirectory + "user.json";

export default function EndScreen() {
=======
interface LayoutProps {
  setRoute: (route: string) => void;
}

const EndScreen: React.FC<LayoutProps> = ({setRoute}) => {
>>>>>>> f2ce5511a0e46cbc1cd88c913bde165ac763111a
  const router = useRouter();
  const isWeb = Platform.OS === 'web';
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJsonFile = async () => {
      try {
<<<<<<< HEAD
        const fileInfo = await FileSystem.getInfoAsync(filePath);

        if (!fileInfo.exists) {
          await FileSystem.copyAsync({
            from: FileSystem.bundleDirectory + "assets/data/user.json",
            to: filePath,
          });
          console.log(`File copied to: ${filePath}`);
=======
        if (isWeb) {
          const existingData = localStorage.getItem('student');
          const fileInfo = existingData ? JSON.parse(existingData) : [];
  
          if (!fileInfo.exists) {
            const userJson = require("../../assets/data/user.json");
            localStorage.setItem('student', JSON.stringify(userJson));
            console.log(`File copied to: ${filePath}`);
          }

          setUserData(fileInfo);
>>>>>>> f2ce5511a0e46cbc1cd88c913bde165ac763111a
        }
        else {
          const fileInfo = await FileSystem.getInfoAsync(filePath);
          console.log(fileInfo.exists ? `File exists at: ${filePath}` : "File does not exist. Copying from assets...");

<<<<<<< HEAD
        const data = JSON.parse(await FileSystem.readAsStringAsync(filePath));
        setUserData(data.length > 0 ? data[0] : {});
=======
          if (!fileInfo.exists) {
            const userJson = require("../../assets/data/user.json");
            await FileSystem.writeAsStringAsync(filePath, JSON.stringify(userJson));
            console.log(`File copied to: ${filePath}`);
          }

          setUserData(JSON.parse(await FileSystem.readAsStringAsync(filePath)));
        }
>>>>>>> f2ce5511a0e46cbc1cd88c913bde165ac763111a
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
<<<<<<< HEAD
        await fetch("http://192.168.2.29:3000/send-invite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
        router.push("/Login/AppConfirmation");
=======
        // Modify the userData object here if necessary before saving
        if (isWeb) {
          localStorage.setItem('student', JSON.stringify(userData, null, 2));
          alert("User data saved successfully.");
          setRoute('disclaimer');
        }
        else {
          await FileSystem.writeAsStringAsync(filePath, JSON.stringify(userData, null, 2));
          Alert.alert("Success", "User data saved successfully.");
          router.push("/Login/Disclaimer");
        }
>>>>>>> f2ce5511a0e46cbc1cd88c913bde165ac763111a
      }
    } catch (error) {
      console.error("Error sending invite:", error);
      Alert.alert("Error", "Failed to send invite.");
    }
  };

  // Loading State
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#358f71" />
        <Text style={styles.text}>Loading user data...</Text>
      </SafeAreaView>
    );
  }

  // No User Data Found
  if (!userData || Object.keys(userData).length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>No user data found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView>
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Back Button */}
      <View style={styles.arrowContainer}>
        <Pressable style={styles.arrowButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </Pressable>
      </View>
      
      <SafeAreaView style={styles.transparentContainer}>
        {/* Card Container */}
        <Card containerStyle={styles.cardContainer}>
          <Card.Title style={styles.cardTitle}>Thank You for Your Application!</Card.Title>
          <Card.Divider />

          <View style={styles.detailsContainer}>
            {[
              { key: "firstname", label: "First Name" },
              { key: "lastname", label: "Last Name" },
              { key: "studentID", label: "Student ID" },
              { key: "DCMail", label: "DC Email" },
              { key: "campus", label: "Campus" },
              { key: "program", label: "Program" },
              { key: "advisor", label: "Advisor" },
              { key: "reason", label: "Reason" },
            ].map(({ key, label }) => (
              <View key={key} style={styles.detailRow}>
                <Text style={styles.detailLabel}>{label}:</Text>
                <Text style={styles.detailValue}>{userData[key] || "N/A"}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Confirm Button */}
        <View style={styles.buttonContainer}>
          <Pressable onPress={handleConfirm} style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
          </Pressable>
        </View>

        {/* Breadcrumb */}
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
              "END",
            ]}
            flowDepth={10}
          />
        </View>
      </SafeAreaView>
      
    </ImageBackground>
    </ScrollView>
  );
}

export default EndScreen;
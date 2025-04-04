import React, { useEffect, useState } from "react";
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
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import Breadcrumb from "./breadcrumb";
import { Card } from "@rneui/themed";
import styles from "../css/styles";


const filePath = FileSystem.documentDirectory + "user.json";

export default function EndScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJsonFile = async () => {
      try {
        const fileInfo = await FileSystem.getInfoAsync(filePath);

        if (!fileInfo.exists) {
          await FileSystem.copyAsync({
            from: FileSystem.bundleDirectory + "assets/data/user.json",
            to: filePath,
          });
          console.log(`File copied to: ${filePath}`);
        }

        const data = JSON.parse(await FileSystem.readAsStringAsync(filePath));
        setUserData(data.length > 0 ? data[0] : {});
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
        await fetch("http://192.168.2.29:3000/send-invite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
        router.push("/Login/AppConfirmation");
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

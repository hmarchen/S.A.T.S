import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Alert, ActivityIndicator, ImageBackground, ScrollView } from "react-native";
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
        await fetch("http://10.0.2.2:3000/send-invite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
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

  if (!userData || Object.keys(userData).length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>No user data found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <ImageBackground source={require("../../assets/background.jpg")} style={styles.background} resizeMode="cover">
      <View style={styles.arrowContainer}>
        <Pressable style={styles.arrowButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </Pressable>
      </View>

      <View style={styles.transparentContainer}>
        <Text style={styles.whiteTitle}>Thank You for Your Application!</Text>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Your Details:</Text>
            {Object.entries(userData).map(([key, value]) => (
              <Text key={key} style={styles.detailsText}>{`${key.replace(/([A-Z])/g, " $1").trim()}: ${value || "N/A"}`}</Text>
            ))}
          </View>
          <Pressable onPress={handleConfirm} style={styles.confirmButton}>
            <Text style={styles.confirmText}>Confirm Appointment</Text>
          </Pressable>
        </ScrollView>
        <View style={styles.breadcrumbContainer}>
          <Breadcrumb entities={["Disclaimer", "StudentNumber", "Firstname", "Lastname", "DCMail", "Institution", "Program", "Reason", "Calendar", "Time Selection", "END"]} flowDepth={10} />
        </View>
      </View>
    </ImageBackground>
  );
}

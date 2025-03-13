import React from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Breadcrumb from "./breadcrumb";
import styles from "../css/styles";

export default function LoginScreen() {
  const router = useRouter();

  // List of required information
  const requiredInfo = [
    "First Name",
    "Last Name",
    "Student Number",
    "Durham College Email Address",
    "Purpose of Visit"
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to Durham College</Text>
      <Text style={styles.paragraph}>
        Please have the following information ready to register for an appointment:
      </Text>
      <View style={styles.listContainer}>
        {requiredInfo.map((item, index) => (
          <Text key={index} style={styles.listItem}>
            • {item}
          </Text>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.clearButton]}
          onPress={() => router.push("/")}
        >
          <Text style={styles.buttonText}>DISAGREE</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => router.push("/Login/StudentNumber")}
        >
          <Text style={styles.buttonText}>AGREE</Text>
        </Pressable>
      </View>

      <View style={styles.breadcrumbContainer}>
        <Breadcrumb entities={["Disclaimer"]} flowDepth={0} />
      </View>
    </SafeAreaView>
  );
}

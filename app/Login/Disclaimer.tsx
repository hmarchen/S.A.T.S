import React from "react";
import { View, Text, Pressable, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Breadcrumb from "./breadcrumb";
import styles from "../css/styles";

export default function LoginScreen() {
  const router = useRouter();

  const requiredInfo = [
    "First Name",
    "Last Name",
    "Student Number",
    "Durham College Email Address",
    "Purpose of Visit",
  ];

  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.transparentContainer}>
        <Text style={styles.whiteTitle}>Welcome to Durham College</Text>

        <Text style={styles.whiteParagraph}>
          Please have the following information ready to register for an appointment:
        </Text>

        <View style={styles.transparentList}>
          {requiredInfo.map((item, index) => (
            <Text key={index} style={styles.whiteListItem}>
              • {item}
            </Text>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.clearButton, { borderRadius: 40 }]}
            onPress={() => router.push("/")}
          >
            <Text style={styles.buttonText}>DISAGREE</Text>
          </Pressable>

          <Pressable
            style={[styles.button, { borderRadius: 40 }]}
            onPress={() => router.push("/Login/StudentNumber")}
          >
            <Text style={styles.buttonText}>AGREE</Text>
          </Pressable>
        </View>

        <View style={styles.breadcrumbContainer}>
          <Breadcrumb entities={["Disclaimer"]} flowDepth={0} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

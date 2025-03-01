import React from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Breadcrumb from "./breadcrumb";
import styles from "../css/styles";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.paragraph}>
        Make sure you have the following information in order to register for an appointment:
      </Text>
      <Text style={styles.list}>
        First Name | Last Name | Student Number | Durham College Email Address | Purpose of Visit
      </Text>
      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, styles.clearButton]} onPress={() => router.push("/")}>
          <Text style={styles.buttonText}>DISAGREE</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => router.push("/Login/StudentName")}>
          <Text style={styles.buttonText}>AGREE</Text>
        </Pressable>
      </View>
      <Breadcrumb entities={["Disclaimer"]} flowDepth={0} />
    </SafeAreaView>
  );
}

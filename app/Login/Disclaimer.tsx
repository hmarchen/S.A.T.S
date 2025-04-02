import React from "react";
import { View, Text, Pressable, ImageBackground, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Breadcrumb from "./breadcrumb";
import styles from "../css/styles";

const requiredInfo = [
  "First Name",
  "Last Name",
  "Student Number",
  "Durham College Email Address",
  "Purpose of Visit",
];

const CustomButton = ({ title, onPress, isClear = false }: { title: string, onPress: () => void, isClear?: boolean }) => (
  <Pressable
    style={[styles.button, isClear && styles.clearButton, { borderRadius: 40 }]}
    onPress={onPress}
    accessibilityRole="button"
  >
    <Text style={styles.buttonText}>{title}</Text>
  </Pressable>
);

export default function LoginScreen() {
  const router = useRouter();

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

        <FlatList
          data={requiredInfo}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.whiteListItem}>• {item}</Text>}
          contentContainerStyle={styles.translucentContainer} // Make sure this has proper padding
          style={{ marginTop: 60 }} // Add marginBottom to create space between list and buttons
        />

        <View style={styles.buttonContainer}>
          <CustomButton title="DISAGREE" onPress={() => router.push("/")} isClear />
          <CustomButton title="AGREE" onPress={() => router.push("/Login/StudentNumber")} />
        </View>

        <View style={styles.breadcrumbContainer}>
          <Breadcrumb entities={["Disclaimer"]} flowDepth={0} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

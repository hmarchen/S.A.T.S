import React from "react";
<<<<<<< HEAD
import { View, Text, Pressable, ImageBackground, FlatList } from "react-native";
=======
import { View, Text, Pressable, Platform } from "react-native";
>>>>>>> f2ce5511a0e46cbc1cd88c913bde165ac763111a
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Breadcrumb from "./breadcrumb";
import styles from "../css/styles";

<<<<<<< HEAD
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
=======
interface LayoutProps {
  setRoute: (route: string) => void;
}

const Disclaimer: React.FC<LayoutProps> = ({setRoute}) => {
  const isWeb = Platform.OS === 'web';
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
      {isWeb ? (
        <View style={styles.buttonContainer}>
          <Pressable style={[styles.button, styles.clearButton]} onPress={() => setRoute("disclaimer")}>
            <Text style={styles.buttonText}>DISAGREE</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => setRoute("studentNumber")}>
            <Text style={styles.buttonText}>AGREE</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Pressable style={[styles.button, styles.clearButton]} onPress={() => router.push("/")}>
            <Text style={styles.buttonText}>DISAGREE</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => router.push("/Login/StudentNumber")}>
            <Text style={styles.buttonText}>AGREE</Text>
          </Pressable>
        </View>
      )}
      <Breadcrumb entities={["Disclaimer"]} flowDepth={0} />
    </SafeAreaView>
>>>>>>> f2ce5511a0e46cbc1cd88c913bde165ac763111a
  );
}

export default Disclaimer;
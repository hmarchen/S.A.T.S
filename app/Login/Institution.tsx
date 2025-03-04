import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput, Alert, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import Breadcrumb from "./breadcrumb";
import styles from "../css/styles";
import { TouchableOpacity } from "react-native";
import { error } from "console";

const filePath = FileSystem.documentDirectory + "user.json";

export default function Institution() {
  const router = useRouter();
  const [institution, setInstitution] = useState("");
  const [program, setProgram] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const fileExists = await FileSystem.getInfoAsync(filePath);
      let updatedData = fileExists.exists ? JSON.parse(await FileSystem.readAsStringAsync(filePath)) : [];

      updatedData.length > 0
        ? (updatedData[0].campus = institution, updatedData[0].program = program)
        : updatedData.push({ firstname: "", lastname: "", studentID: "", DCMail: "", campus: institution, program: program, reason: "" });

      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
      Alert.alert("Form Submitted", `${institution}, ${program}`);
      console.log("Navigating to Reason...");
      router.push("/Login/reason");
    } catch (error) {
      console.error("Error writing to file:", error);
      Alert.alert("Error", "Failed to save data.");
    }
  };
  // Radio button for office selection
  const CustomRadioButton = ({ label, selected, onSelect }) => (
    <TouchableOpacity
        style={[styles.radioButton,
        { backgroundColor: selected ? '#007BFF' : '#FFF' }]}
        onPress={onSelect}
    >
        <Text style={[styles.radioButtonText,
        { color: selected ? '#FFF' : '#000' }]}>
            {label}
        </Text>
    </TouchableOpacity>
);
  // TODO fetch data from end point
  const FetchData = async(url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
      console.log("advisors: " + response)
    }
    catch {
      console.log('Error: ' + error);
    }
  };

  const getData = () => {
    FetchData('http://localhost:3000/advisors');
     return data;
  }

  const handleClear = () => (setInstitution(""), setProgram(""));

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={20}>
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Institutional Information</Text>
      
      {/* <TextInput style={styles.studentNumber} value={institution} onChangeText={setInstitution} placeholder="Campus Location" /> */}
      <View style={[{ flexDirection: 'row', justifyContent: 'space-around' }]}>
            <CustomRadioButton
                label="Whitby"
                selected={institution === 'Whitby'}
                onSelect={() => setInstitution('Whitby')}
            />
            <CustomRadioButton
                label="Oshawa"
                selected={institution === 'Oshawa'}
                onSelect={() => setInstitution('Oshawa')}
            />
        </View>
      <TextInput style={styles.input} value={program} onChangeText={getData} placeholder="Program Name" />
      

      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, styles.clearButton]} onPress={handleClear}>
          <Text style={styles.buttonText}>CLEAR</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>NEXT</Text>
        </Pressable>
      </View>

      <Breadcrumb entities={['Disclaimer', 'Student ID', 'Full Name', 'DCMail', 'Institution']} flowDepth={4} />
    </SafeAreaView>
  </KeyboardAvoidingView>
);
}

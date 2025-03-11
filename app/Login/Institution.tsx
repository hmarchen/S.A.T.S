import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput, Alert, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import Breadcrumb from "./breadcrumb";
import styles from "../css/styles";
import { TouchableOpacity } from "react-native";
import { AutocompleteDropdown, AutocompleteDropdownItem } from 'react-native-autocomplete-dropdown'

const filePath = FileSystem.documentDirectory + "user.json";

export default function Institution() {
  const router = useRouter();
  const [institution, setInstitution] = useState("");
  const [program, setProgram] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (institution === '') {
        Alert.alert('Validation Error', 'Please select an option');
        handleClear();
    }
    else {
        try {
          const fileExists = await FileSystem.getInfoAsync(filePath);
          let updatedData = fileExists.exists ? JSON.parse(await FileSystem.readAsStringAsync(filePath)) : [];

          updatedData.length > 0
            ? (updatedData[0].campus = institution)
            : updatedData.push({ firstname: "", lastname: "", studentID: "", DCMail: "", campus: institution, program: "", reason: "" });

          await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
          console.log("Form Submitted: Institution");
          console.log("Navigating to Program...");
          router.push("/Login/Program");
        } catch (error) {
          console.error("Error writing to file:", error);
          Alert.alert("Error", "Failed to save data.");
        }
    }
  };
  // Radio button for office selection
  const CustomRadioButton = ({ label, selected, onSelect }) => (
    <TouchableOpacity
        style={[styles.radioButton,
        { backgroundColor: selected ? '#358f71' : '#FFF' }]}
        onPress={onSelect}
    >
        <Text style={[styles.radioButtonText,
        { color: selected ? '#FFF' : '#000' }]}>
            {label}
        </Text>
    </TouchableOpacity>
);
  // TODO fetch data from end point
  // const FetchData = async(url) => {
  //   try {
  //     const response = await fetch(url);
  //     const json = await response.json();
  //     setData(json);
  //     console.log("advisors: " + response)
  //   }
  //   catch {
  //     console.log('Error: ' + error);
  //   }
  // };

  const getData = async() => {
    try {
      const response = await fetch('http://10.0.2.2:3000/advisors');
      const json = await response.json();
      console.log("ada: " + json);
      return json;
    }
    catch(e) {

      console.error(e);
    }
  }

  const handleClear = () => (setInstitution(""), setProgram(""));
  const [selectedItem, setSelectedItem] = useState<AutocompleteDropdownItem | null>(null);

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


      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>NEXT</Text>
        </Pressable>
      </View>

      <Breadcrumb entities={['Disclaimer', 'Student ID', 'Full Name', 'DCMail', 'Institution']} flowDepth={4} />
    </SafeAreaView>
  </KeyboardAvoidingView>
);
}

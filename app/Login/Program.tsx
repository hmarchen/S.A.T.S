import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, Alert, ImageBackground, FlatList, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import Breadcrumb from "./breadcrumb";
import styles from "../css/styles";

const filePath = FileSystem.documentDirectory + "user.json";

interface Advisor {
  advisor: string;
  email: string;
  programs: string;
}

export default function Program() {
  const router = useRouter();
  const [program, setProgram] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [programs, setPrograms] = useState<string[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<string[]>([]);
  const [advisorData, setAdvisorData] = useState<Advisor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPrograms();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPrograms(programs);
    } else {
      setFilteredPrograms(programs.filter(p =>
        p.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    }
  }, [searchQuery, programs]);

  const fetchPrograms = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://10.0.2.2:3001/advisors');
      if (!response.ok) throw new Error('Failed to fetch programs');
      const data: Advisor[] = await response.json();

      // Extract unique programs
      const uniquePrograms = Array.from(new Set(
        data.map(advisor => advisor.programs.split('\n')).flat()
      )).filter(program => program !== 'PROGRAMS:' && program !== '');

      setAdvisorData(data);
      setPrograms(uniquePrograms);
      setFilteredPrograms(uniquePrograms);
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectProgram = (selectedProgram: string) => {
    setProgram(selectedProgram);
    setSearchQuery(selectedProgram);
  };

  const handleClear = () => {
    setProgram("");
    setSearchQuery("");
  };

  const HandleSubmit = async () => {
    if (!program) {
      Alert.alert("Error", "Please enter your program");
      return;
    }

    try {
      const fileExists = await FileSystem.getInfoAsync(filePath);
      let updatedData = fileExists.exists ? JSON.parse(await FileSystem.readAsStringAsync(filePath)) : [];

      if (!Array.isArray(updatedData)) {
        updatedData = [];
      }

      // Find advisor data for selected program
      const selectedAdvisor = advisorData.find(advisor =>
        advisor.programs.split('\n').includes(program)
      );

      if (updatedData.length > 0) {
        updatedData[0].program = program;
        if (selectedAdvisor) {
          updatedData[0].advisor = selectedAdvisor.advisor;
          updatedData[0].email = selectedAdvisor.email;
        }
      }

      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
      router.push("/Login/Reason");
    } catch (error) {
      console.error("Error saving program:", error);
      Alert.alert("Error", "Failed to save program information");
    }
  };

  return (
    <ImageBackground
    source={require("../../assets/background.jpg")}
    style={styles.background}
    resizeMode="cover"
  >
    <View style={styles.arrowContainer}>
      <Pressable style={styles.arrowButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={32} color="white" />
      </Pressable>
      <Pressable
        style={[styles.arrowButton, program ? styles.activeArrow : styles.disabledArrow]}
        onPress={HandleSubmit}
        disabled={!program}
      >
        <Ionicons name="arrow-forward" size={32} color="white" />
      </Pressable>
    </View>

    <View style={styles.transparentContainer}>
      <Text style={styles.whiteTitle}>Program Information</Text>
      <SafeAreaView>
	      <TextInput
	        style={styles.input}
	        value={searchQuery}
	        onChangeText={(text) => {
	          setSearchQuery(text);
	        }}
	        placeholder="Search for a program..."
	        placeholderTextColor="#ddd"
	      />
	  </SafeAreaView>
      <View style={{ maxHeight: 300, width: "90%", marginVertical: 20, zIndex: 1 }}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#358f71" />
        ) : (
          <FlatList
            data={filteredPrograms}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.button, { marginVertical: 2, paddingVertical: 15, paddingHorizontal: 30 }]}
                onPress={() => handleSelectProgram(item)}
              >
                <Text style={styles.buttonText}>{item}</Text>
              </TouchableOpacity>

            )}
            style={{ width: "100%" }}
            keyboardShouldPersistTaps="handled"
          />
        )}
      </View>

      <View style={styles.breadcrumbContainer}>
        <Breadcrumb
          entities={["Disclaimer", "StudentNumber", "Firstname", "Lastname", "DCMail", "Institution", "Program"]}
          flowDepth={6}
        />
      </View>
    </View>
  </ImageBackground>
  );
}
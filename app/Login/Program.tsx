import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Pressable, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from "expo-router";
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
      const response = await fetch('http://10.0.2.2:3000/advisors');
      if (!response.ok) throw new Error('Failed to fetch programs');
      const data: Advisor[] = await response.json();
      
      // Extract unique programs
      const uniquePrograms = Array.from(new Set(
        data.map(advisor => advisor.programs.split('\n')).flat()
      )).filter(program => program !== 'PROGRAMS:' && program !== '');
      
      setPrograms(uniquePrograms);
      setFilteredPrograms(uniquePrograms);
    } catch (error) {
      console.error('Error fetching programs:', error);
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

      if (updatedData.length > 0) {
        updatedData[0].program = program;
      }
      
      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
      router.push("/Login/Reason");
    } catch (error) {
      console.error("Error saving program:", error);
      Alert.alert("Error", "Failed to save program information");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Program Information</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              setProgram(text);
            }}
            placeholder="Search for a program..."
          />
          <View style={[styles.container, { maxHeight: 200, width: '100%' }]}>
            <FlatList
              data={filteredPrograms}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.button, { marginVertical: 2 }]}
                  onPress={() => handleSelectProgram(item)}
                >
                  <Text style={styles.buttonText}>{item}</Text>
                </TouchableOpacity>
              )}
              style={{ width: '100%' }}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable style={[styles.button, styles.clearButton]} onPress={handleClear}>
            <Text style={styles.buttonText}>CLEAR</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={HandleSubmit}>
            <Text style={styles.buttonText}>NEXT</Text>
          </Pressable>
        </View>
        <Breadcrumb entities={['Disclaimer', 'StudentNumber', 'Firstname', 'Lastname', 'DCMail', 'Institution', 'Program']} flowDepth={6} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//   },
//   searchContainer: {
//     position: 'relative',
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     padding: 12,
//     borderRadius: 8,
//     fontSize: 16,
//     backgroundColor: '#fff',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dropdownContainer: {
//     width: '80%',
//     maxHeight: '60%',
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 16,
//   },
//   dropdownList: {
//     maxHeight: 300,
//   },
//   dropdownItem: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   dropdownText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   button: {
//     backgroundColor: '#358f71',
//     padding: 15,
//     borderRadius: 8,
//     flex: 1,
//     marginHorizontal: 5,
//     alignItems: 'center',
//   },
//   clearButton: {
//     backgroundColor: '#534044',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

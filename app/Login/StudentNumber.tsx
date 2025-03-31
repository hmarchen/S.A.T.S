import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Pressable, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import Breadcrumb from './breadcrumb';
import { Ionicons } from '@expo/vector-icons';
import styles from '../css/styles';
import * as FileSystem from 'expo-file-system';

const filePath = FileSystem.documentDirectory + 'user.json';

export default function StudentNumber() {
  const router = useRouter();
  const [studentNumber, setStudentNumber] = useState('');
  const studentNumberREGEX = /^100\d{6}$/; // Regex for valid student numbers
  const isValid = studentNumber.length === 9 && studentNumberREGEX.test(studentNumber);

  const validateForm = () => {
    const trimmedID = studentNumber.trim();
    if (!trimmedID) return "Student number is required.";
    if (!studentNumberREGEX.test(trimmedID)) return "Invalid Student Number: Must start with 100 and contain 9 digits.";
    return null; // No error
  };

  const handleSubmit = async () => {
    const error = validateForm();
    if (error) {
      Alert.alert("Validation Error", error);
      return;
    }

    try {
      const fileExists = await FileSystem.getInfoAsync(filePath);
      const updatedData = fileExists.exists
        ? JSON.parse(await FileSystem.readAsStringAsync(filePath))
        : [];

      if (updatedData.length > 0) {
        updatedData[0].studentID = studentNumber; // Update existing data
      } else {
        updatedData.push({
          firstname: '',
          lastname: '',
          studentID: studentNumber,
          DCMail: '',
          campus: '',
          program: '',
          reason: '',
          appointmentDate: '',
          appointmentTime: '',
          appointmentType: '',
        });
      }

      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
      console.log("✅ Form Submitted: Student Number", studentNumber);
      router.push('/Login/StudentFirstName');
    } catch (error) {
      console.error('❌ Error writing to file:', error);
      Alert.alert('Error', 'Failed to save data.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Arrow navigation */}
      <View style={styles.arrowContainer}>
        <Pressable style={styles.arrowButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </Pressable>

        <Pressable
          style={[styles.arrowButton, !isValid && styles.disabledArrow]}
          onPress={handleSubmit}
          disabled={!isValid}
        >
          <Ionicons name="arrow-forward" size={32} color="white" />
        </Pressable>
      </View>

      {/* Main UI */}
      <View style={styles.transparentContainer}>
        <Text style={styles.whiteTitle}>Enter your Student Number</Text>

        <TextInput
          style={styles.input}
          placeholder="Student Number"
          placeholderTextColor="rgba(255,255,255,0.6)"
          value={studentNumber}
          onChangeText={setStudentNumber}
          keyboardType="numeric"
        />

        <View style={styles.breadcrumbContainer}>
          <Breadcrumb entities={['Disclaimer', 'StudentNumber']} flowDepth={1} />
        </View>
      </View>
    </ImageBackground>
  );
}

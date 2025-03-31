import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  Pressable,
  ImageBackground
} from 'react-native';
import Breadcrumb from './breadcrumb';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styles from '../css/styles';
import * as FileSystem from 'expo-file-system';

const filePath = FileSystem.documentDirectory + 'user.json';

export default function StudentNumber() {
  const router = useRouter();
  const [studentNumber, setStudentNumber] = useState('');
  const studentNumberREGEX = /^100\d{6}$/;
  const isValid = studentNumber.length === 9 && studentNumberREGEX.test(studentNumber);

  const REQ_ERROR = "Student number is required";
  const REG_ERROR = "Invalid Student Number: Student number must start with 100 and contain 9 digits";

  const handleClear = () => setStudentNumber('');

  const validateForm = () => {
    let errors = {};
    const trimmedID = studentNumber.trim();

    if (!trimmedID) {
      errors.studentNumber = REQ_ERROR;
      handleClear();
    } else if (!studentNumberREGEX.test(trimmedID)) {
      errors.studentNumber = REG_ERROR;
      handleClear();
    }
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      Alert.alert("Validation Error", Object.values(errors).join('\n'));
      return;
    }

    try {
      const fileExists = await FileSystem.getInfoAsync(filePath);
      let updatedData = fileExists.exists
        ? JSON.parse(await FileSystem.readAsStringAsync(filePath))
        : [];

      updatedData.length > 0
        ? (updatedData[0].studentID = studentNumber)
        : updatedData.push({
            firstname: '',
            lastname: '',
            studentID: studentNumber,
            DCMail: '',
            campus: '',
            program: '',
            reason: '',
            appointmentDate: '',
            appointmentTime: '',
            appointmentType: ''
          });

      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
      console.log("✅ Form Submitted: Student Number", studentNumber);
      router.push('/Login/StudentFirstName');
    } catch (error) {
      Alert.alert('Error', 'Failed to save data.');
      console.error('❌ Error writing to file:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Arrows centered vertically */}
      <View style={styles.arrowContainer}>
        <Pressable
          style={styles.arrowButton}
          onPress={() => router.back()}
        >
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

      {/* Main content */}
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

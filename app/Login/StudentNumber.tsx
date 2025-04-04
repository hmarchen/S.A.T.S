import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, SafeAreaView, Text, TextInput, Alert, Pressable, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import Breadcrumb from './breadcrumb';
import { Ionicons } from '@expo/vector-icons';
import styles from '../css/styles';
import * as FileSystem from 'expo-file-system';

const filePath = FileSystem.documentDirectory + 'user.json';

export default function StudentNumber() {
  const router = useRouter();
  const [studentNumber, setStudentNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  
  // Updated regex to accept numbers starting with either 100 or 101
  const studentNumberREGEX = /^(100|101)\d{6}$/;
  const isValid = studentNumber.length === 9 && studentNumberREGEX.test(studentNumber);

  // Validate on every change once touched
  const validateInput = () => {
    const trimmedID = studentNumber.trim();
    if (!trimmedID) {
      setError("Student number is required.");
      return false;
    }
    if (trimmedID.length !== 9) {
      setError("Student number must be 9 digits.");
      return false;
    }
    if (!studentNumberREGEX.test(trimmedID)) {
      setError("Must start with 100 or 101 and contain 9 digits.");
      return false;
    }
    setError(null);
    return true;
  };

  // This ensures we check for errors on each keystroke after first interaction
  useEffect(() => {
    if (touched) {
      validateInput();
    }
  }, [studentNumber]);

  // Force a validation check when user starts typing
  const handleChangeText = (text: string) => {
    setStudentNumber(text);
    setTouched(true);
  };

  const handleBlur = () => {
    setTouched(true);
    validateInput();
  };

  const validateForm = () => {
    const trimmedID = studentNumber.trim();
    if (!trimmedID) return "Student number is required.";
    if (!studentNumberREGEX.test(trimmedID)) return "Invalid Student Number: Must start with 100 or 101 and contain 9 digits.";
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
        <SafeAreaView>
          <TextInput
            style={[
              styles.input, 
              (error && touched) ? { borderColor: '#FF6347', borderWidth: 2 } : {}
            ]}
            placeholder="Student Number"
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={studentNumber}
            onChangeText={handleChangeText}
            keyboardType="numeric"
            onBlur={handleBlur}
            maxLength={9} // Prevent typing more than 9 digits
          />
          
          {/* Make sure error message has enough space and contrasting style */}
          {error && touched && (
            <Text style={{
              color: '#FF6347',
              backgroundColor: 'rgba(0,0,0,0.5)',
              padding: 10,
              borderRadius: 5,
              marginTop: 5,
              fontSize: 18,
              textAlign: 'center',
              marginBottom: 10,
              fontWeight: 'bold'
            }}>
              {error}
            </Text>
          )}
        </SafeAreaView>
        
        <View style={styles.breadcrumbContainer}>
          <Breadcrumb entities={['Disclaimer', 'StudentNumber']} flowDepth={1} />
        </View>
      </View>
    </ImageBackground>
  );
}

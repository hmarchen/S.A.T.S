import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  Pressable,
  ImageBackground
} from 'react-native';
import { useRouter } from 'expo-router';
import Breadcrumb from './breadcrumb';
import { Ionicons } from '@expo/vector-icons';
import styles from '../css/styles';
import * as FileSystem from 'expo-file-system';

const filePath = FileSystem.documentDirectory + 'user.json';

export default function StudentFirstName() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const FirstnameREGEX = /^[A-Z][a-zA-Z' -]+$/;
  const isValid = firstName.length > 0 && FirstnameREGEX.test(firstName.trim());

  const REQ_ERROR = "First name is required.";
  const REG_ERROR = "Invalid first name: Must start with a capital letter and contain only letters.";
  const handleClear = () => setFirstName('');

  const validateForm = () => {
    let errors = {};
    const trimmedFirstName = firstName.trim();

    if (!trimmedFirstName) {
      errors.firstName = REQ_ERROR;
      handleClear();
    } else if (!FirstnameREGEX.test(trimmedFirstName)) {
      errors.firstName = REG_ERROR;
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
        ? (updatedData[0].firstname = firstName)
        : updatedData.push({
            firstname: firstName,
            lastname: '',
            studentID: '',
            DCMail: '',
            campus: '',
            program: '',
            reason: '',
            appointmentDate: '',
            appointmentTime: '',
            appointmentType: ''
          });

      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
      console.log("✅ Form Submitted: First Name:", firstName);
      router.push('/Login/StudentLastName');
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

      {/* Main transparent content */}
      <View style={styles.transparentContainer}>
        <Text style={styles.whiteTitle}>Enter your Legal First Name</Text>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="rgba(255,255,255,0.6)"
          value={firstName}
          onChangeText={setFirstName}
        />

        <View style={styles.breadcrumbContainer}>
          <Breadcrumb entities={['Disclaimer', 'StudentNumber', 'Firstname']} flowDepth={2} />
        </View>
      </View>
    </ImageBackground>
  );
}

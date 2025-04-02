import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Pressable, ImageBackground, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import Breadcrumb from './breadcrumb';
import { Ionicons } from '@expo/vector-icons';
import styles from '../css/styles';
import * as FileSystem from 'expo-file-system';

const filePath = FileSystem.documentDirectory + 'user.json';

export default function StudentLastName() {
  const router = useRouter();
  const [lastName, setLastName] = useState('');
  const LastnameREGEX = /^[A-Z][a-zA-Z' -]+$/;
  const isValid = lastName.length > 0 && LastnameREGEX.test(lastName.trim());

  const REQ_ERROR = "Last name is required.";
  const REG_ERROR = "Invalid last name: Must start with a capital letter and contain only letters.";

  const validateForm = () => {
    const trimmedLastName = lastName.trim();
    if (!trimmedLastName) return REQ_ERROR;
    if (!LastnameREGEX.test(trimmedLastName)) return REG_ERROR;
    return null;
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
        updatedData[0].lastname = lastName;
      } else {
        updatedData.push({
          firstname: '',
          lastname: lastName,
          studentID: '',
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
      console.log("✅ Form Submitted: Last Name:", lastName);
      router.push('/Login/DCMail');
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
      {/* Arrows */}
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
        <Text style={styles.whiteTitle}>Enter your Legal Last Name</Text>

        <SafeAreaView>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              placeholderTextColor="rgba(255,255,255,0.6)"
              value={lastName}
              onChangeText={setLastName}
            />
        </SafeAreaView>

        <View style={styles.breadcrumbContainer}>
          <Breadcrumb entities={['Disclaimer', 'StudentNumber', 'Firstname', 'Lastname']} flowDepth={3} />
        </View>
      </View>
    </ImageBackground>
  );
}

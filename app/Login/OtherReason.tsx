import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, SafeAreaView, TextInput, Alert } from 'react-native';
import Breadcrumb from './breadcrumb';
import Arrows from './arrows';
import { useRouter } from 'expo-router';
import styles from '../css/styles';
import * as FileSystem from "expo-file-system";

const filePath = FileSystem.documentDirectory + "user.json";

export default function VisitReason() {
  const router = useRouter();
  const [Visit, setVisit] = useState('');
  const [charCount, setCharCount] = useState(0);  // State for character count
  const handleClear = () => {
    setVisit('');
    setCharCount(0);  // Reset character count when cleared
  };

  const VisitREGEX = /^.{200,}$/;
  const REQ_ERROR = "A reason for visit is required.";
  const REG_ERROR = "Your reason for visit must contain at least 200 characters.";

  const validateForm = () => {
      let errors = {};
      if (!Visit) { errors.Visit = REQ_ERROR; }
      else if (!VisitREGEX.test(Visit)) { errors.Visit = REG_ERROR; }
      return errors;
  };

  const handleSubmit = async () => {
          const errors = validateForm();
          if (Object.keys(errors).length > 0) {
              Alert.alert("Validation Error", Object.values(errors).join('\n'));
              return;
          }
          else {
              try {
                  const fileExists = await FileSystem.getInfoAsync(filePath);
                  let updatedData = fileExists.exists ? JSON.parse(await FileSystem.readAsStringAsync(filePath)) : [];

                  updatedData.length > 0
                      ? (updatedData[0].reason = Visit)
                      : updatedData.push(
                          {
                              firstname: '',
                              lastname: '',
                              studentID: '',
                              DCMail: '',
                              campus: '',
                              program: '',
                              reason: Visit,
                              AppointmentDate: '',
                              time: '',
                              appointmentType: ''
                          }
                      );

                  await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
                  console.log("Form Submitted: Reason");
                  console.log("Navigating to Calendar...");
                  router.push("/Login/Calendar");
              }
              catch (error) {
                  console.error('Error writing to file:', error);
                  Alert.alert('Error', 'Failed to save data.');
              }
          }
      };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Reason for Visit</Text>

      <TextInput
        multiline={true}
        numberOfLines={12}
        maxLength={2000}
        style={styles.messageBox}
        value={Visit}
        onChangeText={(text) => {
          setVisit(text);
          setCharCount(text.length); // Update character count
        }}
        placeholder="Reason for your Visit"
      />

      <Arrows handleSubmit={handleSubmit} router={router} />
      <View style={styles.counterContainer}>
        <Text style={[styles.charCounter, { color: charCount >= 200 ? 'green' : 'red' }]}>
          {charCount} / 2000 characters
        </Text>
        <Text style={styles.statusSymbol}>{charCount >= 200 ? '✅' : '❌'}</Text>
      </View>
      <Breadcrumb entities={['Disclaimer', 'StudentNumber', 'Firstname', 'Lastname', 'DCMail', 'Institution', 'Program', 'Reason']} flowDepth={7} />
    </SafeAreaView>
  );
}

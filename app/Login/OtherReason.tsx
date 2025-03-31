import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ImageBackground
} from 'react-native';
import Breadcrumb from './breadcrumb';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styles from '../css/styles';
import * as FileSystem from 'expo-file-system';

const filePath = FileSystem.documentDirectory + "user.json";

export default function VisitReason() {
  const router = useRouter();
  const [Visit, setVisit] = useState('');
  const [charCount, setCharCount] = useState(0);

  const VisitREGEX = /^.{200,}$/;
  const isValid = VisitREGEX.test(Visit);

  const REQ_ERROR = "A reason for visit is required.";
  const REG_ERROR = "Your reason must contain at least 200 characters.";

  const validateForm = () => {
    let errors = {};
    if (!Visit) errors.Visit = REQ_ERROR;
    else if (!VisitREGEX.test(Visit)) errors.Visit = REG_ERROR;
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
        ? (updatedData[0].reason = Visit)
        : updatedData.push({
            firstname: '',
            lastname: '',
            studentID: '',
            DCMail: '',
            campus: '',
            program: '',
            reason: Visit,
            appointmentDate: '',
            appointmentTime: '',
            appointmentType: ''
          });

      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
      console.log("✅ Form Submitted: Reason");
      router.push("/Login/Calendar");
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
      <View style={styles.arrowContainer}>
        <Pressable style={styles.arrowButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </Pressable>
        <Pressable
          style={[styles.arrowButton, isValid ? styles.activeArrow : styles.disabledArrow]}
          onPress={handleSubmit}
          disabled={!isValid}
        >
          <Ionicons name="arrow-forward" size={32} color="white" />
        </Pressable>
      </View>

      <View style={styles.transparentContainer}>
        <Text style={styles.whiteTitle}>Reason for Visit</Text>

    <TextInput
      multiline
      numberOfLines={12}
      maxLength={2000}
      style={[
        styles.messageBox,
        {
          height: 250,
          width: 250,
          color: 'black',
          backgroundColor: 'rgba(255,255,255,0.9)',
          textAlignVertical: 'top',
          padding: 16,
          borderRadius: 10,
        },
      ]}
      value={Visit}
      onChangeText={(text) => {
        setVisit(text);
        setCharCount(text.length);
      }}
      placeholder="I want to visit my student advisor because...."
      placeholderTextColor="gray"
    />



        <View style={styles.counterContainer}>
          <Text style={[styles.charCounter, { color: charCount >= 200 ? 'lightgreen' : 'red' }]}>
            {charCount} / 200 characters
          </Text>
          <Text style={styles.statusSymbol}>{charCount >= 200 ? '✅' : '❌'}</Text>
        </View>

        <View style={styles.breadcrumbContainer}>
          <Breadcrumb entities={[
            'Disclaimer', 'StudentNumber', 'Firstname',
            'Lastname', 'DCMail', 'Institution', 'Program', 'Reason'
          ]} flowDepth={7} />
        </View>
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Reason for Visit</Text>
      <Arrows handleSubmit={handleSubmit} router={router} />
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
      <View style={styles.counterContainer}>
        <Text style={[styles.charCounter, { color: charCount >= 200 ? 'green' : 'red' }]}>
          {charCount} / 2000 characters
        </Text>
        <Text style={styles.statusSymbol}>{charCount >= 200 ? '✅' : '❌'}</Text>
      </View>
    </ImageBackground>
  );
}

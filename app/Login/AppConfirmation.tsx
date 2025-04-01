import React from 'react';
import { View, Text, Pressable, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styles from '../css/styles'; // Your global styles

export default function AppConfirmation() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.transparentContainer}>
        <Ionicons name="checkmark-circle-outline" size={100} color="#4CAF50" style={{ marginBottom: 20 }} />
        <Text style={styles.whiteTitle}>Your Appointment is Requested!</Text>
        <Text style={[styles.paragraph, { marginTop: 10 }]}>Thank you for submitting your request. Your appointment with the SEIT office has been requested.</Text>
        <Text style={[styles.paragraph, { color: '#9AE6B4' }]}>You will receive an email confirmation with your appointment details. Please arrive on time and bring any necessary documents.</Text>
        <Text style={[styles.paragraph, { color: '#FFD700' }]}> If you need further assistance, visit the SEIT office during working hours.</Text>
        <Pressable
          style={[styles.loginButton, { backgroundColor: '#4CAF50', marginTop: 30, paddingVertical: 14 }]}
          onPress={() => router.push('/')}
        >
          <Text style={styles.buttonText}>Start Over</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

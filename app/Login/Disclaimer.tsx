import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../css/styles'; // Ensure this path is correct
import { useRouter } from 'expo-router'; // Use useRouter instead of router directly

export default function LoginScreen() {
  const router = useRouter(); // Initialize the router

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.paragraph}>
        Make sure you have the following information in order to register for an appointment:
      </Text>
      <Text style={styles.list}>
        First Name | Last Name | Student Number | Durham College Email Address | Purpose of Visit
      </Text>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => router.push('/Login/StudentName')}>
          <Text style={styles.buttonText}>AGREE</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.clearButton]} onPress={() => router.push('/')}>
          <Text style={styles.buttonText}>DISAGREE</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

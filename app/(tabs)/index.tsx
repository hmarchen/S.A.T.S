import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../css/styles';

export default function HomeScreen() {
  const router = useRouter(); // Use the router hook for navigation

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome to the faculty of SEIT Portal
      </Text>
      <TouchableOpacity style={styles.loginButton} onPress={() => { router.push('/Login/Disclaimer') }}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

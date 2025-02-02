import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../css/styles';

export default function HomeScreen() {
  const router = useRouter(); // Use the router hook for navigation

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome to the Faculty of Science Engineering and Information Technology [SEIT]
      </Text>
      <TouchableOpacity style={styles.loginButton} onPress={() => { router.push('/login') }}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

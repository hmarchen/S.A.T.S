import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../css/styles';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Faculty of SEIT Portal</Text>
      <Pressable
        style={styles.loginButton}
        onPress={() => router.push('/Login/Disclaimer')}
        accessibilityLabel="Tap to login"
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
}

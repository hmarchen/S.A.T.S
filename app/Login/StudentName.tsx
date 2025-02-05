import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, SafeAreaView, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../css/styles';

export default function studentName() {
  
  const router = useRouter(); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const handleSubmit = () => { Alert.alert('Form Submitted', `Name: ${firstName} ${lastName}`);  };
  const handleClear = () => { setFirstName(''); setLastName(''); };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
     
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
      />
      
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>NEXT</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.clearButton]} onPress={handleClear}>
          <Text style={styles.buttonText}>CLEAR</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

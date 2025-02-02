import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import styles from '../css/styles';

export default function LoginScreen() {

//   Setting variables to store student information
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');

// for now, this function displays the information that was inputted into the variables set above.
  const handleSubmit = () => {
    Alert.alert('Form Submitted',
                `Name: ${firstName} ${lastName}\n
                 Email: ${email}\n
                 Number: ${number}`);
  };

// overwrites input with spaces.
  const handleClear = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setNumber('');
  };

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
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Durham College Email Address"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={number}
        onChangeText={setNumber}
        placeholder="Student Number"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.clearButton]} onPress={handleClear}>
          <Text style={styles.buttonText}>Clear</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

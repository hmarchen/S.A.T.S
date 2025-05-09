import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './css/styles';

export default function CalendarTest() {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setName('');
    setStudentId('');
    setEmail('');
  };

  const handleSend = async () => {
    // Validate form
    if (!name || !studentId || !email) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/send-invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, studentId }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Invite sent successfully');
      } else {
        Alert.alert('Error', 'Failed to send invite');
      }
    } catch (error) {
      console.error('Error sending invite:', error);
      Alert.alert('Error', 'An error occurred while sending the invite');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={localStyles.scrollContainer}>
        <Text style={styles.title}>Calendar Test</Text>
        
        <View style={localStyles.formGroup}>
          <Text style={localStyles.label}>Full Name</Text>
          <TextInput
            style={localStyles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
          />
        </View>
        
        <View style={localStyles.formGroup}>
          <Text style={localStyles.label}>Student ID</Text>
          <TextInput
            style={localStyles.input}
            value={studentId}
            onChangeText={setStudentId}
            placeholder="Enter your student ID"
            keyboardType="numeric"
          />
        </View>
        
        <View style={localStyles.formGroup}>
          <Text style={localStyles.label}>Email Address</Text>
          <TextInput
            style={localStyles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email address"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <View style={localStyles.buttonContainer}>
          <Pressable 
            style={[styles.button, localStyles.resetButton]} 
            onPress={handleReset}
            disabled={loading}
          >
            <Text style={styles.buttonText}>RESET</Text>
          </Pressable>
          
          <Pressable 
            style={[styles.button, localStyles.sendButton]} 
            onPress={handleSend}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>SEND</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  resetButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#888',
  },
  sendButton: {
    flex: 1,
    marginLeft: 10,
  },
}); 
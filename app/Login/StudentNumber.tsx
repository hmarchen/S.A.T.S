import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, SafeAreaView, TextInput, Alert } from 'react-native';
import Breadcrumb from './breadcrumb';
import { useRouter } from 'expo-router';
import styles from '../css/styles';

export default function studentNumber() {

  const router = useRouter(); 
  const [studentNumber, setStudentNumber] = useState('');
  
  const handleSubmit = () => { 
    Alert.alert('Form Submitted', `Student Number ${studentNumber}`);  
    console.log('Navigating to DCMail...');  
    router.push('/Login/StudentName'); 
    };
  const handleClear = () => { setStudentNumber('') };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Enter your Student Number</Text>
     
      <TextInput
        style={styles.studentNumber}
        value={studentNumber}
        onChangeText={setStudentNumber}
        placeholder="Student Number"
      />
      
      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, styles.clearButton]} onPress={handleClear}>
          <Text style={styles.buttonText}>CLEAR</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>NEXT</Text>
        </Pressable>
      </View>
      <Breadcrumb entities={['Disclaimer', 'Student ID']} flowDepth={2} />
    </SafeAreaView>
  );
}

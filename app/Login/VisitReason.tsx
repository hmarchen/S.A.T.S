import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, Alert, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import Breadcrumb from './breadcrumb';
import { useRouter } from 'expo-router';
import styles from '../css/styles';

export default function VisitReason() {

  const router = useRouter(); 
  const [Visit, setVisit] = useState('');
  
  const handleSubmit = () =>
  {
      Alert.alert('Form Submitted', `${Visit}`);
      router.push('/Login/EndScreen');

  };
  const handleClear = () => { setVisit('')};

  return (
      <KeyboardAvoidingView
                        style={styles.container}
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={20}
                    >
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Reason for Visit</Text>

          <TextInput
            style={styles.messageBox}
            value={Visit}
            onChangeText={setVisit}
            placeholder="Reason for your Visit"
          />

          <View style={styles.buttonContainer}>
            <Pressable style={[styles.button, styles.clearButton]} onPress={handleClear}>
              <Text style={styles.buttonText}>CLEAR</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>SUBMIT</Text>
            </Pressable>
          </View>
          <Breadcrumb entities={['Full Name', 'Student ID', 'DCMail', 'Institution', 'Visit Reason']} flowDepth={4} />
        </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, SafeAreaView, TextInput, Alert, Platform } from 'react-native';
import Breadcrumb from './breadcrumb';
import { useRouter } from 'expo-router';
import styles from '../css/styles';

interface LayoutProps {
  setRoute: (route: string) => void;
}

const VisitReason: React.FC<LayoutProps> = ({setRoute}) => {
  const router = useRouter();
  const isWeb = Platform.OS === 'web';
  const [Visit, setVisit] = useState('');
  
  const handleSubmit = () => { Alert.alert('Form Submitted', `${Visit}`); };
  const handleClear = () => { setVisit('')};

  return (
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
  );
}

export default VisitReason;
import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, Alert, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Breadcrumb from './breadcrumb';
import styles from '../css/styles';

export default function StudentName() {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = () => {
        Alert.alert('Form Submitted', `Name: ${firstName} ${lastName}`);
        console.log('Navigating to StudentNumber...');
        router.push('/Login/DCMail');
    };

    const handleClear = () => {
        setFirstName('');
        setLastName('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Enter your Legal Full Name</Text>
            <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} placeholder="First Name" />
            <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="Last Name" />
            <View style={styles.buttonContainer}>
                <Pressable style={[styles.button, styles.clearButton]} onPress={handleClear}>
                    <Text style={styles.buttonText}>CLEAR</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>NEXT</Text>
                </Pressable>
            </View>
            <Breadcrumb entities={['Disclaimer', 'Student Number', 'full name']} flowDepth={2} />
        </SafeAreaView>
    );
}

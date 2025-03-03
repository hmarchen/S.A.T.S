import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, Alert, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Breadcrumb from './breadcrumb';
import styles from '../css/styles';
import * as FileSystem from 'expo-file-system';

const filePath = FileSystem.documentDirectory + 'user.json';

export default function StudentName() {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = async () => {
        try {
            const fileExists = await FileSystem.getInfoAsync(filePath);
            let updatedData = fileExists.exists ? JSON.parse(await FileSystem.readAsStringAsync(filePath)) : [];

            updatedData.length > 0
                ? (updatedData[0].firstname = firstName, updatedData[0].lastname = lastName)
                : updatedData.push({ firstname: firstName, lastname: lastName, studentID: '', DCMail: '', campus: '', program: '', reason: '' });

            await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
            Alert.alert('Form Submitted', `Name: ${firstName} ${lastName}`);
            console.log('Navigating to StudentNumber...');
            router.push('/Login/StudentNumber');
        } catch (error) {
            console.error('Error writing to file:', error);
            Alert.alert('Error', 'Failed to save data.');
        }
    };

    const handleClear = () => (setFirstName(''), setLastName(''));

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={20}>
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
                <Breadcrumb entities={['Disclaimer', 'DCmail', 'full name']} flowDepth={1} />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

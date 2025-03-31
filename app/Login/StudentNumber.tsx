import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, Alert, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import Breadcrumb from './breadcrumb';
import { useRouter } from 'expo-router';
import styles from '../css/styles';
import * as FileSystem from 'expo-file-system';

const filePath = FileSystem.documentDirectory + 'user.json';

export default function StudentNumber() {
    const router = useRouter();
    const [studentNumber, setStudentNumber] = useState('');

    const handleSubmit = async () => {
        try {
            const fileExists = await FileSystem.getInfoAsync(filePath);
            let updatedData = fileExists.exists ? JSON.parse(await FileSystem.readAsStringAsync(filePath)) : [];
            
            if (!Array.isArray(updatedData)) {
                updatedData = [];
            }

            if (updatedData.length > 0) {
                updatedData[0].studentID = studentNumber;
            } else {
                updatedData.push({ firstname: '', lastname: '', studentID: studentNumber, DCMail: '', campus: '', program: '', reason: '' });
            }

            await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
            Alert.alert('Form Submitted', `Student Number: ${studentNumber}`);
            console.log('Navigating to StudentFirstName...');
            router.push('/Login/StudentFirstName');
        }
        catch (error) {
            console.error('Error writing to file:', error);
            Alert.alert('Error', 'Failed to save data.');
        }
    };

    const handleClear = () => setStudentNumber('');

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={20}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Enter your Student Number</Text>
                <TextInput
                    style={styles.input}
                    value={studentNumber}
                    onChangeText={setStudentNumber}
                    placeholder="Student Number"
                    keyboardType="numeric"
                />
                <View style={styles.buttonContainer}>
                    <Pressable style={[styles.button, styles.clearButton]} onPress={handleClear}>
                        <Text style={styles.buttonText}>CLEAR</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>NEXT</Text>
                    </Pressable>
                </View>
                <Breadcrumb entities={['Disclaimer', 'StudentNumber']} flowDepth={1} />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

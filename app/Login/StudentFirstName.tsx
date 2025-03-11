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
    const FirstnameREGEX = /^[A-Z][a-zA-Z' -]+$/;
    const handleClear = () => (setFirstName(''));

    const validateForm = () => {
        let errors = {};
        if (!firstName) {
            errors.firstName = 'Your first name is required';
            handleClear();
        }
        else if (!FirstnameREGEX.test(firstName)) {
            errors.firstName = 'Invalid firstname';
            handleClear();
        }
        return errors;
    }

    const handleSubmit = async () => {
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            Alert.alert("Validation Error", Object.values(errors).join('\n'));
            return;
        }
        else {
            try {
                const fileExists = await FileSystem.getInfoAsync(filePath);
                let updatedData = fileExists.exists ? JSON.parse(await FileSystem.readAsStringAsync(filePath)) : [];

                updatedData.length > 0
                    ? (updatedData[0].firstname = firstName)
                    : updatedData.push(
                        {
                            firstname: firstName,
                            lastname: '',
                            studentID: '',
                            DCMail: '',
                            campus: '',
                            program: '',
                            reason: ''
                        }
                    );

                await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
                Alert.alert('Form Submitted', `Firstname: ${firstName}`);
                console.log('Navigating to StudentLastName...');
                router.push('/Login/StudentLastName');
            }
            catch (error) {
                console.error('Error writing to file:', error);
                Alert.alert('Error', 'Failed to save data.');
            }
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={20}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Enter your Legal First Name</Text>
                <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} placeholder="First Name" />
                <View style={styles.buttonContainer}>
                    <Pressable style={[styles.button, styles.clearButton]} onPress={handleClear}>
                        <Text style={styles.buttonText}>CLEAR</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>NEXT</Text>
                    </Pressable>
                </View>
                <Breadcrumb entities={['Disclaimer', 'StudentNumber', 'Firstname']} flowDepth={2} />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

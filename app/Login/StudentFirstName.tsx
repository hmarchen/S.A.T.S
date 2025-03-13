import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, Alert, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Breadcrumb from './breadcrumb';
import Arrows from './arrows';
import styles from '../css/styles';
import * as FileSystem from 'expo-file-system';

const filePath = FileSystem.documentDirectory + 'user.json';

export default function StudentName() {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const FirstnameREGEX = /^[A-Z][a-zA-Z' -]+$/;
    const REQ_ERROR = "First name is required.";
    const REG_ERROR = "Invalid first name: Must start with a capital letter and contain only letters.";
    const handleClear = () => (setFirstName(''));

    const validateForm = () => {
        let errors = {};
        const trimmedFirstName = firstName.trim();

        if (!trimmedFirstName) {
            errors.firstName = REQ_ERROR;
            handleClear();
        }
        else if (!FirstnameREGEX.test(trimmedFirstName)) {
            errors.firstName = REG_ERROR;
            handleClear();
        }

        return errors;
    };

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
                console.log("Form Submitted: Firstname");
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
            <Arrows handleSubmit={handleSubmit} router={router} />
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Enter your Legal First Name</Text>
                <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} placeholder="First Name" />
                <Breadcrumb entities={['Disclaimer', 'StudentNumber', 'Firstname']} flowDepth={2} />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

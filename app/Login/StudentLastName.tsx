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
    const [lastName, setLastName] = useState('');
    const LastnameREGEX = /^[A-Z][a-zA-Z' -]+$/;
    const REQ_ERROR = "Last name is required.";
    const REG_ERROR = "Invalid last name: Must start with a capital letter and contain only letters.";
    const handleClear = () => (setLastName(''));

    const validateForm = () => {
        let errors = {};
        const trimmedLastName = lastName.trim();

        if (!trimmedLastName) {
            errors.lastName = REQ_ERROR;
            handleClear();
        }
        else if (!LastnameREGEX.test(trimmedLastName)) {
            errors.lastName = REG_ERROR;
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
                     ? (updatedData[0].lastname = lastName)
                     : updatedData.push(
                         {
                             firstname: '',
                             lastname: lastName,
                             studentID: '',
                             DCMail: '',
                             campus: '',
                             program: '',
                             reason: '',
                             appointmentDate: '',
                             appointmentTime: '',
                             appointmentType: ''
                         }
                     );

                 await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
                 console.log("Form Submitted: Lastname");
                 console.log("Last Name:", lastName);
                 console.log('Navigating to DCMail...');
                 router.push('/Login/DCMail');
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
                <Text style={styles.title}>Enter your Legal Last Name</Text>
                <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="Last Name" />
                <Breadcrumb entities={['Disclaimer', 'StudentNumber', 'Firstname', 'Lastname']} flowDepth={3} />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

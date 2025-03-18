import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, Alert, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import Breadcrumb from './breadcrumb';
import Arrows from './arrows';
import { useRouter } from 'expo-router';
import styles from '../css/styles';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';

const filePath = FileSystem.documentDirectory + 'user.json';

export default function StudentNumber() {
    const router = useRouter();
    const [studentNumber, setStudentNumber] = useState('');
    const studentNumberREGEX = /^100\d{6}$/;
    const REQ_ERROR = "Student number is required";
    const REG_ERROR = "Invalid Student Number: Student number must start with 100 and contain 9 digits";
    const handleClear = () => setStudentNumber('');

    /*
      Explanation of the regex:
      ^       - Anchors the match to the start of the string
      100     - Ensures the number starts with "100"
      \d{6}   - Matches exactly six digits (0-9) after "100"
      $       - Anchors the match to the end of the string

      This ensures the student number follows the format: "100XXXXXX" (where X is any digit)
    */
    const validateForm = () => {
        let errors = {};
        const trimmedID = studentNumber.trim();

        if (!trimmedID) {
            errors.studentNumber = REQ_ERROR;
            handleClear();
        }
        else if (!studentNumberREGEX.test(trimmedID)) {
            errors.studentNumber = REG_ERROR;
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
                // Proceed with file operations if validation passes
                const fileExists = await FileSystem.getInfoAsync(filePath);
                let updatedData = fileExists.exists ? JSON.parse(await FileSystem.readAsStringAsync(filePath)) : [];

                updatedData.length > 0
                    ? (updatedData[0].studentID = studentNumber)
                    : updatedData.push(
                        {
                            firstname: '',
                            lastname: '',
                            studentID: studentNumber,
                            DCMail: '',
                            campus: '',
                            program: '',
                            reason: '',
                            AppointmentDate: '',
                            time: '',
                            appointmentType: ''
                        }
                    );

                await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
                console.log("Form Submitted: Student Number");
                console.log('Navigating to StudentFirstName...');
                router.push('/Login/StudentFirstName');
            }
            catch (error) {
                Alert.alert('Error', 'Failed to save data.');
                console.error('Error writing to file:', error);
            }
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={ Platform.OS === 'ios' ? 'padding' : 'height' } keyboardVerticalOffset={20}>
            <Arrows handleSubmit={handleSubmit} router={router} />
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Enter your Student Number</Text>
                <TextInput
                    style={ styles.input}
                    value={studentNumber}
                    onChangeText={setStudentNumber}
                    placeholder="Student Number"
                    keyboardType="numeric"
                />
                <Breadcrumb entities={['Disclaimer', 'StudentNumber']} flowDepth={1} />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}
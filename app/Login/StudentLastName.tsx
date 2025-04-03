import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, Alert, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Breadcrumb from './breadcrumb';
import styles from '../css/styles';
import * as FileSystem from 'expo-file-system';

const filePath = FileSystem.documentDirectory + 'user.json';

interface LayoutProps {
  setRoute: (route: string) => void;
}

const StudentLastName: React.FC<LayoutProps> = ({setRoute}) => {
    const router = useRouter();
    const isWeb = Platform.OS === 'web';
    const [lastName, setLastName] = useState('');

    const handleSubmit = async () => {
        try {
            if (isWeb) {
                const existingData = localStorage.getItem('user');
                const updatedData = existingData ? JSON.parse(existingData) : [];

                updatedData.length > 0
                    ? (updatedData[0].lastname = lastName)
                    : updatedData.push({ firstname: '', lastname: lastName, studentID: '', DCMail: '', campus: '', program: '', reason: '' });
    
                localStorage.setItem('user', JSON.stringify(updatedData));
                console.log(updatedData);
                alert(`Form Submitted\nLastname: ${lastName}`);
                setRoute('dcMail');
            } else {
                const fileExists = await FileSystem.getInfoAsync(filePath);
                let updatedData = fileExists.exists ? JSON.parse(await FileSystem.readAsStringAsync(filePath)) : [];
    
                updatedData.length > 0
                    ? (updatedData[0].lastname = lastName)
                    : updatedData.push({ firstname: '', lastname: lastName, studentID: '', DCMail: '', campus: '', program: '', reason: '' });
    
                await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
                Alert.alert('Form Submitted', `Lastname: ${lastName}`);
                console.log('Navigating to DCMail...');
                router.push('/Login/DCMail');
            }
            
        } catch (error) {
            console.error('Error writing to file:', error);
            Alert.alert('Error', 'Failed to save data.');
        }
    };

    const handleClear = () => (setLastName(''));

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={20}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Enter your Legal Last Name</Text>
                <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="Last Name" />
                <View style={styles.buttonContainer}>
                    <Pressable style={[styles.button, styles.clearButton]} onPress={handleClear}>
                        <Text style={styles.buttonText}>CLEAR</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>NEXT</Text>
                    </Pressable>
                </View>
                <Breadcrumb entities={['Disclaimer', 'StudentNumber', 'Firstname', 'Lastname']} flowDepth={3} />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

export default StudentLastName;
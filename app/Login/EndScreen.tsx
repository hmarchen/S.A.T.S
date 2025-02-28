import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Breadcrumb from './breadcrumb';
import styles from '../css/styles';
import { useRouter } from 'expo-router';
import { Card } from '@rneui/themed';
import * as FileSystem from 'expo-file-system';

export default function EndScreen() {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const fileUri = FileSystem.documentDirectory + 'user.json';

    useEffect(() => {
        const loadJsonFile = async () => {
            try {
                // Check if the file exists in the document directory
                const fileInfo = await FileSystem.getInfoAsync(fileUri);
                console.log('File info:', fileInfo);

                if (!fileInfo.exists) {
                    console.log('File does not exist. Copying from assets...');
                    const userJson = require('../../assets/data/user.json');
                    const jsonString = JSON.stringify(userJson);
                    await FileSystem.writeAsStringAsync(fileUri, jsonString);
                    console.log('File copied from assets to:', fileUri);
                }
                else { console.log('File exists at:', fileUri); }

                // Read the file
                const jsonContent = await FileSystem.readAsStringAsync(fileUri);
                const parsedData = JSON.parse(jsonContent);
                setUserData(parsedData);
            }
            catch (error) { console.error('Error reading JSON file:', error); }
        };

        loadJsonFile();
    }, []);

    if (!userData) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.text}>Loading user data...</Text>
            </SafeAreaView>
        );
    }

    const user = userData[0];

    return (
        <SafeAreaView style={styles.container}>
            <Card containerStyle={{ marginTop: 15, marginBottom: 20 }}>
                <Card.Title>Thank you for your application!</Card.Title>
                <Text style={styles.text}>Your Details:</Text>
                <Text style={styles.text}>First Name: {user.firstname}</Text>
                <Text style={styles.text}>Last Name: {user.lastname}</Text>
                <Text style={styles.text}>Student ID: {user.studentID}</Text>
                <Text style={styles.text}>Email: {user.DCMail}</Text>
                <Text style={styles.text}>Campus: {user.campus}</Text>
                <Text style={styles.text}>Program: {user.program}</Text>
                <Text style={styles.text}>Reason: {user.reason}</Text>
            </Card>

            <Pressable
                style={styles.loginButton}
                onPress={() => router.push('/Login/Disclaimer')}
                accessibilityLabel="Tap to return to the menu"
            >
                <Text style={styles.buttonText}>Return to Menu</Text>
            </Pressable>

            <Breadcrumb
                entities={['Full Name', 'Student ID', 'DCMail', 'Institution', 'Visit Reason', 'end']}
                flowDepth={5}
            />
        </SafeAreaView>
    );
}

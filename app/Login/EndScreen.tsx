import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Breadcrumb from './breadcrumb';
import styles from '../css/styles';
import { useRouter } from 'expo-router';
import { Card } from '@rneui/themed';
import userData from '../data/user.json'; // Import JSON file

export default function EndScreen() {
    const router = useRouter();

    // Access first object in the JSON array
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

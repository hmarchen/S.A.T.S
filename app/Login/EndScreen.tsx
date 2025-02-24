import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Breadcrumb from './breadcrumb';
import styles from '../css/styles';
import { useRouter } from 'expo-router';
import { Card } from '@rneui/themed';
import * as data from '../data/user.json';


export default function EndScreen() {
    const router = useRouter();

    const firstname = data.firstname;
    const lastname = data.lastname;
    const studentID = data.studentID;
    const DCMail = data.DCMail;
    const campus = data.campus;
    const program = data.program;
    const reason = data.reason;

    return (
        <SafeAreaView style={styles.container}>
            <Card containerStyle={{marginTop: 15, marginBottom: 20}}>
                <Card.Title>Thank you for your application!</Card.Title>
                <Text style={styles.text}>Your Details: </Text>
                <Text style={styles.text}>firstname</Text>
                <Text style={styles.text}>lastname</Text>
                <Text style={styles.text}>studentID</Text>
                <Text style={styles.text}>firstname</Text>
                <Text style={styles.text}>firstname</Text>
                <Text style={styles.text}>firstname</Text>
                <Text style={styles.text}>firstname</Text>
            </Card>

            <Pressable
                    style={styles.loginButton}
                    onPress={() => router.push('/Login/Disclaimer')}
                    accessibilityLabel="Tap to return to the menu"
                  >
                    <Text style={styles.buttonText}>Return to Menu</Text>
            </Pressable>

            <Breadcrumb entities={['Full Name', 'Student ID', 'DCMail', 'Institution', 'Visit Reason', 'end']} flowDepth={5} />
        </SafeAreaView>
    );
}

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Breadcrumb from './breadcrumb';
import styles from '../css/styles';
import { useRouter } from 'expo-router';
import { Card } from '@rneui/themed';

export default function EndScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <Card containerStyle={{marginTop: 15, marginBottom: 20}}>
                <Card.Title>Thank you for your application!</Card.Title>
                <Text style={styles.text}>Your Details: </Text>
            </Card>
            <Breadcrumb entities={['Full Name', 'Student ID', 'DCMail', 'Institution', 'Visit Reason', 'end']} flowDepth={5} />
        </SafeAreaView>
    );
}

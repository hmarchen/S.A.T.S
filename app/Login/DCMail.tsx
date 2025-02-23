import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, Alert, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Breadcrumb from './breadcrumb';
import styles from '../css/styles';

export default function DCMail() {

    const router = useRouter();
    const [DCMail, setMail] = useState('');

    const handleSubmit = () => {
        Alert.alert('Form Submitted', `Email Address: ${DCMail}`);
        console.log('Navigating to Institution...');
        router.push('/Login/Institution');
    };
    const handleClear = () => { setMail('') };

    return (
        <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={20}
                >
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Enter your Durham College Email Address</Text>

                <TextInput
                    style={styles.input}
                    value={DCMail}
                    onChangeText={setMail}
                    placeholder="Durham College Email Address"
                />

                <View style={styles.buttonContainer}>
                    <Pressable style={[styles.button, styles.clearButton]} onPress={handleClear}>
                        <Text style={styles.buttonText}>CLEAR</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>NEXT</Text>
                    </Pressable>
                </View>
                <Breadcrumb entities={['Disclaimer', 'Full Name', 'Student ID', 'DCMail']} flowDepth={3} />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

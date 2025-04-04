import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

interface LayoutProps {
  reason?: string;
}

const Unauthorized: React.FC<LayoutProps> = ({ reason = "This page cannot be displayed..." }) => {
    const router = useRouter();
    const handlePress = () => {
        router.navigate('/site/home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sorry!</Text>
            <Text style={styles.text}>{reason}</Text>
            <Pressable style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Go To Home</Text>
            </Pressable>
        </View>
    );
};

export default Unauthorized;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    title: {
        color: 'rgb(81, 160, 91)',
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        width: '10%',
        padding: 5,
        borderRadius: 8,
        backgroundColor: "#007852",
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        textTransform: 'uppercase',
    }
});
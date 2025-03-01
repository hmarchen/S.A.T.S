import React from 'react';
import { View, Text, FlatList, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../css/styles';
import { TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';

const filePath = FileSystem.documentDirectory + 'user.json';

export default function Reason() {
    const router = useRouter();
    const data = Array.from({ length: 15 }).map((_, index) => ({ id: index.toString(), title: `Item ${index + 1}` }));

    const handlePress = (title) => {
        console.log(title);
    };

    const handleSubmit = async () => {
        try {
            // Read existing data or initialize if it doesn't exist
            const fileExists = await FileSystem.getInfoAsync(filePath);
            let existingData = fileExists.exists ? JSON.parse(await FileSystem.readAsStringAsync(filePath)) : [];

            // Add the selected items or process data as needed
            Alert.alert('Form Submitted', 'Your selections have been saved.');
            console.log('Navigating to end...');
            router.push('/Login/EndScreen');
        } catch (error) {
            console.error('Error reading or writing to file:', error);
            Alert.alert('Error', 'Failed to save selections.');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.gridItem} onPress={() => handlePress(item.title)}>
                        <Text style={styles.gridItemText}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
                numColumns={3}
                contentContainerStyle={styles.gridContainer}
            />
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>SUBMIT</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

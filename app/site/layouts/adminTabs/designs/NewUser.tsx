import React, { useState } from 'react';
import { View, Text, Button, Image, Pressable, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../../../styles/tabStyles';

// MAIN LAYOUT COMPONENT
interface LayoutProps {
  children: React.ReactNode; // This will hold the child content passed from the screen
  name: string;
  email: string;
  password: string;
  onEditPress: (event: { nativeEvent: { locationY: any; locationX: any; } }) => void;
  onDeletePress: (event: { nativeEvent: { locationY: any; locationX: any; } }) => void;
}


const NewUser: React.FC<LayoutProps> = ({ name, email, password, onEditPress, onDeletePress }) => {
    const router = useRouter();
    const IMAGES = '../../../images/';

    return (
        <View style={styles.newUserBox}>
            <View style={styles.newUserHeader}>
                <Text style={styles.newUserTitle}>{name}</Text>
                <View style={styles.newUserButtons}>
                <Pressable style={styles.newUserButton} onPress={onEditPress}>
                    <Image
                    source={require(IMAGES + 'icons/edit_icon.png')} 
                    style={[ styles.newUserButtonIcon, { tintColor: '#2A56CE' } ]}
                    />
                </Pressable>
                <Pressable style={styles.newUserButton} onPress={onDeletePress}>
                    <Image
                    source={require(IMAGES + 'icons/delete_icon.jpg')} 
                    style={[ styles.newUserButtonIcon, { tintColor: '#CE2A2A' } ]}
                    />
                </Pressable>
                </View>
            </View>
            <View style={styles.horizontalLine}/>
            <Text style={styles.newUserText}>Email: {email}</Text>
            <Text style={styles.newUserText}>Password: {password}</Text>
        </View>
    );
}

export default NewUser;
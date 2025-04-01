import React, { useState } from 'react';
import { View, Text, Button, Image, Pressable, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../../../styles/tabStyles';
import User from '@/db/classes/User';

// MAIN LAYOUT COMPONENT
interface LayoutProps {
  user: User;
  isActive: boolean;
  onEditPress: (user: User) => void;
  onDeletePress: (user: User) => void;
}


const NewUser: React.FC<LayoutProps> = ({ user, isActive, onEditPress, onDeletePress }) => {
    const router = useRouter();
    const IMAGES = '../../../images/';

    return (
        <View style={styles.newUserBox}>
            <View style={styles.newUserHeader}>
                <Text style={styles.newUserTitle}>{`${user.firstName} ${user.lastName}`}</Text>
                {isActive && (
                    <View style={styles.newUserButtons}>
                    <Pressable style={styles.newUserButton} onPress={() => { onEditPress(user); }}>
                        <Image
                        source={require(IMAGES + 'icons/edit_icon.png')} 
                        style={[ styles.newUserButtonIcon, { tintColor: '#2A56CE' } ]}
                        />
                    </Pressable>
                    <Pressable style={styles.newUserButton} onPress={() => { onDeletePress(user); }}>
                        <Image
                        source={require(IMAGES + 'icons/delete_icon.jpg')} 
                        style={[ styles.newUserButtonIcon, { tintColor: '#CE2A2A' } ]}
                        />
                    </Pressable>
                </View>
                )}
            </View>
            <View style={styles.horizontalLine}/>
            <Text style={styles.newUserText}>Email: {user.email}</Text>
            <Text style={styles.newUserText}>Password: {user.password}</Text>
            <Text style={styles.newUserText}>Role: {user.role}</Text>
        </View>
    );
}

export default NewUser;
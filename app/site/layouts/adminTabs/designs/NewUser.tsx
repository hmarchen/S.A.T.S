import React, { useState } from 'react';
import { View, Text, Button, Image, Pressable, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../../../styles/tabStyles';
import User from '@/db/classes/User';
import { color } from '@rneui/base';

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
            <View style={styles.inlineFill}>
                <Text style={styles.newUserText}>Email:</Text>
                <Text style={styles.newUserText}>{user.email}</Text>
            </View>
            <View style={styles.inlineFill}>
                <Text style={styles.newUserText}>Password:</Text>
                <Text style={styles.newUserText}>*******</Text>
            </View>
            <View style={styles.inlineFill}>
                <Text style={styles.newUserText}>Role:</Text>
                <Text style={styles.newUserText}>{user.role}</Text>
            </View>
        </View>
    );
}

export default NewUser;
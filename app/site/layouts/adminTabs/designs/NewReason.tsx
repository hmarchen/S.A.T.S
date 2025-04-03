import React, { useState } from 'react';
import { View, Text, Button, Image, Pressable, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../../../styles/tabStyles';

export interface Reason {
    id: number;
    category: string;
    details: string;
}

// MAIN LAYOUT COMPONENT
interface LayoutProps {
  reason: Reason;
  isActive: boolean;
  onEditPress: (reason: Reason) => void;
  onDeletePress: () => void;
}

const NewUser: React.FC<LayoutProps> = ({ reason, isActive, onEditPress, onDeletePress }) => {
    const router = useRouter();
    const IMAGES = '../../../images/';

    return (
        <View style={styles.newUserBox}>
            <View style={styles.newUserHeader}>
                <Text style={styles.newUserTitle}>{reason.category}</Text>
                {isActive && (
                    <View style={styles.newUserButtons}>
                        <Pressable style={styles.newUserButton} onPress={() => {onEditPress(reason);}}>
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
                )}
            </View>
            <View style={styles.horizontalLine}/>
            <View style={styles.inlineFill}>
                <Text style={styles.newUserText}>Details:</Text>
                <Text style={styles.newUserText}>{reason.details}</Text>
            </View>
        </View>
    );
}

export default NewUser;
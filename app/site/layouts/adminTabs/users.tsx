import React, { useState } from 'react';
import { View, Text, Button, Image, Pressable, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../../styles/style';

// MAIN LAYOUT COMPONENT
interface LayoutProps {
  children: React.ReactNode; // This will hold the child content passed from the screen
}


const AdminUsers: React.FC<LayoutProps> = () => {


  return (
    <Pressable onPress={() => {console.log('clicked')}}>
      <Text>Add User</Text>
    </Pressable>
  )
}


export default AdminUsers;

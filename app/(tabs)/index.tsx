import React from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../css/styles';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/Login/Disclaimer')}>
        <Image style={{ flex: 1, resizeMode: 'center' }} source={require('../../assets/Greeter.png')} />
      </TouchableOpacity>
    </View>
  );
}

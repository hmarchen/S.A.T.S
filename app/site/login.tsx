import React from 'react';
import { View, Text, Button, Image, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './styles/style';
import Structure from './structure/structure';

export default function Home() {  
  const router = useRouter();

  return (
    <Structure>
      <Image
        source={require('./images/cat_flower.png')} // Add your logo image here
        style={styles.logo}
      />
      <Text style={styles.title}>Advisor Login</Text>
      <Text style={styles.subtitle}>Good luck!</Text>
    </Structure>
  );
};


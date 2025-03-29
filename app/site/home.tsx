import React from 'react';
import { View, Text, Button, Image, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './styles/style';
import Structure from './structure/structure';

export default function Home() {  
  const router = useRouter();

  return (
    <Structure>
      <View style={styles.homeContainer}>
        <Image
          source={require('./images/cat_hapy.png')} // Add your logo image here
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome to DCSATS</Text>
        <Text style={styles.subtitle}>Student Advisor? I hardly know her!</Text>
      </View>
    </Structure>
  );
};


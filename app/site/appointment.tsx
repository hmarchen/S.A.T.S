import React from 'react';
import { View, Text, Button, Image, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './styles/style';
import Structure from './layouts/structure';

export default function Appointment() {  
  const router = useRouter();

  return (
    <Structure>
      <View style={styles.apptContainer}>
        <Image
          source={require('./images/cat_smile.png')} // Add your logo image here
          style={styles.logo}
        />
        <Text style={styles.title}>Book an Appointment!</Text>
        <Text style={styles.subtitle}>We know you need it</Text>
      </View>
    </Structure>
  );
};


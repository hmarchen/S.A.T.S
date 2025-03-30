import React from 'react';
import { View, Text, Button, Image, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './styles/style';
import Structure from './layouts/structure';

export default function FAQ() {  
  const router = useRouter();

  return (
    <Structure>
      <View style={styles.faqContainer}>
        <Image
          source={require('./images/cat_sip.png')} // Add your logo image here
          style={styles.logo}
        />
        <Text style={styles.title}>FAQ</Text>
        <Text style={styles.subtitle}>questions ?????</Text>
      </View>
    </Structure>
  );
};


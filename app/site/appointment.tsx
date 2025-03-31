import React from 'react';
import { View, Text, Button, Image, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './styles/style';
import Structure from './layouts/structure';
import Disclaimer from '../Login/Disclaimer';

export default function Appointment() {  
  const router = useRouter();

  return (
    <Structure>
      <View style={styles.apptContainer}>
        <Disclaimer children={undefined}/>
      </View>
    </Structure>
  );
};


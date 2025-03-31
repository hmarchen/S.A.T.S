import React, { useState } from 'react';
import { View, Text, Button, Image, Pressable, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './styles/style';
import Structure from './layouts/structure';

export default function Home() {  
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginButtonClick = () => {
    // Handle login logic here
    router.push('./home');
  };

  return (
    <Structure>
      <View style={styles.loginContainer}>
        <View style={styles.loginBox}>
          {/* Title */}
          <View>
            <Text style={styles.title}>ADVISOR LOGIN</Text>
            <View style={styles.horizontalLine} />
          </View>

          {/* User Entry */}
          <View style={styles.loginBody}>
            <TextInput
              style={styles.textInput}
              onChangeText={setEmail}
              value={email}  
              placeholder="Enter email here" 
            />
            <TextInput
              style={styles.textInput}
              onChangeText={setPassword}
              value={password}  
              placeholder="Enter password here" 
            />
            <Pressable style={styles.loginButton} onPress={loginButtonClick}>
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </Pressable>
            <Text style={styles.whisper}>Forgot Email or Password? Please contact your representative...</Text>
          </View>
        </View>
      </View>
    </Structure>
  );
};


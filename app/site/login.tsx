import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, Image, Pressable, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from './context/userContext';
import styles from './styles/style';
import Structure from './layouts/structure';
import User from '@/db/classes/User';
import Unauthorized from './layouts/unauthorized';

export default function Home() {  
  const router = useRouter();
  const IMAGES = './images/';
  const API_BASE_URL = 'http://localhost:3001';
  const structureRef = useRef<any>(null);

  const { user } = useUser();
  const { setUser } = useUser();
  const [isPassVisible, setIsPassVisible] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (user) { return <Unauthorized reason={"You are already logged in..."}/> }

  // EVENT HANDLERS
  const loginButtonClick = async () => {
    try {
      // validation
      if (!email) {
        throw new Error('Email cannot be left blank');
      }
      else if (!password) {
        throw new Error('Password cannot be left blank');
      }

      // compare passwords
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });
  
      const responseJSON = await response.json();

      if (!response.ok) {
        throw new Error(`${responseJSON.error}` || 'Invalid Email or Passwo');
      }

      // login
      const gotUser = responseJSON.user
      const loginUser = new User(gotUser.email, gotUser.firstName, gotUser.lastName, gotUser.password, gotUser.role);
      setUser(loginUser);
  
      router.navigate('./home');
      sendResult(true, 'Successfully logged in!');
    }
    catch (error: any) {
      setPassword('');
      sendResult(false, `Failed to log in: ${error.message}`);
    }
  };

  const handleVisible = () => {
    if (isPassVisible) { setIsPassVisible(false); }
    else { setIsPassVisible(true); }
  };

  // STRUCTURE REF
  const sendResult = (success: boolean, status: string) => {
    structureRef.current?.showResultClick(success, status);
  };

  return (
    <Structure ref={structureRef}>
      <View style={styles.loginContainer}>
        <View style={styles.loginBox}>
          {/* Title */}
          <View>
            <Text style={styles.title}>ADVISOR LOGIN</Text>
            <View style={styles.horizontalLine} />
          </View>

          {/* User Entry */}
          <View style={styles.loginBody}>
            <View style={styles.inlineFill}>
              <TextInput
                style={styles.textInput}
                onChangeText={setEmail}
                value={email}  
                placeholder="Enter email here" 
              />
            </View>
            <View style={styles.inlineFill}>
              <TextInput
                style={styles.textInput}
                onChangeText={setPassword}
                value={password}  
                secureTextEntry={!isPassVisible}
                placeholder="Enter password here" 
              />
              <Pressable style={styles.iconLgBox} onPress={handleVisible}>
                {isPassVisible ? (
                  <Image 
                    source={require(IMAGES + 'icons/visible_icon.png')} 
                    style={[styles.iconLg, {tintColor: "rgb(49, 49, 49)"}]}
                  />
                ) : (
                  <Image 
                    source={require(IMAGES + 'icons/invisible_icon.png')} 
                    style={[styles.iconLg, {tintColor: "rgb(49, 49, 49)"}]}
                  />
                )}
              </Pressable>
            </View>
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

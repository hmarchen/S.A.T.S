import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, Image, Pressable, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './styles/style';
import Structure from './layouts/structure';
import User from '@/db/classes/User';

export default function Home() {  
  const router = useRouter();
  const IMAGES = './images/';
  const API_BASE_URL = 'http://localhost:3001';
  const structureRef = useRef<any>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [isPassVisible, setIsPassVisible] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);
    
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      if (!response.ok) {
        const resError = await response.json();
        throw new Error(`${resError.error}` || 'Failed to fetch users');
      }
      const users = await response.json();
      setUsers(users);
    } catch (error: any) {
      sendResult(false, `Failed to load users: ${error.message}`);
    }
  };

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
  
      if (!response.ok) {
        const resError = await response.json();
        throw new Error(`${resError}` || 'Invalid Email or Passwo');
      }

      // login
  
      sendResult(true, 'Login successful!');
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

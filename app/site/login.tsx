import React, { useState, useRef } from 'react';
import { View, Text, Button, Image, Pressable, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './styles/style';
import Structure from './layouts/structure';

export default function Home() {  
  const router = useRouter();
  const IMAGES = './images/';
  const structureRef = useRef<any>(null);

  const [isPassVisible, setIsPassVisible] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // EVENT HANDLERS
  const loginButtonClick = () => {
    sendResult(false, 'Login logic has not yet been implemented...');
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


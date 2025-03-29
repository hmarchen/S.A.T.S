/*
    Basic layout structure for the app.
*/

import React from 'react';
import { View, Text, Button, Image, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import styles from '../styles/style';

// MAIN LAYOUT COMPONENT
interface LayoutProps {
  children: React.ReactNode; // This will hold the child content passed from the screen
}

const Structure: React.FC<LayoutProps> = ({ children }) => {
  // CONSTANTS
  const router = useRouter();
  const IMAGES = '../images/';

  // return if nothing in body
  if (!children) {
    return null;
  }

  return (
    <View style={styles.page}>
      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={require(IMAGES + 'DCSATSLogoText_White.png')} // Add your logo image here
          style={styles.logo}
        />
        <View style={styles.headerNav}>
          <Pressable onPress={() => { router.navigate('./home'); }}>
            <Text style={styles.navText}>Home</Text>
          </Pressable>
          <Pressable onPress={() => { router.navigate('./appointment'); }}>
            <Text style={styles.navText}>Book an appointment</Text>
          </Pressable>
          <Pressable onPress={() => { router.navigate('./admin'); }}>
            <Text style={styles.navText}>Go to Admin</Text>
          </Pressable>
        </View>
      </View>

      {/* HEADER SEPARATOR */}
      <View style={styles.headerSeparator} />

      {/* BODY / CONTENT */}
      <View style={styles.body}>
        {children}
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Image
          source={require(IMAGES + 'dc_logo_white.png')} // Add your logo image here
          style={styles.logo}
        />
      </View>
    </View>
  );
};

export default Structure;

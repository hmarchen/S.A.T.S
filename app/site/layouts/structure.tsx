/*
    Basic layout structure for the app.
*/

import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { View, Text, Button, Image, Pressable, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles/style';
import Result from './adminTabs/designs/Result';

// MAIN LAYOUT COMPONENT
interface LayoutProps {
  children: React.ReactNode; // This will hold the child content passed from the screen
}

interface Result {
  success: boolean
  status: string
}

export type StructureRef = {
  showResultClick: (success: boolean, status: string) => void;
};


// STRUCTURE ----------------------------------------------------------------------
const Structure = forwardRef<StructureRef, LayoutProps>(({ children }, ref) => {
  // CONSTANTS
  const router = useRouter();
  const IMAGES = '../images/';

  const [results, setResults] = useState<Result[]>([]);

  // EVENT HANDLERS
  const showResultClick = (success: boolean, status: string) => {
    const newResult: Result = {
      success: success,
      status: status,
    };
    setResults([...results, newResult]);
  
    setTimeout(() => {
      setResults((prevResults) => prevResults.filter((result) => result.status !== newResult.status));
    }, 5000);
  };

  useImperativeHandle(ref, () => ({
    showResultClick,
  }));

  // return if nothing in body
  if (!children) { return null; }

  return (
    <View style={styles.page}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { router.navigate('./home'); }}>
            <Image
                source={require(IMAGES + 'logos/DCSATSLogo_White.png')} // Add your logo image here
                style={styles.logo}
            />
        </TouchableOpacity>
        
        <View style={styles.headerNav}>
          <Pressable onPress={() => { router.navigate('./home'); }}>
            <Text style={styles.navText}>Home</Text>
          </Pressable>
          <Pressable onPress={() => { router.navigate('./appointment'); }}>
            <Text style={styles.navText}>Book an appointment</Text>
          </Pressable>
          <Pressable onPress={() => { router.navigate('./faq'); }}>
            <Text style={styles.navText}>Frequently Asked Questions</Text>
          </Pressable>
        </View>

        <View style={styles.navProfile}>
            <Pressable style={styles.navButton} onPress={() => { router.navigate('./login'); }}>
                <Text style={styles.navButtonText}>Advisor Login</Text>
            </Pressable>
            <Pressable style={styles.profileButton} onPress={() => { router.navigate('./admin'); }}>
                <Image
                    source={require(IMAGES + 'icons/admin_icon.png')} // Add your logo image here
                    style={[ styles.icon, { tintColor: 'rgb(117, 17, 17)' } ]}
                />
                <Text style={styles.profileButtonText}>View Admin Panel</Text>
            </Pressable>
        </View>
      </View>

      {/* HEADER SEPARATOR */}
      <View style={styles.headerSeparator} />

      {/* BODY / CONTENT */}
      <View style={styles.body}>
        {results.map((reason, index) => (
          <Result
            key={index}
            success={reason.success}
            status={reason.status}
          />
        ))}
        {children}
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => { window.open('https://durhamcollege.ca/', '_blank'); }}>
            <Image
            source={require(IMAGES + 'logos/dc_logo_white.png')} // Add your logo image here
            style={styles.logo}
            />
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default Structure;

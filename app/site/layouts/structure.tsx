/*
    Basic layout structure for the app.
*/

import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { View, Text, Button, Image, Pressable, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useRouter, Slot } from 'expo-router';
import styles from '../styles/style';
import Result from './adminTabs/designs/Result';
import { useUser } from '../context/userContext';
import Unauthorized from './unauthorized';
import { useNotifications } from '../context/notificationContext';

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

  const { results, showResultClick, closeResultClick } = useNotifications();
  const { user, setUser } = useUser(); 

  const logoutClick = () => {
    setUser(null);
    router.navigate('./login');
    showResultClick(true, 'Successfully logged out!');
  }

  useImperativeHandle(ref, () => ({
    showResultClick,
  }));

  // return if nothing in body
  if (!children) { return null; }

  return (
    <View style={styles.page}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { router.navigate('/site/home'); }}>
            <Image
                source={require(IMAGES + 'logos/DCSATSLogo_White.png')} // Add your logo image here
                style={styles.logo}
            />
        </TouchableOpacity>
        
        <View style={styles.headerNav}>
          <Pressable onPress={() => { router.navigate('/site/home'); }}>
            <Text style={styles.navText}>Home</Text>
          </Pressable>
          <Pressable onPress={() => { router.navigate('/site/appointment'); }}>
            <Text style={styles.navText}>Book an appointment</Text>
          </Pressable>
          <Pressable onPress={() => { router.navigate('/site/faq'); }}>
            <Text style={styles.navText}>Frequently Asked Questions</Text>
          </Pressable>
        </View>

        <View style={styles.navProfile}>
          {user ? (
            <View style={{ gap: 5 }}>
              <Pressable style={styles.navButton} onPress={logoutClick}>
              <Text style={styles.navButtonText}>Logout</Text>
              </Pressable>
                <Pressable style={styles.profileButton} onPress={() => { router.navigate('/site/admin'); }}>
                  <Image
                      source={require(IMAGES + 'icons/admin_icon.png')} // Add your logo image here
                      style={[ styles.icon, { tintColor: 'rgb(117, 17, 17)' } ]}
                  />
                  <Text style={styles.profileButtonText}>View Admin Panel</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable style={styles.navButton} onPress={() => { router.navigate('/site/login'); }}>
              <Text style={styles.navButtonText}>Advisor Login</Text>
            </Pressable>
          )}
          
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
            closeUI={closeResultClick}
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

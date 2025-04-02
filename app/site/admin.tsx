import React, { useState, useRef } from 'react';
import { View, Text, Platform, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './styles/style';
import Structure from './layouts/structure';
import AdminReasons from './layouts/adminTabs/reasons';
import AdminUsers from './layouts/adminTabs/users';

export default function Admin() {
  const isWeb = Platform.OS === 'web';
  const router = useRouter();
  const structureRef = useRef<any>(null);

  // UI Handling
  const [selectedTab, setSelectedTab] = useState('Users'); // State to control the visibility of the pop-up

  const usersTabClick = () => { setSelectedTab('Users'); };
  const reasonsTabClick = () => { setSelectedTab('Reasons'); };

  if (!isWeb) { return null; }

  // STRUCTURE REF
  const sendResult = (success: boolean, status: string) => {
    structureRef.current?.showResultClick(success, status);
  };

  return (
    <Structure ref={structureRef}>
      <View style={styles.adminContainer}>
        {/* Left Pane - Navigation */}
        <View style={styles.adminNav}>
          <Text style={styles.adminTitle}>Admin Dashboard</Text>
          <View style={styles.horizontalLine} />

          {/* Admin Tabs */}
          <Pressable onPress={() => { usersTabClick(); }}>
            <Text style={styles.adminButtonText}>Manage Users</Text>
          </Pressable>
          <Pressable onPress={reasonsTabClick}>
            <Text style={styles.adminButtonText}>Manage Reasons</Text>
          </Pressable>
        </View>


        {/* Right Pane - Main Content */}
        <View style={styles.adminMain}>
          <View style={styles.adminHeader}> 
            {selectedTab == "Users" && (
              <Text style={styles.adminSubtitle}>Manage Users</Text>
            )}
            {selectedTab == "Reasons" && (
              <Text style={styles.adminSubtitle}>Manage Reasons</Text>
            )}
          </View>

          <View style={styles.adminTab}>
            {/* -------- MANAGE USERS --------- */}
            {selectedTab == "Users" && (
              <AdminUsers sendResult={(success: boolean, result: string) => {sendResult(success, result)}}/>
            )}
      
            {/* -------- MANAGE REASONS --------- */}
            {selectedTab == "Reasons" && (
              <AdminReasons sendResult={(success: boolean, result: string) => {sendResult(success, result)}}/>
            )}
          </View>
        </View>
      </View>
    </Structure>
  );
}




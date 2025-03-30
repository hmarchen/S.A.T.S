import React, { useState } from 'react';
import { View, Text, Platform, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './styles/style';
import Structure from './layouts/structure';
import AdminReasons from './layouts/adminTabs/reasons';
import AdminUsers from './layouts/adminTabs/users';

export default function Admin() {
  const API_BASE_URL = window.location.host;

  const isWeb = Platform.OS === 'web';
  const router = useRouter();

  // UI Handling
  const [selectedTab, setSelectedTab] = useState('Users'); // State to control the visibility of the pop-up

  const usersTabClick = () => { setSelectedTab('Users'); };
  const reasonsTabClick = () => { setSelectedTab('Reasons'); };

  if (!isWeb) { return null; }

  return (
    <Structure>
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
            <ScrollView style={styles.adminScroll}> 
              {/* -------- MANAGE USERS --------- */}
              {selectedTab == "Users" && (
                <AdminUsers children={undefined} />
              )}
        
              {/* -------- MANAGE REASONS --------- */}
              {selectedTab == "Reasons" && (
                <AdminReasons children={undefined} />
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    </Structure>
  );
}




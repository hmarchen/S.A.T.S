import React, { useState } from 'react';
import { View, Text, Button, Image, Pressable, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../../styles/tabStyles';

// MAIN LAYOUT COMPONENT
interface LayoutProps {
  children: React.ReactNode; // This will hold the child content passed from the screen
}


const AdminUsers: React.FC<LayoutProps> = () => {
  // CONSTANTS
  const IMAGES = '../../images/';
  const [isVisible, setIsVisible] = useState(false);

  // EVENT HANDLER
  const handleButtonClick = () => { setIsVisible(true); };
  const handleClose = () => { setIsVisible(false); };

  return (
    <View style={styles.userContainer}>
      {/* Header */}
      <View style={styles.userHeader}>
        <Pressable style={styles.userAddButton} onPress={handleButtonClick}>
          <Image
            source={require(IMAGES + 'icons/add_icon.png')} // Add your logo image here
            style={[ styles.headerIcon, { tintColor: '#E1FFED' } ]}
          />
          <Text style={styles.userAddButtonText}>Add User</Text>
        </Pressable>
      </View>
      
      {/* Body */}
      <View style={styles.userBody}>
        <ScrollView style={styles.userScroll}>
          <Text style={{ fontStyle: 'italic', color: '#555' }}>Nothing yet...</Text>
        </ScrollView>

        {isVisible && (
          <Modal
            animationType="none"
            transparent={true}
            visible={isVisible}
            onRequestClose={handleClose}
          >
            <View style={styles.popup}>
              <View style={styles.popupBox}>
                <View style={styles.popupHeader}>
                  <Text style={styles.popupTitle}>Add User</Text>
                  <Pressable style={styles.popupClose} onPress={handleClose}>
                    <Image
                      source={require(IMAGES + 'icons/close_icon.png')} // Add your logo image here
                      style={[ styles.popupIcon, { tintColor: '#6C6D6C' } ]}
                    />
                  </Pressable>
                </View>

                <View style={styles.popupBody}>
                  <Text style={styles.popupText}>User Body</Text>
                </View>
                
              </View>
            </View>
          </Modal>
        )}
      </View>
    </View>
  )
}


export default AdminUsers;

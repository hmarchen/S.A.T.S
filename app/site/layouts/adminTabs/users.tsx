import React, { useState } from 'react';
import { View, Text, Button, Image, Pressable, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../../styles/tabStyles';
import NewUser from './designs/NewUser';

// MAIN LAYOUT COMPONENT
interface LayoutProps {
  children: React.ReactNode; // This will hold the child content passed from the screen
}


const AdminUsers: React.FC<LayoutProps> = () => {
  // CONSTANTS
  const router = useRouter();
  const IMAGES = '../../images/';
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  // EVENT HANDLER
  const handleAddPopupClick = () => { setIsAddVisible(true); };
  const handleEditPopupClick = () => { setIsEditVisible(true); };
  const handlePopupClose = () => { setIsAddVisible(false); setIsEditVisible(false); };
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const addUserClick = (event: { nativeEvent: { locationY: any; locationX: any; }; }) => {
    // Handle login logic here
    handlePopupClose();
  };

  const editUserClick = (event: { nativeEvent: { locationY: any; locationX: any; }; }) => {
    // Handle login logic here
    handleEditPopupClick();
  };

  const deleteUserClick = (event: { nativeEvent: { locationY: any; locationX: any; }; }) => {
    // Handle login logic here
    setError('Delete functionality not implemented yet...');

    setIsErrorVisible(true);

    setTimeout(() => {
      setIsErrorVisible(false);
    }, 5000);
  };

  const closeErrorClick = (event: { nativeEvent: { locationY: any; locationX: any; }; }) => {
      setIsErrorVisible(false);
  };

  return (
    <View style={styles.userContainer}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isErrorVisible}
      >
        <Pressable style={styles.errorContainer} onPress={closeErrorClick}>
          <Text style={styles.errorText}>{error}</Text>
        </Pressable>
      </Modal>

      {/* Header */}
      <View style={styles.userHeader}>
        <Pressable style={styles.userButton} onPress={handleAddPopupClick}>
          <Image
            source={require(IMAGES + 'icons/add_icon.png')} // Add your logo image here
            style={[ styles.headerIcon, { tintColor: '#E1FFED' } ]}
          />
          <Text style={styles.userButtonText}>Add User</Text>
        </Pressable>
      </View>
      
      {/* Body */}
      <View style={styles.userBody}>
        {/* ALL USERS */}
        <ScrollView style={styles.userScroll}>
          <NewUser 
            name={'NEW USER'} email={'test.test@durhamcollege.ca'} password={'somepassword'}
            onEditPress={editUserClick} onDeletePress={deleteUserClick} children={undefined} 
          />
          <NewUser 
            name={'Another User'} email={'another.user@durhamcollege.ca'} password={'somepassword'}
            onEditPress={editUserClick} onDeletePress={deleteUserClick} children={undefined} 
          />
          <NewUser 
            name={'Hi There'} email={'hi.there@durhamcollege.ca'} password={'somepassword'}
            onEditPress={editUserClick} onDeletePress={deleteUserClick} children={undefined} 
          />
          <NewUser 
            name={':33333'} email={'cat.face@durhamcollege.ca'} password={'somepassword'}
            onEditPress={editUserClick} onDeletePress={deleteUserClick} children={undefined} 
          />
          <NewUser 
            name={'YAYAYAYY'} email={'yipppeee.yahoooo@durhamcollege.ca'} password={'somepassword'}
            onEditPress={editUserClick} onDeletePress={deleteUserClick} children={undefined} 
          />
        </ScrollView>

        {/* ADD USER POPUP */}
        {(isAddVisible || isEditVisible) && (
          <Modal
            animationType="none"
            transparent={true}
            visible={isAddVisible || isEditVisible}
            onRequestClose={handlePopupClose}
          >
            <View style={styles.popup}>
              <View style={styles.popupBox}>
                <View style={styles.popupHeader}>
                  <Text style={styles.popupTitle}>Add User</Text>
                  <Pressable style={styles.popupClose} onPress={handlePopupClose}>
                    <Image
                      source={require(IMAGES + 'icons/close_icon.png')} // Add your logo image here
                      style={[ styles.popupIcon, { tintColor: '#6C6D6C' } ]}
                    />
                  </Pressable>
                </View>

                <View style={styles.popupBody}>
                  <Text style={styles.popupText}>Enter new user information:</Text>
                  <TextInput
                    style={styles.popupTextInput}
                    onChangeText={setEmail}
                    value={email}  
                    placeholder="Enter full name here" 
                  />
                  <TextInput
                    style={styles.popupTextInput}
                    onChangeText={setEmail}
                    value={email}  
                    placeholder="Enter new email here" 
                  />
                  <TextInput
                    style={styles.popupTextInput}
                    onChangeText={setPassword}
                    value={password}  
                    placeholder="Enter new password here" 
                  />
                  <Pressable style={styles.userButton} onPress={addUserClick}>
                    <Text style={styles.userButtonText}>Add</Text>
                  </Pressable>
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

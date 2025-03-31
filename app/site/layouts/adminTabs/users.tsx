import React, { useState } from 'react';
import { View, Text, Button, Image, Pressable, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import styles from '../../styles/tabStyles';
import NewUser from './designs/NewUser';

// MAIN LAYOUT COMPONENT
interface LayoutProps {
  children: React.ReactNode; // This will hold the child content passed from the screen
  sendResult: (success: boolean, error: string) => void;
}


const AdminUsers: React.FC<LayoutProps> = ({ sendResult }) => {
  // CONSTANTS
  const router = useRouter();
  const IMAGES = '../../images/';
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);

  // EVENT HANDLER
  const handleAddPopupClick = () => { 
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setSelectedRole('advisor');

    setIsAddVisible(true); 
  };
  const handleEditPopupClick = () => { setIsEditVisible(true); };
  const handlePopupClose = () => { setIsAddVisible(false); setIsEditVisible(false); };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('advisor');

  const addUserClick = () => {
    // Handle login logic here
    sendResult(false, 'Add User functionality not implemented yet...');
    handlePopupClose();
  };

  const editUserClick = (firstName: string, lastName: string, email: string, password: string, role: string) => {
    // Handle login logic here
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setPassword(password);
    setSelectedRole(role);

    handleEditPopupClick();
  };

  const deleteUserClick = () => {
    // Handle login logic here
    sendResult(false, 'Delete functionality not implemented yet...');
  };

  return (
    <View style={styles.userContainer}>
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
            firstName={'NEW'} lastName={'USER'} email={'test.test@durhamcollege.ca'} password={'somepassword'} role={'admin'}
            onEditPress={editUserClick} onDeletePress={deleteUserClick} children={undefined} 
          />
          <NewUser 
            firstName={'Another'} lastName={'User'} email={'another.user@durhamcollege.ca'} password={'somepassword'} role={'advisor'}
            onEditPress={editUserClick} onDeletePress={deleteUserClick} children={undefined} 
          />
          <NewUser 
            firstName={'Hi'} lastName={'There'} email={'hi.there@durhamcollege.ca'} password={'somepassword'} role={'advisor'}
            onEditPress={editUserClick} onDeletePress={deleteUserClick} children={undefined} 
          />
          <NewUser 
            firstName={':'} lastName={'33333'} email={'cat.face@durhamcollege.ca'} password={'somepassword'} role={'admin'}
            onEditPress={editUserClick} onDeletePress={deleteUserClick} children={undefined} 
          />
          <NewUser 
            firstName={'YAYAYAYY'} lastName={'YAAAAA'} email={'yipppeee.yahoooo@durhamcollege.ca'} password={'somepassword'} role={'advisor'}
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
                  {isAddVisible && (
                    <Text style={styles.popupTitle}>Add User</Text>
                  )}
                  {isEditVisible && (
                    <Text style={styles.popupTitle}>Edit User</Text>
                  )}
                  <Pressable style={styles.popupClose} onPress={handlePopupClose}>
                    <Image
                      source={require(IMAGES + 'icons/close_icon.png')} // Add your logo image here
                      style={[ styles.popupIcon, { tintColor: '#6C6D6C' } ]}
                    />
                  </Pressable>
                </View>

                <View style={styles.popupBody}>
                  {isAddVisible && (
                    <Text style={styles.popupSubtitle}>Enter new user information:</Text>
                  )}
                  {isEditVisible && (
                    <Text style={styles.popupSubtitle}>Edit user information:</Text>
                  )}
                  <View style={styles.popupBodyRow}>
                    <TextInput
                      style={styles.popupTextInput}
                      onChangeText={setFirstName}
                      value={firstName}  
                      placeholder="Enter first name here" 
                    />
                    <TextInput
                      style={styles.popupTextInput}
                      onChangeText={setLastName}
                      value={lastName}  
                      placeholder="Enter last name here" 
                    />
                  </View>
                  <View style={styles.popupBodyRow}>
                    <TextInput
                      style={styles.popupTextInput}
                      onChangeText={setEmail}
                      value={email}  
                      placeholder="Enter new email here" 
                    />
                  </View>
                  <View style={styles.popupBodyRow}>
                    <TextInput
                      style={styles.popupTextInput}
                      onChangeText={setPassword}
                      value={password}  
                      placeholder="Enter new password here" 
                    />
                  </View>
                  <View style={styles.popupBodyRow}>
                    <Text style={styles.popupText}>Role:</Text>
                    <Picker
                      selectedValue={selectedRole}
                      onValueChange={(itemValue) => setSelectedRole(itemValue)}
                      style={styles.picker}
                    >
                      <Picker.Item label="Advisor" value="advisor" />
                      <Picker.Item label="Admin" value="admin" />
                    </Picker>
                  </View>
                  
                  <Pressable style={styles.userButton} onPress={addUserClick}>
                    {isAddVisible && (
                      <Text style={styles.userButtonText}>Add</Text>
                    )}
                    {isEditVisible && (
                      <Text style={styles.userButtonText}>Update</Text>
                    )}
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

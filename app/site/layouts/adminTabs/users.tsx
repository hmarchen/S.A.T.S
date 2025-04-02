import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Pressable, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import styles from '../../styles/tabStyles';
import NewUser from './designs/NewUser';
import User from '@/db/classes/User';
import DBUsers from '@/db/dbUsers';

// MAIN LAYOUT COMPONENT
interface LayoutProps {
  sendResult: (success: boolean, error: string) => void;
}


const AdminUsers: React.FC<LayoutProps> = ({ sendResult }) => {
  // CONSTANTS
  const router = useRouter();
  const IMAGES = '../../images/';
  const API_BASE_URL = 'http://localhost:3001';
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User>(new User('place@holder.com', 'place', 'holder', '123456', 'advisor'));
  const [users, setUsers] = useState<User[]>([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('advisor');

  // EVENT HANDLER
  const handleAddPopupClick = () => { 
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setSelectedRole('advisor');

    setIsAddVisible(true); 
  };
  const handleEditPopupClick = () => { 
    setIsEditVisible(true); 
  };
  const handleDeletePopupClick = (user: User) => { 
    setIsDeleteVisible(true);
    setSelectedUser(user);
    console.log(isDeleteVisible);
  };
  const handlePopupClose = () => { 
    setIsAddVisible(false); 
    setIsEditVisible(false); 
    setIsDeleteVisible(false);
  };


  useEffect(() => {
    fetchUsers();
  }, []);
    
  const fetchUsers = async () => {
    try {
      console.log('fetch attempt');
      const response = await fetch(`${API_BASE_URL}/users`);
      console.log(response);
      if (!response.ok) throw new Error('Failed to fetch users');
      const users = await response.json();
      setUsers(users);
    } catch (error) {
      sendResult(false, `Failed to load users: ${error}`);
    }
  };
  

  const addUserClick = () => {
    // Handle login logic here
    sendResult(false, 'Add User functionality not implemented yet...');
    handlePopupClose();
  };

  const editUserClick = (user: User) => {
    // Handle login logic here
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPassword(user.password);
    setSelectedRole(user.role);

    handleEditPopupClick();
  };

  const deleteUserClick = () => {
    // Handle login logic here
    sendResult(false, 'Delete functionality not implemented yet...');

    handlePopupClose();
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
          <FlatList
            data={users}
            style={{ padding: 3 }}
            keyExtractor={(item) => item.email.toString()}
            renderItem={({ item }) => (
                <View>
                  <NewUser 
                    user={item} 
                    isActive={true}
                    onEditPress={() => { editUserClick(item); }} 
                    onDeletePress={() => { handleDeletePopupClick(item); }} 
                  />
                </View>
              )}
          />
        </ScrollView>

        {/* ADD USER POPUP */}
        {(isAddVisible || isEditVisible || isDeleteVisible) && (
          <Modal
            animationType="none"
            transparent={true}
            visible={isAddVisible || isEditVisible || isDeleteVisible}
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
                  {isDeleteVisible && (
                    <Text style={styles.popupTitle}>Are you sure?</Text>
                  )}
                  <Pressable style={styles.popupClose} onPress={handlePopupClose}>
                    <Image
                      source={require(IMAGES + 'icons/close_icon.png')} // Add your logo image here
                      style={[ styles.popupIcon, { tintColor: '#6C6D6C' } ]}
                    />
                  </Pressable>
                </View>

                {/* DELETE CONFIRMATION */}
                {isDeleteVisible && (
                  <View style={styles.popupBody}>
                    <Text style={styles.popupSubtitle}>
                      You are about to delete the following item:
                    </Text>
                    <NewUser 
                      user={selectedUser}
                      isActive={false}
                      onEditPress={() => {}} 
                      onDeletePress={() => {}} 
                    />
                    <View style={styles.popupBodyRow}>
                      <Pressable style={styles.userButton} onPress={deleteUserClick}>
                        <Text style={styles.userButtonText}>Confirm</Text>
                      </Pressable>
                      <Pressable 
                        style={[ styles.userButton, { backgroundColor: '#b91111' } ]} 
                        onPress={handlePopupClose}
                      >
                        <Text style={styles.userButtonText}>Cancel</Text>
                      </Pressable>
                    </View>
                  </View>
                )}

                {(isAddVisible || isEditVisible) && (
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
                )}
              </View>
            </View>
          </Modal>
        )}
      </View>
    </View>
  )
}


export default AdminUsers;

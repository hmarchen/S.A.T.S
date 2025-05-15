import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Pressable, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import styles from '../../styles/tabStyles';
import NewUser from './designs/NewUser';
import User from '@/db/classes/User';

// MAIN LAYOUT COMPONENT
interface LayoutProps {
  sendResult: (success: boolean, error: string) => void;
}

const AdminUsers: React.FC<LayoutProps> = ({ sendResult }) => {
  // CONSTANTS
  const router = useRouter();
  const IMAGES = '../../images/';
  const API_BASE_URL = 'http://192.168.193.60:3002';
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User>(new User('place@holder.com', 'place', 'holder', '123456', 'advisor', ''));
  const [users, setUsers] = useState<User[]>([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('advisor');
  const [ics, setIcs] = useState('');

  // EVENT HANDLER
  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setEditPassword('');
    setSelectedRole('advisor');
    setIcs('');
    setIsPassVisible(false);
  };
  
  const handleAddPopupClick = () => {
    resetForm();
    setIsAddVisible(true); 
  };
  const handleEditPopupClick = (user: User) => { 
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPassword(user.password);
    setSelectedRole(user.role);
    setIcs(user.ics);

    setIsEditVisible(true); 
  };
  const handleDeletePopupClick = (user: User) => { 
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPassword(user.password);
    setSelectedRole(user.role);
    setIcs(user.ics);
    
    setIsDeleteVisible(true);
    setSelectedUser(user);
  };
  const handlePopupClose = () => { 
    setIsAddVisible(false); 
    setIsEditVisible(false); 
    setIsDeleteVisible(false);
    resetForm();
  };
  const handleVisible = () => {
    if (isPassVisible) { setIsPassVisible(false); }
    else { setIsPassVisible(true); }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
    
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      if (!response.ok) throw new Error('Failed to fetch users');
      const users = await response.json();
      setUsers(users);
    } catch (error: any) {
      sendResult(false, `Failed to load users: ${error.message}`);
    }
  };
  
  const addUserClick = async () => {
    try {
      const newUser = new User(email.trim(), firstName.trim(), lastName.trim(), password.trim(), selectedRole.trim(), ics.trim());

      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) throw new Error('An issue occurred while saving user.');
  
      await fetchUsers();
      sendResult(true, 'Successfully added a new user!');
      handlePopupClose();
    } catch (error: any) {
      sendResult(false, `Failed to create user: ${error.message}`);
    }
  };

  const editUserClick = async () => {
    try {
      // check if user exists
      if (editPassword && editPassword.trim().length < 6) {
        throw new Error('Password must be at least 6 characters long.');
      }

      const newPassword = editPassword 
        ? await fetch(`${API_BASE_URL}/hash-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: editPassword }),
          })
          .then(response => {
        if (!response.ok) {
          throw new Error('Failed to hash password');
        }
        return response.json();
          })
          .then(data => data.hashedPassword)
      : password;
      const user = new User(email.trim(), firstName.trim(), lastName.trim(), newPassword, selectedRole.trim(), ics.trim());

      const getResponse = await fetch(`${API_BASE_URL}/users/${user.email}`);
      if (!getResponse.ok) {
        const resError = await getResponse.json();
        throw new Error(`${resError}` || 'Failed to fetch users');
      }

      console.log(user.email);

      // update user
      const response = await fetch(`${API_BASE_URL}/users/${user.email}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const resError = await response.json();
        throw new Error(`${resError}` || 'An error occurred while updating user...');
      }
      
      const updatedUser = await response.json();
        setUsers(users.map(user => 
        user.email === updatedUser.email ? updatedUser : user
      ));
      
      sendResult(true, 'Successfully update user!');
      await fetchUsers();
      handlePopupClose();
    } catch (error: any) {
      sendResult(false, `Failed to update user: ${error.message}`);
    }
  };

  const deleteUserClick = async () => {
    try {
      // user validation
      const user = new User(email, firstName, lastName, password, selectedRole, ics);
      
      const response = await fetch(`${API_BASE_URL}/users/${user.email}`, {
          method: 'DELETE',
      });

      if (!response.ok) {
        const resError = await response.json();
        throw new Error(`${resError}` || 'An issue occurred while deleting user...');
      }
      
      setUsers(users.filter(user => user.email !== selectedUser.email));
      sendResult(true, 'Successfuly deleted user.');

      handlePopupClose();
    } catch (error: any) {
      sendResult(false, `Failed to delete user: ${error.message}`);
    }
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
                    onEditPress={() => { handleEditPopupClick(item); }} 
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

                {(isAddVisible) && (
                  <View style={styles.popupBody}>
                    <Text style={styles.popupSubtitle}>Enter new user information:</Text>
                    <View style={styles.popupBodyRow}>
                      <TextInput
                        style={styles.popupTextInput}
                        onChangeText={setFirstName}
                        value={firstName}  
                        placeholder="Enter first name here"
                        placeholderTextColor="#999"
                      />
                      <TextInput
                        style={styles.popupTextInput}
                        onChangeText={setLastName}
                        value={lastName}  
                        placeholder="Enter last name here"
                        placeholderTextColor="#999"
                      />
                    </View>
                    <View style={styles.popupBodyRow}>
                      <TextInput
                        style={styles.popupTextInput}
                        onChangeText={setEmail}
                        value={email}  
                        placeholder="Enter new email here"
                        placeholderTextColor="#999"
                      />
                    </View>
                    <View style={styles.popupBodyRow}>
                      <TextInput
                        style={styles.popupTextInput}
                        onChangeText={setPassword}
                        value={password}  
                        secureTextEntry={!isPassVisible}
                        placeholder="Enter new password here"
                        placeholderTextColor="#999"
                      />
                      <Pressable style={styles.popupClose} onPress={handleVisible}>
                        {isPassVisible ? (
                          <Image 
                          source={require(IMAGES + 'icons/visible_icon.png')} 
                          style={[styles.popupIcon, {tintColor: "rgb(49, 49, 49)"}]}
                          />
                        ) : (
                          <Image 
                          source={require(IMAGES + 'icons/invisible_icon.png')} 
                          style={[styles.popupIcon, {tintColor: "rgb(49, 49, 49)"}]}
                          />
                        )}
                      </Pressable>
                    </View>
                    <View style={styles.popupBodyRow}>
                      <TextInput
                        style={styles.popupTextInput}
                        onChangeText={setIcs}
                        value={ics}  
                        placeholder="Enter outlook calender link here (optional)"
                        placeholderTextColor="#999"
                      />
                    </View>
                    <View style={styles.popupBodyRow}>
                      <Text style={styles.popupText}>Role:</Text>
                      <Picker
                        selectedValue={selectedRole}
                        onValueChange={(itemValue) => setSelectedRole(itemValue)}
                        style={styles.picker}
                      >
                        <Picker.Item label="Admin" value="admin" />
                        <Picker.Item label="Advisor" value="advisor" />
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

                {isEditVisible && (
                  <View style={styles.popupBody}>
                    <Text style={styles.popupSubtitle}>Edit user information:</Text>
                    <View style={styles.popupBodyRow}>
                      <TextInput
                        style={styles.popupTextInput}
                        onChangeText={setFirstName}
                        value={firstName}  
                        placeholder="Enter first name here"
                        placeholderTextColor="#999"
                      />
                      <TextInput
                        style={styles.popupTextInput}
                        onChangeText={setLastName}
                        value={lastName}  
                        placeholder="Enter last name here"
                        placeholderTextColor="#999"
                      />
                    </View>
                    <View style={styles.popupBodyRow}>
                      <TextInput
                        style={styles.popupTextInput}
                        onChangeText={setEmail}
                        value={email}  
                        placeholder="Enter new email here"
                        placeholderTextColor="#999"
                      />
                    </View>
                    <View style={styles.popupBodyRow}>
                      <TextInput
                        style={styles.popupTextInput}
                        onChangeText={setEditPassword}
                        secureTextEntry={!isPassVisible}
                        placeholder="Create a new password here (optional)"
                        placeholderTextColor="#999"
                      />
                      <Pressable style={styles.popupClose} onPress={handleVisible}>
                        {isPassVisible ? (
                          <Image 
                          source={require(IMAGES + 'icons/visible_icon.png')} 
                          style={[styles.popupIcon, {tintColor: "rgb(49, 49, 49)"}]}
                          />
                        ) : (
                          <Image 
                          source={require(IMAGES + 'icons/invisible_icon.png')} 
                          style={[styles.popupIcon, {tintColor: "rgb(49, 49, 49)"}]}
                          />
                        )}
                      </Pressable>
                    </View>
                    <View style={styles.popupBodyRow}>
                      <TextInput
                        style={styles.popupTextInput}
                        onChangeText={setIcs}
                        value={ics}  
                        placeholder="Enter outlook calender link here (optional)"
                        placeholderTextColor="#999"
                      />
                    </View>
                    <View style={styles.popupBodyRow}>
                      <Text style={styles.popupText}>Role:</Text>
                      <Picker
                        selectedValue={selectedRole}
                        onValueChange={(itemValue) => setSelectedRole(itemValue)}
                        style={styles.picker}
                      >
                        <Picker.Item label="Admin" value="admin" />
                        <Picker.Item label="Advisor" value="advisor" />
                      </Picker>
                    </View>
                    
                    <Pressable style={styles.userButton} onPress={editUserClick}>
                      <Text style={styles.userButtonText}>Update</Text>
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

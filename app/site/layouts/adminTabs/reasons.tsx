import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Pressable, ScrollView, StyleSheet, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../../styles/tabStyles';
import { Checkbox } from 'react-native-paper';
import NewReason, { Reason } from './designs/NewReason';

// MAIN LAYOUT COMPONENT
interface LayoutProps {
  sendResult: (success: boolean, error: string) => void;
}

const AdminReasons: React.FC<LayoutProps> = ({ sendResult }) => {
  // CONSTANTS
  const router = useRouter();
  const IMAGES = '../../images/';
  const API_BASE_URL = 'http://localhost:3001';
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  const [selectedReason, setSelectedReason] = useState<Reason>({} as Reason); // for deletion
  const [reasons, setReasons] = useState<Reason[]>([]);
  const [newReason, setNewReason] = useState<Partial<Reason>>({ category: '', details: '', redirect: ''  });
  const [editingReason, setEditingReason] = useState<Reason | null>(null);

  // EVENT HANDLER
  const handleAddPopupClick = () => { 
    setIsAddVisible(true); 
  };
  const handleEditPopupClick = (reason: Reason) => {
    setIsEditVisible(true);
    setEditingReason(reason);
  };
  const handleDeletePopupClick = (reason: Reason) => { 
    setIsDeleteVisible(true);
    setSelectedReason(reason);
  };
  const handlePopupClose = () => { 
    setIsAddVisible(false); 
    setIsEditVisible(false); 
    setIsDeleteVisible(false);
    setEditingReason(null);
  };

  useEffect(() => {
    fetchReasons();
  }, []);
  
  const fetchReasons = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reasons`);
      if (!response.ok) throw new Error('Failed to fetch reasons');
      const data = await response.json();
      setReasons(data.reasons);
    } catch (error) {
      console.error('Error fetching reasons:', error);
      sendResult(false, 'Failed to load reasons. Please try again.');
    }
  };

  const handleReasonAdd = async () => {
    if (newReason.category?.trim() && newReason.details?.trim()) {
      if (newReason.redirect?.trim() === '') {
        newReason.redirect = undefined;
      }
      
      try {
      const response = await fetch(`${API_BASE_URL}/reasons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReason),
      });

      if (!response.ok) throw new Error('Failed to add reason');
      
      const addedReason = await response.json();
      setReasons([...reasons, addedReason]);
      setNewReason({ category: '', details: '', redirect: '' });
      sendResult(true, 'Successfully added a new reason!');
      } catch (error) {
      console.error('Error adding reason:', error);
      sendResult(false, 'Failed to add reason. Please try again.');
      }

      handlePopupClose();
    }
    else {
      // error handling
      if (!newReason.category?.trim()) {
      sendResult(false, 'Reason Category cannot be left empty.');
      }
      else if (!newReason.details?.trim()) {
      sendResult(false, 'Reason Details cannot be left empty.');
      }
    }
  };

  const handleReasonUpdate = async () => {
    if (editingReason?.category && editingReason?.details) {
      try {
          const response = await fetch(`${API_BASE_URL}/reasons`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(editingReason),
          });

          if (!response.ok) throw new Error('Failed to update reason');
          
          const updatedReason = await response.json();
            setReasons(reasons.map(r => 
            r.id === updatedReason.id ? updatedReason : r
          ));
          setEditingReason(null);
          sendResult(true, 'Successfully update reason!');
      } catch (error) {
          console.error('Error updating reason:', error);
          sendResult(false, 'Failed to update reason. Please try again.');
      }

      handlePopupClose();
    }
    else {
      // error handling
      if (!newReason.category) {
        sendResult(false, 'Reason Category cannot be left empty.');
      }
      else if (!newReason.details) {
        sendResult(false, 'Reason Details cannot be left empty.');
      }
    }
  };

  const handleReasonDelete = async () => {
    try {
      if (!selectedReason) {
        sendResult(false, 'No reason selected for deletion.');
        return;
      }
      
      const response = await fetch(`${API_BASE_URL}/reasons/${selectedReason.id}`, {
          method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete reason');
      
      setReasons(reasons.filter(r => r.id !== selectedReason.id));
      setEditingReason(null);
      sendResult(true, 'Successfuly deleted reason.');

      handlePopupClose();
    } catch (error) {
      console.error('Error deleting reason:', error);
      sendResult(false, 'Failed to delete reason. Please try again.');
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
          <Text style={styles.userButtonText}>New Reason</Text>
        </Pressable>
      </View>
      
      {/* Body */}
      <View style={styles.userBody}>
        {/* ALL USERS */}
        <ScrollView style={styles.userScroll}>
          <FlatList
            data={reasons}
            style={{ padding: 3 }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View>
                  <NewReason 
                    reason={item}
                    isActive={true}
                    onEditPress={handleEditPopupClick} 
                    onDeletePress={() => {handleDeletePopupClick(item)}} 
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
                    <Text style={styles.popupTitle}>Add Reason</Text>
                  )}
                  {isEditVisible && (
                    <Text style={styles.popupTitle}>Edit Reason</Text>
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

                {/* ADDING NEW REASON */}
                {isAddVisible && (
                  <View style={styles.popupBody}>
                    <Text style={styles.popupSubtitle}>Create a new reason:</Text>
                    <View style={styles.popupBodyRow}>
                    <TextInput
                      style={styles.popupTextInput}
                      onChangeText={(text) => setNewReason({ ...newReason, category: text })}
                      value={newReason.category}  
                      placeholder="Enter reason category" 
                      placeholderTextColor="#999"
                    />
                    </View>
                    <View style={styles.popupBodyRow}>
                      <TextInput
                        style={styles.popupTextInput}
                        onChangeText={(text) => setNewReason({ ...newReason, details: text })}
                        value={newReason.details}  
                        placeholder="Enter reason details" 
                        placeholderTextColor="#999"
                      />
                    </View>
                    <View style={styles.popupBodyRow}>
                    <TextInput
                        style={styles.popupTextInput}
                        onChangeText={(text) => setNewReason({ ...newReason, redirect: text })}
                        value={newReason.redirect}  
                        placeholder="Enter redirect link (optional)" 
                        placeholderTextColor="#999"
                      />
                    </View>
                    <Pressable style={styles.userButton} onPress={handleReasonAdd}>
                      <Text style={styles.userButtonText}>Add</Text>
                    </Pressable>
                  </View>
                )}

                {/* EDITTING NEW REASON */}
                {isEditVisible && editingReason && (
                  <View style={styles.popupBody}>
                    <Text style={styles.popupSubtitle}>Edit reason:</Text>
                    <View style={styles.popupBodyRow}>
                    <TextInput
                      style={styles.popupTextInput}
                      onChangeText={(text) => setEditingReason({ ...editingReason, category: text })}
                      value={editingReason.category}  
                      placeholder="Enter reason category" 
                      placeholderTextColor="#999"
                    />
                    </View>
                    <View style={styles.popupBodyRow}>
                      <TextInput
                        style={styles.popupTextInput}
                        onChangeText={(text) => setEditingReason({ ...editingReason, details: text })}
                        value={editingReason.details}  
                        placeholder="Enter reason details" 
                        placeholderTextColor="#999"
                      />
                    </View>
                    <View style={styles.popupBodyRow}>
                      <TextInput
                        style={styles.popupTextInput}
                        onChangeText={(text) => setEditingReason({ ...editingReason, redirect: text })}
                        value={editingReason.redirect}  
                        placeholder="Enter redirect link (optional)" 
                        placeholderTextColor="#999"
                      />
                    </View>
                    <Pressable style={styles.userButton} onPress={handleReasonUpdate}>
                      <Text style={styles.userButtonText}>Update</Text>
                    </Pressable>
                  </View>
                )}                

                {/* DELETE CONFIRMATION */}
                {isDeleteVisible && (
                  <View style={styles.popupBody}>
                    <Text style={styles.popupSubtitle}>
                      You are about to delete the following item:
                    </Text>
                    <NewReason 
                      reason={selectedReason}
                      isActive={false}
                      onEditPress={() => {}} 
                      onDeletePress={() => {}} 
                    />
                    <View style={styles.popupBodyRow}>
                      <Pressable style={styles.userButton} onPress={handleReasonDelete}>
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
              </View>
            </View>
          </Modal>
        )}
      </View>
    </View>
  )
}

export default AdminReasons;
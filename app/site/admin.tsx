import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Platform, ScrollView, Pressable, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './styles/style';
import ogStyles from '../css/styles';
import Structure from './structure/structure';

interface Reason {
  id: number;
  category: string;
  details: string;
}


export default function Admin() {
  const API_BASE_URL = window.location.host;

  const [reasons, setReasons] = useState<Reason[]>([]);
  const [newReason, setNewReason] = useState<Partial<Reason>>({ category: '', details: '' });
  const [editingReason, setEditingReason] = useState<Reason | null>(null);
  const [selectedReason, setSelectedReason] = useState<Reason | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isWeb = Platform.OS === 'web';
  const router = useRouter();

  useEffect(() => {
    fetchReasons();
  }, []);

  const fetchReasons = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reasons`);
      if (!response.ok) throw new Error('Failed to fetch reasons');
      const data = await response.json();
      setReasons(data.reasons);
      setError(null);
    } catch (error) {
      console.error('Error fetching reasons:', error);
      setError('Failed to load reasons. Please try again.');
    }
  };

  const handleAddReason = async () => {
    if (newReason.category && newReason.details) {
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
        setNewReason({ category: '', details: '' });
        setSelectedReason(null);
        setError(null);
      } catch (error) {
        console.error('Error adding reason:', error);
        setError('Failed to add reason. Please try again.');
      }
    }
  };

  const handleEditReason = (reason: Reason) => {
    setEditingReason(reason);
    setSelectedReason(reason);
  };

  const handleSaveEdit = async () => {
    if (editingReason) {
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
        setSelectedReason(null);
        setError(null);
      } catch (error) {
        console.error('Error updating reason:', error);
        setError('Failed to update reason. Please try again.');
      }
    }
  };

  const handleDeleteReason = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reasons/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete reason');
      
      setReasons(reasons.filter(r => r.id !== id));
      setSelectedReason(null);
      setEditingReason(null);
      setError(null);
    } catch (error) {
      console.error('Error deleting reason:', error);
      setError('Failed to delete reason. Please try again.');
    }
  };

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
          <Pressable onPress={usersTabClick}>
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
                <Text>hi everyone</Text>
              )}
        
              {/* -------- MANAGE REASONS --------- */}
              {selectedTab == "Reasons" && (
                <View style={styles2.container}>
                <Text style={styles2.title}>Admin Panel - Manage Reasons</Text>
                
                {error && (
                <View style={styles2.errorContainer}>
                    <Text style={styles2.errorText}>{error}</Text>
                </View>
                )}
                
                <View style={styles2.paneContainer}>
                {/* Left pane - Reasons list */}
                <View style={styles2.leftPane}>
                    <Text style={styles2.paneTitle}>Reasons List</Text>
                    <FlatList
                    data={reasons}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View 
                        style={[
                            styles2.reasonItem,
                            selectedReason?.id === item.id && styles2.selectedReason
                        ]}
                        onTouchEnd={() => setSelectedReason(item)}
                        >
                        <View style={styles2.reasonContent}>
                            <Text style={styles2.category}>{item.category}</Text>
                            <Text style={styles2.details}>{item.details}</Text>
                        </View>
                        <View style={styles2.actions}>
                            <Pressable style={ogStyles.button} onPress={() => handleEditReason(item)}>
                            <Text>Edit</Text>
                            </Pressable>
                            <Pressable style={ogStyles.clearButton} onPress={() => handleDeleteReason(item.id)} >
                            <Text>Delete</Text>
                            </Pressable>
                        </View>
                        </View>
                    )}
                    />
                </View>
            
                {/* Right pane - Edit/Add form */}
                <View style={styles2.rightPane}>
                    <Text style={styles2.paneTitle}>
                    {editingReason ? 'Edit Reason' : 'Add New Reason'}
                    </Text>
                    <ScrollView style={styles2.form}>
                    {editingReason ? (
                        <View style={styles2.editForm}>
                        <TextInput
                            style={styles2.input}
                            placeholder="Category"
                            value={editingReason.category}
                            onChangeText={(text) => setEditingReason({ ...editingReason, category: text })}
                        />
                        <TextInput
                            style={styles2.input}
                            placeholder="Details"
                            value={editingReason.details}
                            onChangeText={(text) => setEditingReason({ ...editingReason, details: text })}
                        />
                        <Pressable style={ogStyles.button} onPress={handleSaveEdit}>
                            <Text>Save Changes</Text>
                        </Pressable>
                        <Pressable style={ogStyles.clearButton} onPress={() => {
                            setEditingReason(null);
                            setSelectedReason(null);
                        }}>
                            <Text>Cancel</Text>
                        </Pressable>
                        </View>
                    ) : (
                        <View style={styles2.addForm}>
                        <TextInput
                            style={styles2.input}
                            placeholder="Category"
                            value={newReason.category}
                            onChangeText={(text) => setNewReason({ ...newReason, category: text })}
                        />
                        <TextInput
                            style={styles2.input}
                            placeholder="Details"
                            value={newReason.details}
                            onChangeText={(text) => setNewReason({ ...newReason, details: text })}
                        />
                        <Pressable style={styles.button} onPress={handleAddReason}>
                            <Text>Add Reason</Text>
                        </Pressable>
                        </View>
                    )}
                    </ScrollView>
                  </View>
                </View>
              </View>
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    </Structure>
  );
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 20,
    backgroundColor: '#1a1a1a',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
  },
  errorContainer: {
    backgroundColor: '#ff4444',
    padding: 10,
    borderRadius: 4,
    marginBottom: 15,
  },
  errorText: {
    color: '#ffffff',
    textAlign: 'center',
  },
  paneContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  leftPane: {
    flex: 1,
    backgroundColor: '#2d2d2d',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  rightPane: {
    flex: 1,
    backgroundColor: '#2d2d2d',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  paneTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#ffffff',
  },
  form: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#404040',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
  },
  reasonItem: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#404040',
  },
  selectedReason: {
    backgroundColor: '#2c3e50',
    borderColor: '#3498db',
  },
  reasonContent: {
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ffffff',
  },
  details: {
    fontSize: 14,
    color: '#b3b3b3',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  editForm: {
    gap: 10,
  },
  addForm: {
    gap: 10,
  },
});


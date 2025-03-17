import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Breadcrumb from './breadcrumb';
import styles from '../css/styles';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system';

const filePath = FileSystem.documentDirectory + 'user.json';

export default function Reason() {
// Router and State values
  const router = useRouter();
  const [reasons, setReasons] = useState<Reason[]>([]);
  const [reason, SetReason] = useState<Reason>();

  type Reason = {
    id: number;
    category: string;
    details: string;
  }


  const getReasons = async() => {
    try {
      const response = await fetch('http://10.0.2.2:3001/reasons')
      .then(res => {return res.json()})
      .then(data => {console.log(data.reasons); return data.reasons});

      console.log(response);
      return response;
    }
    catch(e) {
      console.error(e);
    }
  }
  useEffect(() => {
    const fetchReasons = async () => {
      const data = await getReasons();
      if (data) setReasons(data);
    };
    fetchReasons();
  }, []);
    
    const handlePress = async(item: Reason) => {
      try{
        SetReason(item);
      const fileExists = await FileSystem.getInfoAsync(filePath);
      let updatedData = fileExists.exists ? JSON.parse(await FileSystem.readAsStringAsync(filePath)) : [];

      updatedData.length > 0
        ? (updatedData[0].reason = item.category)
        : updatedData.push({ firstname: "", lastname: "", studentID: "", DCMail: "", campus: "", program: "", reason: item.category });

      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedData, null, 2));
      console.log("Form Submitted: Reason");
      console.log("Navigating to EndScreen...");
      router.push("/Login/Calendar");
      
      console.log(item.category);
    } catch (error) {
    console.error("Error writing to file:", error);
    Alert.alert("Error", "Failed to save data.");
  }
};

  return (
    
    <SafeAreaView style={{flex:1}}>
        <FlatList 
            data={reasons}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.gridItem} onPress={() => handlePress(item)}>
                    <Text style={styles.gridItemText}>{item.category}</Text>
                </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
            numColumns={3}
            contentContainerStyle={styles.gridContainer}

        />
          <Text style={styles.textLink} onPress={() => router.push('/Login/OtherReason')}>Didn't find what you wanted?</Text>
          <Breadcrumb entities={['Disclaimer', 'StudentNumber', 'Firstname', 'Lastname', 'DCMail', 'Institution', 'Program', 'Reason']} flowDepth={7} />
</SafeAreaView>
  );
}
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../css/styles';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system';

const filePath = FileSystem.documentDirectory + 'user.json';

export default function Reason() {

  const router = useRouter();

  type Reason = {
    id: number;
    category: string;
    details: string;
  }

  const [reason, setReason] = useState<Reason[]>([]);

  const getReasons = async() => {
    try {
      const response = await fetch('http://10.0.2.2:3000/reasons')
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
      if (data) setReason(data);
    };
    fetchReasons();
  }, []);
    
    const handlePress = (title: String) => {

          console.log();
      
      console.log(title);
    }

  return (
    
    <SafeAreaView style={{flex:1}}>
        <FlatList 
            data={reason}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.gridItem} onPress={() => handlePress(item.category)}>
                    <Text style={styles.gridItemText}>{item.category}</Text>
                </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
            numColumns={3}
            contentContainerStyle={styles.gridContainer}

        />
          <Text style={styles.textLink} onPress={() => router.push('/Login/OtherReason')}>Didn't find what you wanted?</Text>
</SafeAreaView>
  );
}
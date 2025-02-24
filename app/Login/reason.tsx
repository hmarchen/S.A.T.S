import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../css/styles';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TouchableOpacity } from 'react-native';


export default function Reason() {
    const data = Array.from({ length: 15 }).map((_, index) => ({ id: index.toString(), title: `Item ${index + 1}` }));
    const handlePress = (title: String) => { console.log(title); }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.gridItem} onPress={() => handlePress(item.title)}>
                    <Text style={styles.gridItemText}>{item.title}</Text>
                </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            numColumns={3}
            contentContainerStyle={styles.gridContainer}
        />
    </SafeAreaView>
  );
}

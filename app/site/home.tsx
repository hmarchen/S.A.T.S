import React, { useState } from 'react';
import { Platform, View, Text, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../css/styles';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
            <Text>Test page</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
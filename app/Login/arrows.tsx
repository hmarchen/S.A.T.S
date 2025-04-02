import React from "react";
import { View, Text, Pressable } from "react-native"; //
import { Ionicons } from '@expo/vector-icons';
import styles from "../css/styles";

const Arrows = ({ handleSubmit, router }) => (
  <View style={styles.arrowContainer}>
    <Pressable onPress={() => router.back()} style={styles.arrowButton}>
      <Ionicons name="arrow-back" size={75} color="black" />
      <Text style={styles.ArrowText}>BACK</Text>
    </Pressable>
    <Pressable onPress={handleSubmit} style={styles.arrowButton}>
      <Ionicons name="arrow-forward" size={75} color="black" />
      <Text style={styles.ArrowText}>NEXT</Text>
    </Pressable>
  </View>
);

export default Arrows;

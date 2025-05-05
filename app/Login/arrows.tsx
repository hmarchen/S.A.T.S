import React from "react";
import { View, Text, Pressable } from "react-native"; //
import { Ionicons } from '@expo/vector-icons';
import styles from "../css/styles";
import { Router } from "expo-router";

interface ArrowProps {
  handleSubmit: () => {};
  router: Router;
  isValid: boolean;
}

const Arrows = ({ handleSubmit, router, isValid } : ArrowProps) => (
  <View style={styles.arrowContainer} pointerEvents="box-none">
    <Pressable onPress={() => router.back()} style={styles.arrowButton}>
      <Ionicons name="arrow-back" size={32} color="white" />
    </Pressable>

    <Pressable
      style={[styles.arrowButton, !isValid && styles.disabledArrow]}
      onPress={handleSubmit}
      disabled={!isValid}
    >
      <Ionicons name="arrow-forward" size={32} color="white" />
    </Pressable>
  </View>
);

export default Arrows;

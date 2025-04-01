import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import styles from "../css/styles";

const Breadcrumb = ({ entities, flowDepth }) => (
  <SafeAreaView>
    <View style={styles.breadcrumbContainer}>
      {entities.map((item, index) => (
        <View key={index} style={styles.breadcrumbItem}>
          <Text style={styles.breadcrumbText}>{item}</Text>
          {index < entities.length - 1 && <Text style={styles.breadcrumbSeparator}>{'>'}</Text>}
        </View>
      ))}
    </View>
  </SafeAreaView>
);

export default Breadcrumb;
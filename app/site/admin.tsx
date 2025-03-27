import React from 'react';
import { View, Text, Button, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './styles/style';

export default function Admin() {
  
  // For web-specific styling or adjustments
  const isWeb = Platform.OS === 'web';
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('./images/cat_hapy.png')} // Add your logo image here
        style={styles.logo}
      />
      <Text style={styles.title}>Admin Page</Text>
      <Text style={styles.subtitle}>Test admin page</Text>

      {/* Routes */}
            <Button
              title="Go to Home"
              onPress={() => {router.navigate('./home')}} // Change to your screen name
            />

      <Text style={styles.footerText}>
        {isWeb ? 'This is the web version.' : 'This is the mobile version.'}
      </Text>
    </View>
  );
};


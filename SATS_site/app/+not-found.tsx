import { Stack } from 'expo-router';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import styles from './css/styles';

export default function NotFoundScreen() {
  const router = useRouter(); // Initialize the router

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Oops! This Screen Doesn't Exist
        </ThemedText>
        <ThemedText type="body" style={styles.message}>
          We couldn't find the page you were looking for.
        </ThemedText>

        <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/')}>
          <Text style={styles.buttonText}>Return to Menu</Text>
        </TouchableOpacity>
      </ThemedView>
    </>
  );
}

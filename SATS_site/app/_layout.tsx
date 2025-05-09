import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Platform } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { InactivityProvider } from './context/InactivityContext';

import { Buffer } from 'buffer';  // Import Buffer from buffer package
global.Buffer = Buffer;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const isWeb = Platform.OS === 'web';
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({ SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'), });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }

    // redirect user to homepage if on web
    if (typeof window !== 'undefined' && isWeb && window.location.pathname == '/') {
      router.push('/site/home');
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <InactivityProvider timeoutMinutes={2} warningSeconds={10}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="Login" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </InactivityProvider>
  );
}

// app/_layout.tsx (main tab layout)
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import React from 'react';

export default function SiteLayout() {
  const isWeb = Platform.OS === 'web';

  // ignore if not web
  if (!isWeb) { return null; }

  return (
      <Stack screenOptions={{headerShown: false}} />
  );
}

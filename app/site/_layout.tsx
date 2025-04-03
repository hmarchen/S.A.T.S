// app/_layout.tsx (main tab layout)
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import React from 'react';
import { UserProvider } from './contexts/userContext';
import { NotificationProvider } from './contexts/notificationContext';

export default function SiteLayout() {
  const isWeb = Platform.OS === 'web';

  // ignore if not web
  if (!isWeb) { return null; }

  return (
      <UserProvider>
        <NotificationProvider>
          <Stack screenOptions={{headerShown: false}} />
        </NotificationProvider>
      </UserProvider>
  );
}

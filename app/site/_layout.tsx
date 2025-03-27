// app/_layout.tsx (main tab layout)
import { Stack } from 'expo-router';
import React from 'react';

export default function SiteLayout() {
  return (
      <Stack screenOptions={{headerShown: false}} />
  );
}

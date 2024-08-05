import { Redirect, Stack, Tabs } from 'expo-router';
import React, { useEffect } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import useFirstTimeOpen from '@/hooks/useFirstTimeOpen';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Calling out cutom hook which will return if the user is here for the first time
  const { isLoading, isFirstTimeOpen } = useFirstTimeOpen();


  // Check if data about user is being loaded
  if (isLoading) return <></>;

  // Check if the user is here for the first time
  if (isFirstTimeOpen) return <Redirect href={"/onBoarding"} />

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Camera',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="media-library"
        options={{
          title: 'Photos',
          headerTitle: "Media Library",
          headerShown: true
        }}
      />
    </Stack>
  );
}

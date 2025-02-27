import React, { useState } from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity, View } from 'react-native';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Alert } from '@/components/Alert';

export default function TabLayout() {
  const { isDark, toggleColorScheme } = useColorScheme();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: true,
          tabBarStyle: { display: 'none' },
          headerStyle: {
            backgroundColor: isDark ? '#1a1b1e' : '#e9ecef',
          },
          headerTintColor: isDark ? '#fff' : '#000',
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Harold Stream',
            headerLeft: () => (
              <TouchableOpacity onPress={() => global.toggleDrawer?.()}>
                <Ionicons name="menu" style={{ marginLeft: 16 }} size={24} color={isDark ? '#fff' : '#000'} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => setModalOpen(true)} style={{ marginRight: 16 }}>
                  <Ionicons name="alert-circle" size={24} color={isDark ? '#fff' : '#000'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleColorScheme} style={{ marginRight: 16 }}>
                  {isDark ? (
                    <Ionicons name="sunny-outline" size={30} color="#fff" />
                  ) : (
                    <Ionicons name="moon" size={24} color="#000" />
                  )}
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="details/[id]"
          options={{
            title: 'Details',
            headerShown: true,
            headerStyle: {
              backgroundColor: isDark ? '#1a1b1e' : '#e9ecef',
            },
            headerTintColor: isDark ? '#fff' : '#000',
          }}
        />
      </Tabs>

      {/* Componente Alert */}
      <Alert isOpen={isModalOpen} setOpen={setModalOpen} />
    </View>
  );
}





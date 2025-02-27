import React from 'react';
import { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';
import { pushDataSetByText } from '@/types/media';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  isDark: boolean;
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SearchBar({ value, onChangeText, isDark , setRefreshing }: SearchBarProps) {
  const [press,setPress] = useState(false);
  useEffect(() => {
    setRefreshing(true);
    pushDataSetByText(value);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, [press]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#2c2e33' : '#f1f3f5',
        },
      ]}>
      <Search size={20} color={isDark ? '#adb5bd' : '#666'} style={styles.icon} />
      <TextInput
        style={[styles.input, { color: isDark ? '#fff' : '#000' }]}
        placeholder="Search titles..."
        placeholderTextColor={isDark ? '#adb5bd' : '#666'}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={() => setPress(!press)}
        returnKeyType='search'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
});
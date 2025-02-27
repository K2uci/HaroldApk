import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { useRef } from 'react';
import { useColorScheme } from '../hooks/useColorScheme';

interface CategoryBubblesProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryBubbles({ categories, selectedCategory, onSelectCategory }: CategoryBubblesProps) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { isDark } = useColorScheme();
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: true }
  );
  
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      onScroll={() => handleScroll}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={category}
          onPress={() => onSelectCategory(category)}
          style={[
            styles.bubble,
            { backgroundColor: isDark ? '#2c2e33' : '#dee2e6' },
            selectedCategory === category && {
              backgroundColor: isDark ? '#228be6' : '#339af0',
            },
          ]}>
          <Text
            style={[
              styles.bubbleText,
              { color: isDark ? '#fff' : '#000' },
              selectedCategory === category && { color: '#fff' },
            ]}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 70,
    maxHeight:70,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  bubble: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bubbleText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
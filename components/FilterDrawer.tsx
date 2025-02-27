import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { X } from 'lucide-react-native';

interface FilterDrawerProps {
  visible: boolean;
  onClose: () => void;
  onFilterSelect: (filter: string) => void;
  isDark: boolean;
}

export function FilterDrawer({ visible, onClose, onFilterSelect, isDark }: FilterDrawerProps) {
  const filters = [
    'All',
    'Movies',
    'Series',
    'Documentaries',
    'TV Shows',
    'Anime',
    'Latest Releases',
    'Top Rated',
    'Most Popular',
    'Action',
    'Comedy',
    'Drama',
    'Horror',
    'Sci-Fi',
    'Romance',
    'Animation',
    'Adventure',
    'Mystery',
    'Thriller',
  ];

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View
        style={[
          styles.drawer,
          {
            backgroundColor: isDark ? '#1a1b1e' : '#fff',
          },
        ]}>
        <View style={[styles.header, { borderBottomColor: isDark ? '#2c2e33' : '#eee' }]}>
          <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>Filters</Text>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color={isDark ? '#fff' : '#000'} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.content}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterItem, { borderBottomColor: isDark ? '#2c2e33' : '#eee' }]}
              onPress={() => onFilterSelect(filter)}>
              <Text style={[styles.filterText, { color: isDark ? '#fff' : '#000' }]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '80%',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  filterItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  filterText: {
    fontSize: 16,
  },
});
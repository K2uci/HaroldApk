import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { MediaCard } from '../../components/MediaCard';
import { SearchBar } from '../../components/SearchBar';
import { FilterDrawer } from '../../components/FilterDrawer';
import { CategoryBubbles } from '../../components/CategoryBubbles';
import { dataSet, pushDataSet } from '../../types/media';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Alert } from '@/components/Alert';

declare global {
  var toggleDrawer: (() => void) | undefined;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { isDark } = useColorScheme();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    pushDataSet();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  global.toggleDrawer = () => setIsDrawerVisible(true);

  const categories = [
    'All',
    'Movies',
    'Series',
    'Documentaries',
  ];

  // const filteredData = dataSet.filter((item) => {
  //   const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
  //   const matchesCategory =
  //     selectedCategory === 'All' || item.type.toLowerCase() === selectedCategory.toLowerCase();
  //   return matchesSearch && matchesCategory;
  // });

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#141517' : '#e9ecef' }]}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        isDark={isDark}
        setRefreshing={setRefreshing}
      />      
      
      <CategoryBubbles
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <FlatList
        data={dataSet}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => <MediaCard item={item} />}
        keyExtractor={(item) => item.idimdb}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
      <FilterDrawer
        visible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        onFilterSelect={(filter) => {
          setSelectedCategory(filter);
          setIsDrawerVisible(false);
        }}
        isDark={isDark}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 4,
  },
});
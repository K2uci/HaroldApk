import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import type { MediaPreload } from '../types/media';
import { useColorScheme } from '../hooks/useColorScheme';

interface MediaCardProps {
  item: MediaPreload;
}

const COLUMN_COUNT = 2;
const SPACING = 8;
const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - (SPACING * (COLUMN_COUNT + 1))) / COLUMN_COUNT;

export function MediaCard({ item }: MediaCardProps) {
  const router = useRouter();
  const { isDark } = useColorScheme();

  return (
    <Pressable
      style={[
        styles.card,
        {
          width: cardWidth,
          backgroundColor: isDark ? '#2c2e33' : '#f1f3f5',
        },
      ]}
      onPress={() => {router.push(`/details/${item.idimdb}`)}}>
      <Image source={{ uri: item.coverImage }} style={styles.cover} />
      <View style={styles.info}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={[styles.description, { color: isDark ? '#ced4da' : '#495057' }]} numberOfLines={2}>
          {item.actors}
        </Text>
        <View style={styles.details}>
          <Text style={styles.rating}>★ {item.rank}</Text>
          <Text style={[styles.size, { color: isDark ? '#adb5bd' : '#666' }]}>
            {item.anno}
          </Text>
        </View>
        <View style={styles.footer}>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    margin: SPACING / 2,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cover: {
    width: '100%',
    height: cardWidth * 1.5,
    resizeMode: 'cover',
  },
  info: {
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  type: {
    fontSize: 12,
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 4,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    color: '#FFB800',
  },
  size: {
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
  },
  year: {
    fontSize: 12,
  },
});
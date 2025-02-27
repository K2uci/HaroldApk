import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { findDataByOne } from '../../../types/media';
import { useColorScheme } from '@/hooks/useColorScheme';
// import { VideoModal } from '@/components/TrailerModal';
import type { DetailsItem } from '../../../types/media';

export default function Details() {
  const { id } = useLocalSearchParams();
  const idimdb: string = Array.isArray(id) ? id[0] : id;
  const [item, setItem] = useState<DetailsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const { isDark } = useColorScheme();
  // const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const fetchedItem = await findDataByOne(idimdb);
      setItem(fetchedItem);
      setLoading(false);
    };
    fetchData();
  }, [idimdb]);

  if (loading) {
    return (
      <View style={[styles.containerload,{ backgroundColor: isDark ? '#2c2e33' : '#fff' }]}>
        <ActivityIndicator size="large" color={isDark ? "#fff" : "#0000ff"} />
      </View>
    );
  }

  if (!item) {
    return (
      <View style={[styles.container,{ backgroundColor: isDark ? '#2c2e33' : '#fff' }]}>
        <Text>Item not found</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.photo }} style={styles.cover} />
      <View style={[styles.content, { backgroundColor: isDark ? '#2c2e33' : '#fff' }]}>
        <View style={styles.infoRow}>
          <View>
            <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>{item.title}</Text>
            <Text style={[styles.type, { color: isDark ? '#ced4da' : '#495057' }]}>{item.type}</Text>
          </View>
          {/* {item.url ?
            <View>
              <VideoModal url={item.url} modalVisible={modalVisible} setModalVisible={setModalVisible} />
              <Pressable style={styles.butt} onPress={() => {setModalVisible(true),console.log(item.url)}}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#fff' }}>Trailer</Text>
              </Pressable>
            </View>
            : null} */}

        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Rating:</Text>
          <Text style={[styles.value, { color: isDark ? '#ced4da' : '#495057' }]}>★ {item.rating}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Release Year:</Text>
          <Text style={[styles.value, { color: isDark ? '#ced4da' : '#495057' }]}>{item.created}</Text>
        </View>

        {item.duration ?
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Duration:</Text>
            {item.type === 'TVSeries' ?
              <Text style={[styles.value, { color: isDark ? '#ced4da' : '#495057' }]}>{item.duration} Chapter</Text>
              : <Text style={[styles.value, { color: isDark ? '#ced4da' : '#495057' }]}>{item.duration}</Text>}
          </View> : null
        }

        <View style={styles.infoRow}>
          <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Language</Text>
          <Text style={[styles.value, { color: isDark ? '#ced4da' : '#495057' }]}>{item.language}</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>Description</Text>
          <Text style={[styles.description, { color: isDark ? '#ced4da' : '#495057' }]}>{item.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>Genres</Text>
          <Text style={[styles.value, { color: isDark ? '#ced4da' : '#495057' }]}>{item.genre.join(', ')}</Text>
        </View>

        {item.episodes ?
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Episodes:</Text>
            <Text style={[styles.value, { color: isDark ? '#ced4da' : '#495057' }]}>{item.episodes}</Text>
          </View> : null
        }

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#000' }]}>Principal actors</Text>
          <Text style={[styles.value, { color: isDark ? '#ced4da' : '#495057' }]}>{item.actors.join(' - ')}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  butt: {
    height: 35,
    width: 90,
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  containerload: {
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
  },
  cover: {
    width: '100%',
    height: 500,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  type: {
    fontSize: 16,
    color: '#666',
    textTransform: 'capitalize',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
});
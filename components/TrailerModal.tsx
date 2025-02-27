import React, { useRef } from 'react';
import { View, Button, Modal, StyleSheet, Text } from 'react-native';
import Video from 'react-native-video';

interface DataUrl {
  url: string,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  modalVisible: boolean
}

export function VideoModal({ url, modalVisible, setModalVisible }: DataUrl) {

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Video
            source={{ uri: url }}
            style={styles.video}
            controls={true}
            resizeMode="contain"
            onError={(e) => console.log(e)}
          />
          <Button title="Cerrar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  video: {
    width: '100%',
    height: 300,
  },
});


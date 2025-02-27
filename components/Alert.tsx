import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View, Modal, Button } from 'react-native';

interface ModalInfo {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Alert({ isOpen, setOpen }: ModalInfo) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => setOpen(false)}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalText1}>! Alert !</Text>
        <Ionicons name='alert-circle-outline' size={180} color='#fff'/>
        <Text style={styles.modalText}>¡This is the Beta version of the application, more changes coming soon!</Text>
        <Text style={styles.modalTextContac}>Gmail contact: Astroreal031@gmail.com</Text>
        <Button title="Cerrar" onPress={() => setOpen(false)} />
      </View>
    </Modal>

  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
  },
  modalText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
  },
  modalTextContac: {
    marginVertical:10,
    color:'#fff'
  },
  modalText1: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
    fontSize: 30,
    marginBottom: 20,
  },
});
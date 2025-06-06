import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';

const AyudaScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');

  const handlePress = (text) => {
    setModalText(text);
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>¿Tienes dudas sobre Luma?</Text>
          <Text style={styles.sectionText}>
            Luma es una app pensada para ayudar a niños dentro del espectro autista a relajarse y conectarse con calma.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preguntas frecuentes</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress('¿Qué se puede hacer en Luma?')}>
            <Text style={styles.buttonText}>¿Qué se puede hacer en Luma?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress('¿Cómo se usa Luma?')}>
            <Text style={styles.buttonText}>¿Cómo se usa Luma?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress('¡Importante! Consejos de uso')}>
            <Text style={styles.buttonText}>¡Importante! Consejos de uso</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{modalText}</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowModal(false)}>
              <Text style={styles.modalCloseButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalCloseButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  modalCloseButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AyudaScreen;

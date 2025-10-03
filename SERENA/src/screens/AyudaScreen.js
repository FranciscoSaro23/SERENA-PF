import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import NavBar from '../shared/Navbar';

export default function AyudaScreen() {
  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>
            ¿Tienes dudas sobre Serena?
        </Text>
        <Text style={styles.subtitulo}> Una app pensada para ayudar a niños dentro del espectro autista a relajarse y conectarse con calma. </Text>
      </ScrollView>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#B9D9EB', // celeste
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A0D41',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 16,
    color: '#0A0D41',
    textAlign: 'center',
    lineHeight: 24,
  },
});

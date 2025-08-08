import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import NavBar from '../shared/Navbar';

export default function InicioScreen() {
  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>
          Bienvenido <Text style={styles.usuario}>usuario</Text>,{'\n'} vincúlate con tu Luma  </Text>
        <TouchableOpacity style={styles.boton}>
          <Text style={styles.botonTexto}>EMPEZAR</Text>
        </TouchableOpacity>
        <Text style={styles.subtitulo}>Iluminá tu calma, estés donde estés</Text>
        <View style={styles.mockup} />
        <Text style={styles.subtitulo}>¿Qué es Luma?</Text>
        <Text style={styles.parrafo}>
          Luma es un dispositivo sensorial portátil diseñado para acompañar a
          personas neurodivergentes en situaciones de estrés, ansiedad o
          sobreestimulación. A través de una experiencia controlada desde esta
          aplicación móvil, Luma promueve la relajación y el bienestar emocional
          de manera accesible, segura y empática. Su diseño inclusivo y funcional
          permite utilizarlo en cualquier entorno, ofreciendo contención y calma
          allí donde más se necesita.
        </Text>
      </ScrollView>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFFEF5',
  },
  container: {
    padding: 10,
    alignItems: 'center',
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#13145C',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  usuario: {
    color: '#8E1C2D',
  },
  boton: {
    backgroundColor: '#13145C',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 3,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '500',
    color: '#13145C',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 7,
  },
  parrafo: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
    lineHeight: 22,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  mockup: {
    width: 280,
    height: 160,
    backgroundColor: '#ccc',
    borderRadius: 20,
    marginVertical: 20,
  },
});

import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import NavBar from '../shared/Navbar';
import { useRoute } from '@react-navigation/native';

export default function InicioScreen({ navigation }) {
  const route = useRoute();
  const { emailUsername } = route.params || {};

  const handleEmpezar = () => {
    navigation.navigate('PredeterminadosScreen');
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>
          Bienvenido <Text style={styles.usuario}>{emailUsername || 'usuario'}</Text>,{'\n'} vincúlate con Serena
        </Text>

        <TouchableOpacity style={styles.boton} onPress={emailUsername ? handleEmpezar : undefined}>
          <Text style={styles.botonTexto}>{emailUsername ? 'EMPEZAR ACTIVIDAD' : 'EMPEZAR'}</Text>
        </TouchableOpacity>

        <Text style={styles.subtitulo} >
          {emailUsername ? 'Tu dispositivo está listo para usarse.' : 'Iluminá tu calma, estés donde estés'}
        </Text>

        {/* === Logo en lugar de texto === */}
        <Image source={require('../../assets/icon.png')} style={styles.logo} />

        {/* === Sección de beneficios con cards === */}
        <View style={styles.card}>
          <Image source={require('../../assets/meditacion.png')} style={styles.icon} />
          <Text style={styles.cardText}>
            Ejercicios diarios para mejorar tu bienestar emocional
          </Text>
        </View>

        <View style={styles.card}>
          <Image source={require('../../assets/profesional.png')} style={styles.icon} />
          <Text style={styles.cardText}>
            3 modos predeterminados creados con ayuda de profesionales
          </Text>
        </View>

        <View style={styles.card}>
          <Image source={require('../../assets/lapiz.png')} style={styles.icon} />
          <Text style={styles.cardText}>
            Personaliza los modos o crea uno nuevo para tu mejor experiencia
          </Text>
        </View>
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
    padding: 15,
    alignItems: 'center',
    paddingBottom: 50,
  },
  titulo: {
    fontSize: 28,
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
    paddingVertical: 14,
    paddingHorizontal: 45,
    borderRadius: 25,
    marginBottom: 25,
    elevation: 4,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '500',
    color: '#13145C',
    textAlign: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  // ==== Cards ====
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 15,
    padding: 15,
    marginTop: 12,
    width: '95%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    width: 70,
    height: 70,
    marginRight: 15,
    resizeMode: 'contain',
  },
  cardText: {
    flex: 1,
    color: '#161A68',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

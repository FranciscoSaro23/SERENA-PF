import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Navbar from '../shared/Navbar';
import { useRoute } from '@react-navigation/native';
import CardInteractiva from '../components/CardInteractiva';

export default function Inicio({ navigation }) {
  const route = useRoute();
  const { emailUsername } = route.params || {};

  const handleEmpezar = () => {
    navigation.navigate('Modo');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
        <Text style={styles.titulo}>
          Bienvenido <Text style={styles.usuario}>{emailUsername || 'usuario'}</Text>,{'\n'} vincúlate con Serena
        </Text>

        <TouchableOpacity style={styles.boton} onPress={emailUsername ? handleEmpezar : handleLogin}>
          <Text style={styles.botonTexto}>{emailUsername ? 'VER TUTORIAL' : 'EMPEZAR'}</Text>
        </TouchableOpacity>

        <Text style={styles.subtitulo}>
          {emailUsername ? 'Tu dispositivo está listo para usarse.' : 'Iluminá tu calma, estés donde estés'}
        </Text>

        {/* === Cards interactivas === */}
        <CardInteractiva
          frontImage={require('../../assets/meditacion.png')}
          frontText="Ejercicios diarios para mejorar tu bienestar emocional"
          backText="Meditaciones guiadas y respiraciones que te ayudan a reducir el estrés y reconectar con vos misma."
        />

        <CardInteractiva
          frontImage={require('../../assets/profesional.png')}
          frontText="3 modos predeterminados creados con ayuda de profesionales"
          backText="Relajación, Energía y Sueño: modos diseñados con psicólogos para acompañar cada momento del día."
        />

        <CardInteractiva
          frontImage={require('../../assets/lapiz.png')}
          frontText="Personaliza los modos o crea uno nuevo para tu mejor experiencia"
          backText="Ajustá luces, sonidos y tiempos según tu estado de ánimo y tus necesidades personales."
        />
      </ScrollView>
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFFFF6',
  },
  container: {
    padding: 15,
    alignItems: 'center',
    paddingBottom: 50,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#161A68',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  usuario: {
    color: '#8E1C2D',
  },
  boton: {
    backgroundColor: '#161A68',
    paddingVertical: 14,
    paddingHorizontal: 45,
    borderRadius: 25,
    marginBottom: 25,
    elevation: 4,
  },
  botonTexto: {
    color: '#FFFFF6',
    fontSize: 17,
    fontWeight: '600',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '500',
    color: '#161A68',
    textAlign: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 5,
    marginTop: 65,
    resizeMode: 'contain',
  },
});

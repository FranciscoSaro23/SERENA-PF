import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../shared/Navbar';

export default function AyudaScreen() {
  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.titulo}>Centro de Ayuda</Text>
        <Text style={styles.subtitulo}>
          Encuentra respuestas a las preguntas más comunes sobre Serena y cómo usar la app.
        </Text>

        <View style={styles.card}>
          <Ionicons name="help-circle-outline" size={28} color="#0A0D41" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.pregunta}>¿Qué es Serena?</Text>
            <Text style={styles.respuesta}>
              Serena es una aplicación diseñada para ayudar a niños dentro del espectro autista
              a relajarse, concentrarse y conectarse con un entorno de calma a través de ejercicios
              visuales, auditivos y de respiración.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons name="moon-outline" size={28} color="#0A0D41" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.pregunta}>¿Cómo funciona?</Text>
            <Text style={styles.respuesta}>
              Serena ofrece distintas actividades interactivas guiadas, sonidos relajantes y
              herramientas para fomentar la calma y la concentración en momentos de ansiedad o estrés.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons name="person-circle-outline" size={28} color="#0A0D41" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.pregunta}>¿Quién puede usar Serena?</Text>
            <Text style={styles.respuesta}>
              La aplicación está pensada para niños dentro del espectro autista, pero también puede
              ser utilizada por cualquier persona que busque un espacio de relajación y bienestar.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Ionicons name="chatbubbles-outline" size={28} color="#0A0D41" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.pregunta}>¿Cómo puedo obtener soporte?</Text>
            <Text style={styles.respuesta}>
              Si tienes dudas o sugerencias, puedes contactarnos a través del correo:
              {' '}
              <Text style={{ fontWeight: 'bold' }}>soporte@serenaapp.com</Text>
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>
  Gracias por confiar en Serena 💙
</Text>
      </ScrollView>

      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#B9D9EB',
  },
  container: {
    flexGrow: 1,
    padding: 25,
    paddingBottom: 100,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0A0D41',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 40,
  },
  subtitulo: {
    fontSize: 16,
    color: '#0A0D41',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    marginRight: 12,
    marginTop: 4,
  },
  textContainer: {
    flex: 1,
  },
  pregunta: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0A0D41',
    marginBottom: 5,
  },
  respuesta: {
    fontSize: 15,
    color: '#0A0D41',
    lineHeight: 22,
  },
  footer: {
    textAlign: 'center',
    color: '#0A0D41',
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 16,
  },
});

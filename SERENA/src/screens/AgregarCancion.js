
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, ActivityIndicator, Image, ScrollView, Pressable } from 'react-native';
import { supabase } from '../services/supabaseClient';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../styles/ModoStyles';

export default function AgregarCancion() {
  const navigation = useNavigation();
  const [nombreCancion, setNombreCancion] = useState('');
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [imagenSpotify, setImagenSpotify] = useState(null);

  const esLinkSpotifyValido = (url) => {
    return url.includes('open.spotify.com/track/');
  };

  const obtenerPortadaSpotify = async (url) => {
    try {
      const response = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      if (data.thumbnail_url) {
        setImagenSpotify(data.thumbnail_url);
      } else {
        setImagenSpotify(null);
      }
    } catch (error) {
      console.error('Error al obtener portada de Spotify:', error);
      setImagenSpotify(null);
    }
  };

  useEffect(() => {
    if (esLinkSpotifyValido(link)) {
      obtenerPortadaSpotify(link);
    } else {
      setImagenSpotify(null);
    }
  }, [link]);

  const camposValidos = () => {
    return nombreCancion.trim() !== '' && link.trim() !== '' && esLinkSpotifyValido(link);
  };

  const guardarCancion = async () => {
    if (!camposValidos()) {
      Alert.alert('Error', 'Por favor completá el nombre de la canción y usá un link válido de Spotify.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.from('MUSICA').insert([
      {
        nombreCancion,
        link,
      },
    ]);

    if (error) {
      console.error('Error al guardar la canción:', error.message);
      Alert.alert('Error', 'No se pudo guardar la canción. Intenta de nuevo.');
    } else {
      setMensaje('Canción guardada correctamente.');
      setNombreCancion('');
      setLink('');
      setImagenSpotify(null);
      navigation.goBack();
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={[styles.screenContainer, styles.center]}>
        <ActivityIndicator size="large" color="#4f1399ff" />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={[commonStyles.nuevaCancionBtn, { marginTop: 40, marginBottom: 20 }]}
        >
          <Text style={commonStyles.nuevaCancionText}>←</Text>
        </Pressable>
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
        <Text style={styles.title}>Agregar canción</Text>
        
        <Text style={styles.label}>Nombre de la Canción</Text>
        <TextInput
          value={nombreCancion}
          onChangeText={setNombreCancion}
          placeholder="Ej: Meditación"
          style={styles.input}
          placeholderTextColor="#B9D9EB"
        />
        
        <Text style={styles.label}>Pega Aquí tu Link de Spotify</Text>
        <TextInput
          value={link}
          onChangeText={setLink}
          placeholder="Ej: https://open.spotify.com/track/..."
          style={styles.input}
          placeholderTextColor="#B9D9EB"
        />
        
        {imagenSpotify && (
          <View style={styles.coverContainer}>
            <Image source={{ uri: imagenSpotify }} style={styles.cover} />
          </View>
        )}
        
        <Pressable
          style={({ pressed }) => [
            commonStyles.botonGuardar,
            pressed && { opacity: 0.8 }
          ]}
          onPress={guardarCancion}
        >
          <Text style={commonStyles.textoBotonGuardar}>Guardar Canción</Text>
        </Pressable>
        
        {!!mensaje && <Text style={styles.message}>{mensaje}</Text>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#FFFFF3',
    justifyContent: 'space-between',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Título principal
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#161A68',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 50,
  },

  // Labels
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#161A68',
    marginBottom: 6,
  },

  // Inputs
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#B9D9EB',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 18,
    fontSize: 16,
    color: '#0A0D41',
  },

  // Texto de carga
  loadingText: {
    fontSize: 16,
    color: '#161A68',
    marginTop: 12,
  },

  // Mensajes
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#2E8B57', // verde éxito
    marginTop: 12,
    marginBottom: 24,
    fontWeight: '500',
  },

  // Portada de Spotify
  coverContainer: {
    alignItems: 'center',
    marginBottom: 18,
  },
  cover: {
    width: 200,
    height: 200,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#B9D9EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },

  // Logo
  logo: {
    width: 100,
    height: 100,
    marginTop: 65,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
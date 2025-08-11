import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, ActivityIndicator, Image, ScrollView, Pressable } from 'react-native';
import { supabase } from '../services/supabaseClient';
import { useNavigation } from '@react-navigation/native';

export default function AgregarCancionScreen() {
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
        <Text style={styles.title}>Agregar Nueva Canción</Text>
        
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
            styles.botonGuardar,
            pressed && { opacity: 0.8 }
          ]}
          onPress={guardarCancion}
        >
          <Text style={styles.textoBoton}>Guardar Canción</Text>
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0A0D41',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0A0D41',
    marginBottom: 6,
  },
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
  loadingText: {
    fontSize: 16,
    color: '#0A0D41',
    marginTop: 12,
  },
  message: {
    fontSize: 15,
    textAlign: 'center',
    color: '#C73F4A',
    marginTop: 12,
    marginBottom: 24,
  },
  coverContainer: {
    alignItems: 'center',
    marginBottom: 18,
  },
  cover: {
    width: 200,
    height: 200,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#C4C6E7',
  },
  botonGuardar: {
    backgroundColor: '#4f1399ff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginBottom: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#FFFFF3',
    fontSize: 18,
    fontWeight: '600',
  },
});

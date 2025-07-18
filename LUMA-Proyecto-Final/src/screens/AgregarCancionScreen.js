import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, ActivityIndicator, Image, ScrollView } from 'react-native';
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
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#1e5631" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Agregar Nueva Canción</Text>
        <Text style={styles.label}>Nombre de la Canción</Text>
        <TextInput
          value={nombreCancion}
          onChangeText={setNombreCancion}
          placeholder="Ej: Meditación"
          style={styles.input}
        />
        <Text style={styles.label}>Pega Aquí tu Link de Spotify</Text>
        <TextInput
          value={link}
          onChangeText={setLink}
          placeholder="Ej: https://open.spotify.com/track/..."
          style={styles.input}
        />
        {imagenSpotify && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: imagenSpotify }} style={styles.image} />
          </View>
        )}
        <Button title="Guardar Canción" onPress={guardarCancion} color="#1e5631" />
        {!!mensaje && <Text style={styles.message}>{mensaje}</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e5631',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    color: 'green',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 12,
  },
});

import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview'; // <-- Importa WebView
import { supabase } from '../services/supabaseClient';
import { useNavigation } from '@react-navigation/native';

export default function AgregarCancionScreen() {
  const navigation = useNavigation();

  const [nombreCancion, setNombreCancion] = useState('');
  const [genero, setGenero] = useState('');
  const [link, setLink] = useState('');
  const [duracion, setDuracion] = useState('');
  const [nombreCantante, setNombreCantante] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');

  // Extraer el ID del video de YouTube para embebido
  const extraerVideoId = (url) => {
    // Soporta youtube.com/watch?v=XXXX y youtu.be/XXXX
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = extraerVideoId(link);

  const camposValidos = () => {
    return (
      nombreCancion.trim() !== '' &&
      genero.trim() !== '' &&
      link.trim() !== '' &&
      duracion.trim() !== '' &&
      nombreCantante.trim() !== '' &&
      videoId !== null
    );
  };

  const guardarCancion = async () => {
    if (!camposValidos()) {
      Alert.alert('Error', 'Por favor completá todos los campos y el link debe ser válido de YouTube.');
      return;
    }

    setLoading(true);

    const duracionNum = parseFloat(duracion);
    if (isNaN(duracionNum) || duracionNum <= 0) {
      Alert.alert('Error', 'Duración debe ser un número positivo.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.from('MUSICA').insert([
      {
        nombreCancion,
        genero,
        link,
        duracion: duracionNum,
        nombreCantante,
      },
    ]);

    if (error) {
      console.error('Error al guardar la canción:', error.message);
      Alert.alert('Error', 'No se pudo guardar la canción. Intenta de nuevo.');
    } else {
      setMensaje('Canción guardada correctamente.');
      setNombreCancion('');
      setGenero('');
      setLink('');
      setDuracion('');
      setNombreCantante('');
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
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Nueva Canción</Text>

      <Text style={styles.label}>Nombre de la Canción</Text>
      <TextInput
        value={nombreCancion}
        onChangeText={setNombreCancion}
        placeholder="Ej: Imagine"
        style={styles.input}
      />

      <Text style={styles.label}>Género</Text>
      <TextInput
        value={genero}
        onChangeText={setGenero}
        placeholder="Ej: Rock"
        style={styles.input}
      />

      <Text style={styles.label}>Link de Video</Text>
      <TextInput
        value={link}
        onChangeText={setLink}
        placeholder="Ej: https://youtu.be/abc123"
        style={styles.input}
      />

      {videoId && (
        <View style={styles.videoContainer}>
          <WebView
            source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        </View>
      )}

      <Text style={styles.label}>Duración (minutos)</Text>
      <TextInput
        value={duracion}
        onChangeText={setDuracion}
        placeholder="Ej: 3.45"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Nombre del Cantante</Text>
      <TextInput
        value={nombreCantante}
        onChangeText={setNombreCantante}
        placeholder="Ej: John Lennon"
        style={styles.input}
      />

      <Button title="Guardar Canción" onPress={guardarCancion} color="#1e5631" />

      {!!mensaje && <Text style={styles.message}>{mensaje}</Text>}
    </View>
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
  videoContainer: {
    height: 200,
    marginBottom: 15,
  },
  webview: {
    flex: 1,
  },
});

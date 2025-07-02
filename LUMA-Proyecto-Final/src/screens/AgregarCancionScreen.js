import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Alert, Linking, TouchableOpacity } from 'react-native';
import { supabase } from '../services/supabaseClient';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function AgregarCancionScreen() {
  const navigation = useNavigation();

  const [nombre, setNombre] = useState('');
  const [duracion, setDuracion] = useState('');
  const [link, setLink] = useState('');
  const [genero, setGenero] = useState('');

  const esLinkValido = (url) => {
    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(url);
  };

  const abrirYoutube = () => {
    if (esLinkValido(link)) {
      Linking.openURL(link);
    } else {
      Alert.alert("El link no es válido de YouTube.");
    }
  };

  const guardarCancion = async () => {
    if (!nombre || !duracion || !link || !genero) {
      Alert.alert("Completá todos los campos.");
      return;
    }

    if (!esLinkValido(link)) {
      Alert.alert("El link debe ser un video de YouTube válido.");
      return;
    }

    const { error } = await supabase.from('MUSICA').insert([{
      nombre,
      duracion,
      link,
      genero,
    }]);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Canción agregada", "", [
        {
          text: "OK",
          onPress: () => navigation.goBack()
        }
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar nueva canción</Text>

      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Duración (ej: 3:25)"
        value={duracion}
        onChangeText={setDuracion}
        style={styles.input}
      />
      <TextInput
        placeholder="Link de YouTube"
        value={link}
        onChangeText={setLink}
        style={styles.input}
      />
      {esLinkValido(link) && (
        <TouchableOpacity onPress={abrirYoutube} style={styles.playButton}>
          <Text style={styles.playText}>▶Ver video</Text>
        </TouchableOpacity>
      )}
      <TextInput
        placeholder="Género"
        value={genero}
        onChangeText={setGenero}
        style={styles.input}
      />

      <Button title="Guardar canción" onPress={guardarCancion} color="#1e5631" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFDF5',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F1C65',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  playButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  playText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

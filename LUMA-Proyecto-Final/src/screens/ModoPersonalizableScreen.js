import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { supabase } from '../services/supabaseClient';

export default function PersonalizarScreen() {
  const [nombre, setNombre] = useState('');
  const [idMusica, setIdMusica] = useState('');
  const [rgb1, setRgb1] = useState('');
  const [rgb2, setRgb2] = useState('');
  const [rgb3, setRgb3] = useState('');
  const [mensaje, setMensaje] = useState('');

  const usuarioIdPrueba = 'd28065e7-5749-4e55-889d-ff6699200ba8';

  const camposValidos = () => {
    if (!nombre.trim()) return false;
    if (!idMusica || isNaN(idMusica)) return false;
    if (!rgb1 || isNaN(rgb1)) return false;
    if (!rgb2 || isNaN(rgb2)) return false;
    if (!rgb3 || isNaN(rgb3)) return false;

    const r = parseInt(rgb1), g = parseInt(rgb2), b = parseInt(rgb3);
    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) return false;

    return true;
  };

  const guardarModo = async () => {
    if (!camposValidos()) {
      setMensaje("❌ Por favor completá todos los campos correctamente.");
      return;
    }

    const nuevoModo = {
      nombre,
      id_musica: parseInt(idMusica),
      rgb1: parseInt(rgb1),
      rgb2: parseInt(rgb2),
      rgb3: parseInt(rgb3),
      id_usuario: usuarioIdPrueba
    };

    const { data, error } = await supabase.from('MODO').insert([nuevoModo]);

    if (error) {
      console.error('Error al guardar:', error.message);
      setMensaje("❌ Error al guardar el modo.");
    } else {
      setMensaje("✅ Modo guardado correctamente.");
      console.log('Modo guardado:', data);
      // Limpiar campos
      setNombre('');
      setIdMusica('');
      setRgb1('');
      setRgb2('');
      setRgb3('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personalizar un Modo</Text>

      <Text style={styles.label}>Nombre del Modo</Text>
      <TextInput value={nombre} onChangeText={setNombre} placeholder="Ej: Modo Relax" style={styles.input} />

      <Text style={styles.label}>ID de Música</Text>
      <TextInput value={idMusica} onChangeText={setIdMusica} placeholder="Ej: 1" keyboardType="numeric" style={styles.input} />

      <Text style={styles.label}>Color RGB</Text>
      <View style={styles.rgbContainer}>
        <TextInput value={rgb1} onChangeText={setRgb1} placeholder="R" keyboardType="numeric" style={styles.rgbInput} />
        <TextInput value={rgb2} onChangeText={setRgb2} placeholder="G" keyboardType="numeric" style={styles.rgbInput} />
        <TextInput value={rgb3} onChangeText={setRgb3} placeholder="B" keyboardType="numeric" style={styles.rgbInput} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Guardar Modo Personalizado" onPress={guardarModo} color="#1e5631" />
      </View>

      <Text style={styles.message}>{mensaje}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    height: '100%',
    justifyContent: 'center',
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
  rgbContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  rgbInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  }
});

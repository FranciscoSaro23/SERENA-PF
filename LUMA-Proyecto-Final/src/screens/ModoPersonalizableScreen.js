import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { supabase } from '../services/supabaseClient';
import ColorPicker from 'react-native-color-picker-wheel';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function PersonalizarScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const { presetModeId } = route.params || {};

  const usuarioIdPrueba = 'd28065e7-5749-4e55-889d-ff6699200ba8';

  const [nombre, setNombre] = useState('');
  const [idMusica, setIdMusica] = useState('');
  const [rgb1, setRgb1] = useState('');
  const [rgb2, setRgb2] = useState('');
  const [rgb3, setRgb3] = useState('');
  const [colorHex, setColorHex] = useState('#ffffff');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  const noEditables = ['1', '2', '3'];
  const esEditable = !noEditables.includes(String(presetModeId));

  useEffect(() => {
    if (presetModeId && presetModeId !== 'custom') {
      cargarModo(presetModeId);
    }
  }, [presetModeId]);

  const rgbToHex = (r, g, b) => {
    const toHex = (c) => {
      const hex = Number(c).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const cargarModo = async (id) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('MODO')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error al cargar modo:', error.message);
      setMensaje('Error al cargar el modo.');
    } else {
      setNombre(data.nombre || '');
      setIdMusica(data.id_musica ? String(data.id_musica) : '');
      setRgb1(data.rgb1 ? String(data.rgb1) : '');
      setRgb2(data.rgb2 ? String(data.rgb2) : '');
      setRgb3(data.rgb3 ? String(data.rgb3) : '');

      const r = data.rgb1 ?? 255;
      const g = data.rgb2 ?? 255;
      const b = data.rgb3 ?? 255;
      setColorHex(rgbToHex(r, g, b));
      setMensaje('');
    }
    setLoading(false);
  };

  const onColorSelected = (hex) => {
    if (!esEditable) return;

    setColorHex(hex);
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    setRgb1(String(r));
    setRgb2(String(g));
    setRgb3(String(b));
  };

  const camposValidos = () => {
    if (!nombre.trim()) return false;
    if (!idMusica || isNaN(idMusica)) return false;
    if (!rgb1 || isNaN(rgb1)) return false;
    if (!rgb2 || isNaN(rgb2)) return false;
    if (!rgb3 || isNaN(rgb3)) return false;

    const r = parseInt(rgb1), g = parseInt(rgb2), b = parseInt(rgb3);
    return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255;
  };

  const guardarModo = async () => {
    if (!camposValidos()) {
      setMensaje("Por favor completá todos los campos correctamente.");
      return;
    }

    if (!esEditable) {
      setMensaje("Este modo no es editable.");
      return;
    }

    const modoData = {
      nombre,
      id_musica: parseInt(idMusica),
      rgb1: parseInt(rgb1),
      rgb2: parseInt(rgb2),
      rgb3: parseInt(rgb3),
      id_usuario: usuarioIdPrueba,
    };

    setLoading(true);

    if (presetModeId && presetModeId !== 'custom') {
      const { error } = await supabase
        .from('MODO')
        .update(modoData)
        .eq('id', presetModeId);

      if (error) {
        console.error('Error al actualizar modo:', error.message);
        setMensaje("Error al actualizar el modo.");
      } else {
        setMensaje("Modo actualizado correctamente.");
        navigation.goBack();
      }
    } else {
      const { error } = await supabase.from('MODO').insert([modoData]);

      if (error) {
        console.error('Error al guardar:', error.message);
        setMensaje("Error al guardar el modo.");
      } else {
        setMensaje("Modo guardado correctamente.");
        setNombre('');
        setIdMusica('');
        setRgb1('');
        setRgb2('');
        setRgb3('');
        setColorHex('#ffffff');
        navigation.goBack();
      }
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
      <TouchableOpacity
        onPress={() => navigation.navigate('AgregarCancionScreen', { returnTo: 'ModoPersonalizableScreen' })}
        style={styles.nuevaCancionBtn}>
        <Text style={styles.nuevaCancionText}>+ Nueva canción</Text>
      </TouchableOpacity>

      <Text style={styles.title}>
        {presetModeId && presetModeId !== 'custom' ? 'Editar Modo' : 'Personalizar un Modo'}
      </Text>

      <Text style={styles.label}>Nombre del Modo</Text>
      <TextInput
        value={nombre}
        onChangeText={setNombre}
        placeholder="Ej: Modo Relax"
        style={styles.input}
        editable={esEditable}
      />

      <Text style={styles.label}>ID de Música</Text>
      <TextInput
        value={idMusica}
        onChangeText={setIdMusica}
        placeholder="Ej: 1"
        keyboardType="numeric"
        style={styles.input}
        editable={esEditable}
      />

      <Text style={styles.label}>Color RGB seleccionado</Text>
      <Text style={styles.colorDisplay}>R: {rgb1} | G: {rgb2} | B: {rgb3}</Text>

      <ColorPicker
        color={colorHex}
        onColorChange={onColorSelected}
        style={{ width: 250, height: 250, alignSelf: 'center', marginVertical: 20 }}
        thumbSize={30}
        sliderSize={30}
      />

      <Button
        title={presetModeId && presetModeId !== 'custom' ? "Actualizar Modo Personalizado" : "Guardar Modo Personalizado"}
        onPress={guardarModo}
        color="#1e5631"
        disabled={!esEditable}
      />

      {!esEditable && (
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>
          Este modo no se puede editar.
        </Text>
      )}
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
  colorDisplay: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
});

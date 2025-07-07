import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { supabase } from '../services/supabaseClient';
import ColorPicker from 'react-native-color-picker-wheel';
import { useRoute, useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import Dropdown from '../components/Dropdown';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

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
  const [canciones, setCanciones] = useState([]);
  const [linkVideo, setLinkVideo] = useState('');

  const noEditables = ['1', '2', '3'];
  const esEditable = !noEditables.includes(String(presetModeId));

  useFocusEffect(
  useCallback(() => {
    const fetch = async () => {
      await obtenerCanciones();
    };
    fetch();
  }, [])
);

  
  useEffect(() => {
    if (presetModeId && presetModeId !== 'custom' && canciones.length > 0) {
    cargarModo(presetModeId);
    }
  }, [presetModeId, canciones]);

  const extraerVideoId = (url) => {
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const obtenerCanciones = async () => {
    const { data, error } = await supabase.from('MUSICA').select('*');
    if (error) {
      console.error('Error al obtener canciones:', error.message);
      return;
    }
    setCanciones(data);
  };

  const rgbToHex = (r, g, b) => {
    const toHex = (c) => {
      const hex = Number(c).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const cargarModo = async (id) => {
    setLoading(true);
    const { data, error } = await supabase.from('MODO').select('*').eq('id', id).single();

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

      const cancion = canciones.find(c => c.id === data.id_musica);
      if (cancion) {
        const videoId = extraerVideoId(cancion.link);
        if (videoId) setLinkVideo(`https://www.youtube.com/embed/${videoId}`);
      }

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
      const { error } = await supabase.from('MODO').update(modoData).eq('id', presetModeId);

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
        await obtenerCanciones();
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
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('AgregarCancionScreen', { returnTo: 'ModoPersonalizableScreen' })}
        style={styles.nuevaCancionBtn}>
        <Text style={styles.nuevaCancionText}>Agregar canción</Text>
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

      <Dropdown
        options={canciones.map(c => ({
        label: c.nombreCancion,
        value: String(c.id)
        }))}
        selectedValue={String(idMusica)} // <- también string
        onValueChange={(value) => {
        setIdMusica(String(value)); // <- seguimos con string
        const selected = canciones.find(c => String(c.id) === String(value));
        if (selected) {
          const videoId = extraerVideoId(selected.link);
          if (videoId) {
          setLinkVideo(`https://www.youtube.com/embed/${videoId}`);
          } else {
            setLinkVideo('');
          }
        }
      }}
      enabled={esEditable} />

      {linkVideo !== '' && (
        <View style={styles.videoContainer}>
          <WebView
            source={{ uri: linkVideo }}
            style={{ height: 200 }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        </View>
      )}

      <Text style={styles.label}>Color RGB seleccionado</Text>
      <Text style={styles.colorDisplay}>R: {rgb1} | G: {rgb2} | B: {rgb3}</Text>

      <ColorPicker
        color={colorHex}
        onColorChange={onColorSelected}
        style={{ width: 250, height: 250, alignSelf: 'center', marginVertical: 20, marginBottom: 40 }}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
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
  nuevaCancionBtn: {
    backgroundColor: '#1e5631',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  nuevaCancionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  videoContainer: {
    height: 200,
    marginBottom: 15,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    width: 200,
    height: 40,
    justifyContent: 'center',
  }
});
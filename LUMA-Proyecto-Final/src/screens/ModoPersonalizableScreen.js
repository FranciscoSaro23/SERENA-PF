import { View, TextInput, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView, Image, Pressable } from 'react-native';
import { supabase } from '../services/supabaseClient';
import ColorPicker from 'react-native-color-picker-wheel';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import Dropdown from '../components/Dropdown';
import { useState, useEffect, useCallback } from 'react';
import NavBar from '../shared/Navbar';


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
  const [coverUrl, setCoverUrl] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [modoGuardado, setModoGuardado] = useState(false);
  const noEditables = ['1', '2', '3'];
  const esEditable = !noEditables.includes(String(presetModeId));

  // Extrae el trackId de Spotify
  const extraerSpotifyTrackId = (url) => {
    const regex = /open\.spotify\.com\/track\/([a-zA-Z0-9]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Construye URL de portada vía oEmbed
  const fetchCoverAndEmbed = async (trackId) => {
    // Portada a través del endpoint oEmbed
    try {
      const res = await fetch(`https://open.spotify.com/oembed?url=https://open.spotify.com/track/${trackId}`);
      const json = await res.json();
      setCoverUrl(json.thumbnail_url);
    } catch (e) {
      console.warn('No se pudo obtener portada', e);
      setCoverUrl('');
    }
    // Embed player
    setEmbedUrl(`https://open.spotify.com/embed/track/${trackId}`);
  };

  const obtenerCanciones = async () => {
    const { data, error } = await supabase.from('MUSICA').select('*');
    if (error) {
      console.error('Error al obtener canciones:', error.message);
      return;
    }
    setCanciones(data);
  };

  useFocusEffect(
    useCallback(() => {
      obtenerCanciones();
    }, [])
  );

  useEffect(() => {
    if (presetModeId && presetModeId !== 'custom' && canciones.length) {
      cargarModo(presetModeId);
    }
  }, [presetModeId, canciones]);

  const cargarModo = async (id) => {
    setLoading(true);
    const { data, error } = await supabase.from('MODO').select('*').eq('id', id).single();
    if (error) {
      console.error('Error al cargar modo:', error);
      setMensaje('Error al cargar el modo.');
    } else {
      setNombre(data.nombre || '');
      setIdMusica(String(data.id_musica || ''));
      setRgb1(String(data.rgb1 ?? ''));
      setRgb2(String(data.rgb2 ?? ''));
      setRgb3(String(data.rgb3 ?? ''));
      setColorHex(
        `#${
          ((1 << 24) + ((data.rgb1 || 255) << 16) + ((data.rgb2 || 255) << 8) + (data.rgb3 || 255))
            .toString(16)
            .slice(1)
        }`
      );
      // Si ya tenía música, carga cover
      const sel = canciones.find(c => String(c.id) === String(data.id_musica));
      if (sel) {
        const tid = extraerSpotifyTrackId(sel.link);
        if (tid) await fetchCoverAndEmbed(tid);
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
    return (
      nombre.trim() &&
      idMusica &&
      !isNaN(idMusica) &&
      rgb1 && !isNaN(rgb1) &&
      rgb2 && !isNaN(rgb2) &&
      rgb3 && !isNaN(rgb3)
    );
  };

  useEffect(() => {
    if (presetModeId && presetModeId !== 'custom') {
      setModoGuardado(true);
    } else {
      setModoGuardado(false);
    }
  }, [presetModeId]);

  const guardarModo = async () => {
    if (!camposValidos()) {
      setMensaje('Completá todos los campos correctamente.');
      return;
    }
    if (!esEditable) {
      setMensaje('Este modo no es editable.');
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
        setMensaje('Error al actualizar modo.');
      } else {
        setModoGuardado(true);  // Marca modo como guardado
        navigation.goBack();
      }
    } else {
      const { error } = await supabase.from('MODO').insert([modoData]);
      if (error) {
        setMensaje('Error al guardar modo.');
      } else {
        setModoGuardado(true);  // Marca modo como guardado
        navigation.goBack();
      }
    }
    setLoading(false);
  };

  const enviarADispositivo = () => {
    if (!modoGuardado) {
      setMensaje('Primero guarda el modo antes de enviarlo.');
      return;
    }
    // Aquí pondrías la lógica real de enviar datos al dispositivo
    setMensaje('Modo enviado al dispositivo.');
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#1e5631" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AgregarCancionScreen')}
          style={styles.nuevaCancionBtn}
        >
          <Text style={styles.nuevaCancionText}>+ Agregar canción</Text>
        </TouchableOpacity>
  
        <Text style={styles.title}>
          {presetModeId && presetModeId !== 'custom' ? 'Editar Modo' : 'Personalizar Modo'}
        </Text>
  
        <Text style={styles.label}>Nombre del Paciente</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          editable={esEditable}
        />
  
        <Text style={styles.label}>Seleccionar una Canción de Spotify</Text>
        <Dropdown
          options={canciones.map(c => ({
            label: c.nombreCancion,
            value: String(c.id),
          }))}
          selectedValue={idMusica}
          onValueChange={async (val) => {
            setIdMusica(val);
            const sel = canciones.find(c => String(c.id) === val);
            if (sel) {
              const tid = extraerSpotifyTrackId(sel.link);
              if (tid) await fetchCoverAndEmbed(tid);
              else setCoverUrl('');
            }
          }}
          enabled={esEditable}
        />
  
        {coverUrl ? (
          <View style={styles.coverContainer}>
            <Image source={{ uri: coverUrl }} style={styles.cover} />
          </View>
        ) : null}
  
        {embedUrl ? (
          <View style={styles.embedContainer}>
            <WebView
              source={{ uri: embedUrl }}
              javaScriptEnabled
              domStorageEnabled
              allowsInlineMediaPlayback
              mediaPlaybackRequiresUserAction={false}
            />
          </View>
        ) : null}
  
        <Text style={styles.label}>Color RGB</Text>
        <Text style={styles.colorDisplay}>R:{rgb1} G:{rgb2} B:{rgb3}</Text>
        <ColorPicker
          color={colorHex}
          onColorChange={onColorSelected}
          style={styles.picker}
          thumbSize={30}
          sliderSize={30}
        />
  
        <Pressable
          onPress={guardarModo}
          disabled={!esEditable}
          style={({ pressed }) => [
            styles.botonGuardar,
            { opacity: modoGuardado ? 0.4 : 1 },
            pressed && { opacity: 0.6 }
          ]}
        >
          <Text style={styles.textoBoton}>
            {presetModeId && presetModeId !== 'custom' ? 'Actualizar Modo' : 'Guardar Modo'}
          </Text>
        </Pressable>

        <Pressable
          onPress={enviarADispositivo}
          disabled={!modoGuardado}
          style={({ pressed }) => [
            styles.botonEnviar,
            { opacity: modoGuardado ? 1 : 0.4 },
            pressed && { opacity: 0.6 }
          ]}
        >
          <Text style={styles.textoBoton}>
            Enviar a dispositivo
          </Text>
        </Pressable>

        {mensaje ? <Text style={styles.message}>{mensaje}</Text> : null}
      </ScrollView>
  
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  nuevaCancionBtn: {
    backgroundColor: '#1e5631',
    padding: 12,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 20,
  },
  nuevaCancionText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e5631', textAlign: 'center', marginBottom: 20 },
  label: { fontSize: 16, color: '#333', marginBottom: 5 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 12,
    padding: 10, backgroundColor: '#fff', marginBottom: 15,
  },
  coverContainer: { alignItems: 'center', marginBottom: 15 },
  cover: { width: 250, height: 250, borderRadius: 12 },
  embedContainer: { height: 80, marginBottom: 20, flex: 1, },
  colorDisplay: { textAlign: 'center', marginBottom: 10, fontSize: 16 },
  picker: { width: 250, height: 250, alignSelf: 'center', marginBottom: 40 },
  message: { color: 'red', textAlign: 'center', marginTop: 10
},
  screenContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'space-between',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
    // Contenedor principal de la pantalla
    screenContainer: {
      flex: 1,
      backgroundColor: '#FFFFF3',        // fondo suave crema
      justifyContent: 'space-between',   // NavBar fijo abajo
    },
    // Scroll interno con padding generoso
    scrollContent: {
      padding: 20,
      paddingBottom: 120,                // espacio para la NavBar
    },
  
    // Botón “+ Agregar canción”
    nuevaCancionBtn: {
      backgroundColor: '#0a0d41',        // azul profundo
      paddingVertical: 14,
      paddingHorizontal: 28,
      borderRadius: 30,
      alignSelf: 'center',
      marginBottom: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 6,
    },
    nuevaCancionText: {
      color: '#FFFFEE',
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
  
    // Título grande
    title: {
      fontSize: 26,
      fontWeight: '700',
      color: '#0a0d41',
      textAlign: 'center',
      marginBottom: 20,
    },
  
    // Etiquetas de campo
    label: {
      fontSize: 16,
      fontWeight: '500',
      color: '#0a0d41',
      marginBottom: 8,
    },
  
    // Inputs y dropdown
    input: {
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderColor: '#B9D9EB',
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginBottom: 18,
      fontSize: 16,
      color: '#0a0d41',
    },
    pickerContainer: {
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderColor: '#B9D9EB',
      borderRadius: 12,
      marginBottom: 18,
    },
  
    // Cover art
    coverContainer: {
      alignItems: 'center',
      marginBottom: 18,
    },
    cover: {
      width: 200,
      height: 200,
      borderRadius: 16,
    },
  
    // Embed player
    embedContainer: {
      height: 80,
      marginBottom: 24,
    },
  
    // Color display
    colorDisplay: {
      fontSize: 16,
      textAlign: 'center',
      color: '#0a0d41',
      marginBottom: 12,
    },
    picker: {
      width: 260,
      height: 260,
      alignSelf: 'center',
      marginBottom: 32,
    },
  
    // Mensaje de error o confirmación
    message: {
      fontSize: 15,
      textAlign: 'center',
      color: '#C73F4A',
      marginTop: 12,
      marginBottom: 24,
    },
  
    // Loading
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    botonGuardar: {
      backgroundColor: '#1e5631',
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 24,
      marginBottom: 16,
      alignItems: 'center',
    },
    botonEnviar: {
      backgroundColor: '#107896',
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 24,
      marginBottom: 30,
      alignItems: 'center',
    },
    textoBoton: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600',
    },
  });
  

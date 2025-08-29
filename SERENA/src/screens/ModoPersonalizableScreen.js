import { View, TextInput, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView, Image, Pressable, Alert } from 'react-native';
import { supabase } from '../services/supabaseClient';
import ColorPicker from 'react-native-color-picker-wheel';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import Dropdown from '../components/Dropdown';
import { useState, useEffect, useCallback } from 'react';
import NavBar from '../shared/Navbar';
import Slider from '@react-native-community/slider';

export default function PersonalizableScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { presetModeId } = route.params || {};
  const [currentUserId, setCurrentUserId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [idMusica, setIdMusica] = useState('');
  const [rgb1, setRgb1] = useState('');
  const [rgb2, setRgb2] = useState('');
  const [rgb3, setRgb3] = useState('');
  const [colorHex, setColorHex] = useState('#ffffff');
  const [mensaje, setMensaje] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [loading, setLoading] = useState(false);
  const [canciones, setCanciones] = useState([]);
  const [coverUrl, setCoverUrl] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [modoGuardado, setModoGuardado] = useState(false);
  const [ventilador, setVentilador] = useState(0);
  const noEditables = ['1', '2', '3'];
  const esEditable = !noEditables.includes(String(presetModeId));

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setCurrentUserId(session.user.id);
      }
    };
    getCurrentUser();
  }, []);

  const extraerSpotifyTrackId = (url) => {
    const regex = /open\.spotify\.com\/track\/([a-zA-Z0-9]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const fetchCoverAndEmbed = async (trackId) => {
    try {
      const res = await fetch(`https://open.spotify.com/oembed?url=https://open.spotify.com/track/${trackId}`);
      const json = await res.json();
      setCoverUrl(json.thumbnail_url);
    } catch (e) {
      console.warn('No se pudo obtener portada', e);
      setCoverUrl('');
    }
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
      setIdMusica(data.id_musica ? String(data.id_musica) : '');
      setRgb1(String(data.rgb1 ?? ''));
      setRgb2(String(data.rgb2 ?? ''));
      setRgb3(String(data.rgb3 ?? ''));
      setColorHex(
        `#${
          ((1 << 24) + ((data.rgb1 || 255) << 16) + ((data.rgb2 || 255) << 8) + (data.rgb3 || 255))
            .toString(16)
            .slice(1)
        }`);
      // For preset modes (1, 2, 3), always set observaciones to empty string
      setObservaciones(!esEditable ? '' : (data.observaciones || ''));
      setVentilador(Math.round((data.ventilador ?? 0) / 25));
      
      // Only fetch cover if there's a song selected
      if (data.id_musica) {
        const sel = canciones.find(c => String(c.id) === String(data.id_musica));
        if (sel) {
          const tid = extraerSpotifyTrackId(sel.link);
          if (tid) await fetchCoverAndEmbed(tid);
        }
      } else {
        setCoverUrl('');
        setEmbedUrl('');
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

  const validarCampos = () => {
    // Validar que el nombre no esté vacío
    if (!nombre.trim()) {
      return 'El nombre del paciente es requerido';
    }
    
    // Validar que si se proporciona un ID de música, sea un número válido
    // Permitir que idMusica esté vacío (será null)
    if (idMusica && idMusica.trim() !== '' && isNaN(idMusica)) {
      return 'El ID de música debe ser un número válido';
    }
    
    // Validar que los valores RGB sean números válidos
    if (!rgb1 || isNaN(rgb1)) {
      return 'El valor RGB 1 es requerido y debe ser un número';
    }
    if (!rgb2 || isNaN(rgb2)) {
      return 'El valor RGB 2 es requerido y debe ser un número';
    }
    if (!rgb3 || isNaN(rgb3)) {
      return 'El valor RGB 3 es requerido y debe ser un número';
    }
    
    return null; // No hay errores
  };

  useEffect(() => {
    if (presetModeId && presetModeId !== 'custom') {
      setModoGuardado(true);
    } else {
      setModoGuardado(false);
    }
  }, [presetModeId]);

  // Auto-clear messages after 10 seconds
  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => {
        setMensaje('');
      }, 10000); // 10 seconds
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  const guardarModo = async () => {
    if (!esEditable) {
      Alert.alert('Error', 'Este modo no es editable.');
      return;
    }
    const errorValidacion = validarCampos();
    if (errorValidacion) {
      Alert.alert('Error de validación', errorValidacion);
      return;
    }
    if (!currentUserId) {
      Alert.alert('Error', 'No se pudo obtener el usuario actual. Por favor, inicie sesión nuevamente.');
      return;
    }
    const modoData = {
      nombre,
      id_musica: idMusica ? parseInt(idMusica) : null,
      rgb1: parseInt(rgb1),
      rgb2: parseInt(rgb2),
      rgb3: parseInt(rgb3),
      id_usuario: currentUserId,
      observaciones: !esEditable ? null : observaciones,
      ventilador: ventilador * 25,
    };
    setLoading(true);
    if (presetModeId && presetModeId !== 'custom') {
      const { error } = await supabase.from('MODO').update(modoData).eq('id', presetModeId);
      if (error) {
        Alert.alert('Error', 'Error al actualizar modo.');
      } else {
        setModoGuardado(true);
        Alert.alert('Éxito', 'Modo actualizado con éxito!');
      }
    } else {
      const { error } = await supabase.from('MODO').insert([modoData]);
      if (error) {
        Alert.alert('Error', 'Error al guardar modo.');
      } else {
        setModoGuardado(true);
        Alert.alert('Éxito', 'Modo guardado con éxito!');
      }
    }
    setLoading(false);
  };

  const enviarADispositivo = () => {
    if (!modoGuardado) {
      Alert.alert('Error', 'Primero guarda el modo antes de enviarlo.');
      return;
    }
    Alert.alert('Éxito', 'Modo enviado al dispositivo.');
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
        <Text style={styles.title}>
          {presetModeId && presetModeId !== 'custom' ? 'Editar Modo' : 'Personalizar Modo'}
        </Text>

        <Text style={styles.label}>Nombre del Paciente</Text>
        <TextInput
          style={[styles.input, !esEditable && styles.inputDisabled]}
          value={nombre}
          onChangeText={setNombre}
          editable={esEditable}
        />
  
        <Text style={styles.label}>Seleccionar una Canción de Spotify</Text>
        <Dropdown
          options={[
            { label: 'Ninguna canción', value: '' },
            ...canciones.map(c => ({
              label: c.nombreCancion,
              value: String(c.id),
            }))
          ]}
          selectedValue={idMusica}
          onValueChange={async (val) => {
            setIdMusica(val);
            if (val === '') {
              setCoverUrl('');
              setEmbedUrl('');
            } else {
              const sel = canciones.find(c => String(c.id) === val);
              if (sel) {
                const tid = extraerSpotifyTrackId(sel.link);
                if (tid) await fetchCoverAndEmbed(tid);
                else setCoverUrl('');
              }
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
        
        <TouchableOpacity
          onPress={() => navigation.navigate('AgregarCancionScreen')}
          style={styles.nuevaCancionBtn}>
          <Text style={styles.nuevaCancionText}>+ Agregar canción</Text>
        </TouchableOpacity>
        
        <Text style={styles.label}>Color RGB</Text>
        <Text style={styles.colorDisplay}>R:{rgb1} G:{rgb2} B:{rgb3}</Text>
        <ColorPicker
          color={colorHex}
          onColorChange={onColorSelected}
          style={[styles.picker, !esEditable && styles.pickerDisabled]}
          thumbSize={30}
          sliderSize={30}
          disabled={!esEditable}/>

        {esEditable && (
          <>
            <Text style={styles.label}>Observaciones del Paciente</Text>
            <TextInput
              style={[styles.input, styles.textArea]} value={observaciones} onChangeText={setObservaciones} editable={esEditable} multiline
            />
          </>
        )}


 <View style={styles.sliderContainer}>
        <Text style={styles.label}>Ventilador (velocidad)</Text>
        <Text style={styles.sliderValue}>{ventilador}</Text>
      <Slider style={{width: '100%', height: 40}} minimumValue={0} maximumValue={10} step={1} value={ventilador}
        onValueChange={(val) => setVentilador(val)} minimumTrackTintColor="#161A68" maximumTrackTintColor="#ccc" thumbTintColor="#161A68" disabled={!esEditable} />
      </View>

        {esEditable && (
          <Pressable
            onPress={guardarModo}
            style={({ pressed }) => [
              styles.botonGuardar,
              { opacity: modoGuardado ? 0.4 : 1 },
              pressed && { opacity: 0.6 }
            ]}
          >
            <Text style={styles.textoBotonGuardar}>
              {presetModeId && presetModeId !== 'custom' ? 'Actualizar Modo' : 'Guardar Modo'}
            </Text>
          </Pressable>
        )}

        <Pressable
          onPress={enviarADispositivo}
          disabled={!modoGuardado}
          style={({ pressed }) => [
            styles.botonEnviar,
          ]}
        >
          <Text style={styles.textoBoton}> Enviar a dispositivo </Text>
        </Pressable>

        {mensaje ? (
          <Text style={[
            styles.message, 
            mensaje.startsWith('SUCCESS:') ? styles.successMessage : styles.errorMessage
          ]}>
            {mensaje.replace('SUCCESS:', '')}
          </Text>
        ) : null}
      </ScrollView>
  
      <NavBar />
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

  // Botón + Agregar canción
  nuevaCancionBtn: {
    backgroundColor: '#0A0D41',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom: 24,
  },
  nuevaCancionText: {
    color: '#FFFFF3',
    fontSize: 16,
    fontWeight: '600',
  },

  // Título
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#161A68',
    textAlign: 'center',
    marginBottom: 20,
  },

  // Labels
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#161A68',
    marginBottom: 6,
  },

  // Inputs y dropdowns
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 18,
    fontSize: 16,
    color: '#0A0D41',
  },
  textArea: {
    backgroundColor: '#FFFFF9',
    borderWidth: 1,
    borderColor: '#B9D9EB',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 18,
    fontSize: 16,
    color: '#0A0D41',
    height: 80,
    textAlignVertical: 'top',
  },
  inputDisabled: {
    backgroundColor: '#E7E7E7',
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#B9D9EB',
    borderRadius: 12,
    marginBottom: 18,
  },

  // Portada canción
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

  // Player embebido
  embedContainer: {
    height: 80,
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#B9D9EB',
  },

  // Color RGB
  colorDisplay: {
    fontSize: 16,
    textAlign: 'center',
    color: '#0A0D41',
    marginBottom: 12,
    fontWeight: '500',
  },
  picker: {
    width: 260,
    height: 260,
    alignSelf: 'center',
    marginBottom: 48,
  },
  pickerDisabled: {
    opacity: 0.5,
  },

  // Botones de acción
  botonGuardar: {
    backgroundColor: '#B9D9EB',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginBottom: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  botonEnviar: {
    backgroundColor: '#161A68',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginBottom: 30,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#FFFFF3',
    fontSize: 18,
    fontWeight: '600',
  },
  textoBotonGuardar: {
    color: "#161A68",   // azul oscuro
    fontSize: 18,
    fontWeight: "bold",
  },

  // Mensajes
  message: {
    fontSize: 15,
    textAlign: 'center',
    color: '#C73F4A',
    marginTop: 12,
    marginBottom: 24,
  },
  successMessage: {
    fontSize: 24,
    textAlign: 'center',
    color: '#2E8B57',
    marginTop: 12,
    marginBottom: 24,
    fontWeight: '600',
  },
  errorMessage: {
    fontSize: 24,
    textAlign: 'center',
    color: '#C73F4A',
    marginTop: 12,
    marginBottom: 24,
  },
  sliderContainer: {
    marginBottom: 24,
    width: '100%',
    alignSelf: 'stretch',
    backgroundColor: '#FFFF9',
    borderWidth: 2.2,
    borderColor: '#B9D9EB',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    // Sombras (Android/iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  sliderValue: {
    fontSize: 26,
    fontWeight: '700',
    color: '#161A68',
    textAlign: 'center',
    marginBottom: 12,
  },
  sliderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#161A68',
    marginBottom: 8,
    textAlign: 'center',
  },
});

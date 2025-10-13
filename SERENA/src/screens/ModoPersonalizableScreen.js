
import { View, TextInput, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView, Image, Pressable, Alert, Vibration } from 'react-native';
import { supabase } from '../services/supabaseClient';
import ColorPicker from 'react-native-color-picker-wheel';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import Dropdown from '../components/Dropdown';
import { useState, useEffect, useCallback } from 'react';
import NavBar from '../shared/Navbar';
import Slider from '@react-native-community/slider';
import { commonStyles } from "../styles/ModoStyles";

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
        Vibration.vibrate(500); // Vibración de éxito al guardar
      }
    } else {
      const { error } = await supabase.from('MODO').insert([modoData]);
      if (error) {
        Alert.alert('Error', 'Error al guardar modo.');
      } else {
        setModoGuardado(true);
        Alert.alert('Éxito', 'Modo guardado con éxito!');
        Vibration.vibrate(500); // Vibración de éxito al guardar
      }
    }
    setLoading(false);
  };

  const enviarADispositivo = async () => {
    if (!modoGuardado) {
      Alert.alert('Error', 'Primero guarda el modo antes de enviarlo.');
      return;
    }

    try {
      const isBluetoothEnabled = await new Promise((resolve, reject) => {
        BluetoothSerial.isEnabled(
          (enabled) => resolve(enabled),
          (error) => reject(error)
        );
      });

      if (!isBluetoothEnabled) {
        Alert.alert('Error', 'Prenda el bluetooth para poder conectarse al dispositivo');
        return;
      }

      Alert.alert('Éxito', 'Modo enviado al dispositivo.');
      Vibration.vibrate(1000); // Vibración más larga para confirmación de envío
    } catch (error) {
      console.error('Error checking Bluetooth:', error);
      Alert.alert('Error', 'Error al verificar Bluetooth.');
      Vibration.vibrate(200, true); // Vibración corta para error (pattern for error)
    }
  };

  if (loading) {
    return (
      <View style={[commonStyles.container, commonStyles.center]}>
        <ActivityIndicator size="large" color="#1e5631" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={commonStyles.screenContainer}>
      <ScrollView contentContainerStyle={commonStyles.scrollContent}>
      <TouchableOpacity
          onPress={() => navigation.navigate('ModosPredeterminadosScreen')}
          style={[commonStyles.nuevaCancionBtn, { marginTop: 40 }]}>
          <Text style={commonStyles.nuevaCancionText}>←</Text>
        </TouchableOpacity>
        <Text style={commonStyles.title}>
          {presetModeId && presetModeId !== 'custom' ? 'Editar Modo' : 'Personalizar Modo'}
        </Text>
       
        <Text style={commonStyles.label}>Nombre del Paciente</Text>
        <TextInput
          style={[commonStyles.input, !esEditable && commonStyles.inputDisabled]}
          value={nombre}
          onChangeText={setNombre}
          editable={esEditable}
        />
  
        <Text style={commonStyles.label}>Seleccionar una Canción de Spotify</Text>
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
          <View style={commonStyles.coverContainer}>
            <Image source={{ uri: coverUrl }} style={commonStyles.cover} />
          </View>
        ) : null}
  
        {embedUrl ? (
          <View style={commonStyles.embedContainer}>
            <WebView
              source={{ uri: embedUrl }}
              javaScriptEnabled
              domStorageEnabled
              allowsInlineMediaPlayback
              mediaPlaybackRequiresUserAction={false}
            />
          </View>
        ) : null}
        


        
        {esEditable && (
          <TouchableOpacity
            onPress={() => navigation.navigate('AgregarCancionScreen')}
            style={commonStyles.nuevaCancionBtn}>
            <Text style={commonStyles.nuevaCancionText}>+ Agregar canción</Text>
          </TouchableOpacity>
        )}
        
        <Text style={commonStyles.label}>Color de la luz</Text>
        <Text style={commonStyles.colorDisplay}>R:{rgb1} G:{rgb2} B:{rgb3}</Text>
        <ColorPicker
          color={colorHex}
          onColorChange={onColorSelected}
          style={[commonStyles.picker, !esEditable && commonStyles.pickerDisabled, !esEditable && { marginTop: 80 }]}
          thumbSize={30}
          sliderSize={30}
          disabled={!esEditable}/>

        {esEditable && (
          <>
            <Text style={[commonStyles.label, { marginTop: 80 }]}>Observaciones del Paciente</Text>
            <TextInput
              style={[commonStyles.input, commonStyles.textArea]} value={observaciones} onChangeText={setObservaciones} editable={esEditable} multiline
            />
          </>
        )}
 
        <Text style={[commonStyles.label, !esEditable && { marginTop: 90 }]}>Ventilador (velocidad)</Text>
        <View style={commonStyles.sliderContainer}>
        <Text style={commonStyles.sliderValue}>{ventilador}</Text>
      <Slider style={{width: '100%', height: 40}} minimumValue={0} maximumValue={10} step={1} value={ventilador}
        onValueChange={(val) => setVentilador(val)} minimumTrackTintColor="#161A68" maximumTrackTintColor="#ccc" thumbTintColor="#161A68" disabled={!esEditable} />
      </View>

        {esEditable && (
          <Pressable
            onPress={guardarModo}
            style={({ pressed }) => [
              commonStyles.botonGuardar,
              { marginBottom: 0 },
              pressed && { opacity: 0.6 }
            ]}
          >
            <Text style={commonStyles.textoBotonGuardar}>
              {presetModeId && presetModeId !== 'custom' ? 'Actualizar Modo' : 'Guardar Modo'}
            </Text>
          </Pressable>
        )}

        <Pressable
          onPress={enviarADispositivo}
          disabled={!modoGuardado}
          style={({ pressed }) => [
            commonStyles.botonGuardar,
            { marginTop: 10 },
            pressed && { opacity: 0.6 }
          ]}
        >
          <Text style={commonStyles.textoBotonGuardar}> Enviar a dispositivo </Text>
        </Pressable>

        {mensaje ? (
          <Text style={[
            commonStyles.message, 
            mensaje.startsWith('SUCCESS:') ? commonStyles.successMessage : commonStyles.errorMessage
          ]}>
            {mensaje.replace('SUCCESS:', '')}
          </Text>
        ) : null}
      </ScrollView>
      <NavBar />
    </View>
  );
}
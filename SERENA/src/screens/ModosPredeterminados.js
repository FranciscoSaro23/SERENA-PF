import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { supabase } from '../services/supabaseClient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import NavBar from '../shared/Navbar';

export default function PredeterminadosScreen () {
  const [presetModes, setPresetModes] = useState([]);
  const [editingModeId, setEditingModeId] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setCurrentUserId(session.user.id);
      }
    };
    getCurrentUser();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchPresetModes();
    }, [currentUserId])
  );

  const fetchPresetModes = async () => {
    console.log('Fetching modes for user:', currentUserId);
    
    const { data, error } = await supabase
      .from('MODO')
      .select('id, nombre, id_usuario')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error al obtener modos:', error);
    } else {
      console.log('All modes from database:', data);
      
      // Always include predetermined modes (id_usuario === null)
      const predeterminados = data.filter((m) => m.id_usuario === null);
      console.log('Predetermined modes:', predeterminados);

      // Include personalized modes for the logged-in user
      const personalizados = currentUserId 
        ? data.filter((m) => m.id_usuario === currentUserId)
        : [];
      console.log('Personalized modes:', personalizados);

      // Combine both lists, avoiding duplicates if any
      const allModesMap = new Map();
      predeterminados.forEach(m => allModesMap.set(m.id, m));
      personalizados.forEach(m => allModesMap.set(m.id, m));
      const allModes = Array.from(allModesMap.values());

      console.log('Final modes to display:', allModes);
      setPresetModes(allModes);
    }
  };

  const onRename = (id) => {
    const modoActual = presetModes.find(mode => mode.id === id);
    const nombreActual = modoActual ? modoActual.nombre : '';
    
    Alert.prompt(
      'Renombrar Modo',
      'Edite el nombre:',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Renombrar',
          onPress: (nuevoNombre) => {
            if (nuevoNombre && nuevoNombre.trim() !== '') {
              renombrarModo(id, nuevoNombre.trim());
            } else {
              Alert.alert('Error', 'El nombre no puede estar vacío');
            }
          },
        },
      ],
      'plain-text',
      nombreActual,
      'default'
    );
  };

  const renombrarModo = async (id, nuevoNombre) => {
    const { error } = await supabase
      .from('MODO')
      .update({ nombre: nuevoNombre })
      .eq('id', id);

    if (error) {
      console.error('Error al renombrar modo:', error.message);
      Alert.alert('Error', 'No se pudo renombrar el modo');
    } else {
      // Actualizar el estado local
      setPresetModes(prev => prev.map(mode => 
        mode.id === id ? { ...mode, nombre: nuevoNombre } : mode
      ));
      setEditingModeId(null); // Salir del modo edición
    }
  };

  const onDelete = (id) => {
    const modoActual = presetModes.find(mode => mode.id === id);
    const nombreModo = modoActual ? modoActual.nombre : 'este modo';
    
    Alert.alert(
      'Eliminar',
      `¿Está seguro que desea eliminar el modo "${nombreModo}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => eliminarModo(id) },
      ]
    );
  };

  const eliminarModo = async (id) => {
    const { error } = await supabase.from('MODO').delete().eq('id', id);
    if (error) {
      console.error('Error al eliminar modo:', error.message);
    } else {
      setPresetModes((prev) => prev.filter((mode) => mode.id !== id));
    }
  };

  const onCancelEdit = () => {
    setEditingModeId(null);
  };

  const renderPresetMode = ({ item, index }) => {
    const isPredetermined = item.id_usuario === null;
    const isEditing = editingModeId === item.id;

    if (isEditing) {
      return (
        <View style={styles.editContainer}>
          <Text style={styles.editTitle}>{item.nombre}</Text>
          <TouchableOpacity style={styles.renameButton} onPress={() => onRename(item.id)}>
            <Text style={styles.actionButtonText}>Renombrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
            <Text style={styles.actionButtonText}>Eliminar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancelEdit}>
            <Text style={styles.actionButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={[
          styles.modeContainer,
          isPredetermined ? styles.lockedContainer : styles.unlockedContainer,
        ]}
        onPress={() => navigation.navigate('ModoPersonalizableScreen', { presetModeId: item.id })}
        onLongPress={() => !isPredetermined && setEditingModeId(item.id)}
      >
        <View style={styles.radioCircle} />
        <Text style={[styles.modeText, isPredetermined ? styles.lockedText : styles.unlockedText]}>
          {item.nombre}
        </Text>
        <Text style={[styles.icon, isPredetermined && styles.lockedText]}>
          {isPredetermined ? '🔒' : '⚙️'}
        </Text>
      </TouchableOpacity>
    );
  };

  const agregarNuevoModo = () => {
    navigation.navigate('ModoPersonalizableScreen', { presetModeId: null });
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>Editar Modos</Text>
        <FlatList
          data={presetModes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPresetMode}
          contentContainerStyle={styles.listContainer}
          scrollEnabled={false}
          ListFooterComponent={
            <TouchableOpacity style={styles.customizeButton} onPress={agregarNuevoModo}>
              <Text style={styles.customizeText}> + Personalizar</Text>
            </TouchableOpacity>
          }
        />
      </ScrollView>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFFFF3',
  },
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 90, // espacio para que el contenido no quede detrás del navbar
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0A0D41',
    textAlign: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    color: '#0A0D41',
    fontWeight: '600',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  modeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  unlockedContainer: {
    backgroundColor: '#B9D9EB',
  },
  lockedContainer: {
    backgroundColor: '#0A0D41',
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#0A0D41',
    backgroundColor: '#FFF',
    marginRight: 12,
  },
  modeText: {
    flex: 1,
    fontSize: 14,
  },
  unlockedText: {
    color: '#161A68',
  },
  lockedText: {
    color: '#fff',
  },
  icon: {
    fontSize: 18,
  },
  customizeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#0A0D41',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  customizeText: {
    fontSize: 14,
    color: '#0A0D41',
    fontWeight: '500',
    marginLeft: 12,
  },
  editContainer: {
    backgroundColor: '#FFFFF3',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  editTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 6,
    color: '#0A0D41',
  },
  actionText: {
    fontSize: 14,
    marginVertical: 2,
  },
  renameButton: {
    backgroundColor: '#B9D9EB',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#0A0D41',
  },
  deleteButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#CC0000',
  },
  cancelButton: {
    backgroundColor: '#FFFFF3',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#0A0D41',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#0A0D41',
  },
});

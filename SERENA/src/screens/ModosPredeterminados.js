import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { supabase } from '../services/supabaseClient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import NavBar from '../shared/Navbar';
import { commonStyles } from "../styles/ModoStyles";

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
        <View style={commonStyles.editContainer}>
          <Text style={commonStyles.editTitle}>{item.nombre}</Text>
          <TouchableOpacity style={commonStyles.renameButton} onPress={() => onRename(item.id)}>
            <Text style={commonStyles.actionButtonText}>Renombrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={commonStyles.deleteButton} onPress={() => onDelete(item.id)}>
            <Text style={commonStyles.actionButtonText}>Eliminar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={commonStyles.cancelButton} onPress={onCancelEdit}>
            <Text style={commonStyles.actionButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={[
          commonStyles.modeContainer,
          isPredetermined ? commonStyles.lockedContainer : commonStyles.unlockedContainer,
        ]}
        onPress={() => navigation.navigate('ModoPersonalizableScreen', { presetModeId: item.id })}
        onLongPress={() => !isPredetermined && setEditingModeId(item.id)}
      >
        <View style={commonStyles.radioCircle} />
        <Text style={[commonStyles.modeText, isPredetermined ? commonStyles.lockedText : commonStyles.unlockedText]}>
          {item.nombre}
        </Text>
        <Text style={[commonStyles.icon, isPredetermined && commonStyles.lockedText]}>
          {isPredetermined ? '🔒' : '⚙️'}
        </Text>
      </TouchableOpacity>
    );
  };

  const agregarNuevoModo = () => {
    navigation.navigate('ModoPersonalizableScreen', { presetModeId: null });
  };

  return (
    <View style={commonStyles.wrapper}>
      <ScrollView contentContainerStyle={commonStyles.container}>
        <Text style={commonStyles.pageTitle}>Editar Modos</Text>
        <FlatList
          data={presetModes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPresetMode}
          contentContainerStyle={commonStyles.listContainer}
          scrollEnabled={false}
          ListFooterComponent={
            <TouchableOpacity style={commonStyles.customizeButton} onPress={agregarNuevoModo}>
              <Text style={commonStyles.customizeText}> + Personalizar</Text>
            </TouchableOpacity>
          }
        />
      </ScrollView>
      <NavBar />
    </View>
  );
};

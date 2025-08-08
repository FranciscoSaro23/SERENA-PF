import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { supabase } from '../services/supabaseClient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import NavBar from '../shared/Navbar';

export default function PredeterminadosScreen () {
  const [presetModes, setPresetModes] = useState([]);
  const [editingModeId, setEditingModeId] = useState(null);
  const navigation = useNavigation();
  const usuarioIdPrueba = 'd28065e7-5749-4e55-889d-ff6699200ba8';

  useFocusEffect(
    React.useCallback(() => {
      fetchPresetModes();
    }, [])
  );

  const fetchPresetModes = async () => {
    const { data, error } = await supabase
      .from('MODO')
      .select('id, nombre, id_usuario')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error al obtener modos:', error);
    } else {
      const predeterminados = data
        .filter((m) => m.id_usuario === null)
        .slice(0, 3);

      const personalizados = data.filter((m) => m.id_usuario === usuarioIdPrueba);
      const allModes = [...predeterminados, ...personalizados];
      setPresetModes(allModes);
    }
  };

  const onRename = (id) => {
    Alert.alert('Renombrar', `Función para renombrar modo ${id} (pendiente)`);
  };

  const onDelete = (id) => {
    Alert.alert(
      'Eliminar',
      `¿Está seguro que desea eliminar el modo ${id}?`,
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
    const locked = item.id_usuario === null && index >= 3;
    const isEditing = editingModeId === item.id;

    if (isEditing) {
      return (
        <View style={styles.editContainer}>
          <Text style={styles.editTitle}>{item.nombre}</Text>
          <TouchableOpacity onPress={() => onRename(item.id)}>
            <Text style={[styles.actionText, { color: 'blue' }]}>Renombrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(item.id)}>
            <Text style={[styles.actionText, { color: 'red' }]}>Eliminar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCancelEdit}>
            <Text style={[styles.actionText, { color: 'blue' }]}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={[
          styles.modeContainer,
          locked ? styles.lockedContainer : styles.unlockedContainer,
        ]}
        disabled={locked}
        onPress={() => navigation.navigate('ModoPersonalizableScreen', { presetModeId: item.id })}
        onLongPress={() => setEditingModeId(item.id)}
      >
        <View style={styles.radioCircle} />
        <Text style={[styles.modeText, locked ? styles.lockedText : styles.unlockedText]}>
          {item.nombre}
        </Text>
        <Text style={[styles.icon, locked && styles.lockedText]}>
          {locked ? '🔒' : '⚙️'}
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
        <Text style={styles.title}>Modos Predeterminados</Text>
        <FlatList
          data={presetModes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPresetMode}
          contentContainerStyle={styles.listContainer}
          scrollEnabled={false} // ya usamos ScrollView
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
    backgroundColor: '#FFFDF5',
  },
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 90, // espacio para que el contenido no quede detrás del navbar
  },
  title: {
    fontSize: 20,
    color: '#0F1C65',
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
    backgroundColor: '#0F1C65',
  },
  lockedContainer: {
    backgroundColor: '#BFC4DC',
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#0F1C65',
    backgroundColor: '#FFF',
    marginRight: 12,
  },
  modeText: {
    flex: 1,
    fontSize: 14,
  },
  unlockedText: {
    color: '#fff',
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
    borderColor: '#0F1C65',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  customizeText: {
    fontSize: 14,
    color: '#0F1C65',
    fontWeight: '500',
    marginLeft: 12,
  },
  editContainer: {
    backgroundColor: '#FFFDF5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  editTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 6,
    color: '#0F1C65',
  },
  actionText: {
    fontSize: 14,
    marginVertical: 2,
  },
});

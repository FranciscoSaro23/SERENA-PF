import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { supabase } from '../services/supabaseClient';

const PresetModesScreen = () => {
  const [presetModes, setPresetModes] = useState([]);

  useEffect(() => {
    fetchPresetModes();
  }, []);

  const fetchPresetModes = async () => {
    const { data, error } = await supabase
      .from('MODO')
      .select('id, nombre')
      .is('id_usuario', null); // solo los predeterminados

    if (error) {
      console.error('Error al obtener modos predeterminados:', error);
    } else {
      setPresetModes(data);
    }
  };

  const renderPresetMode = ({ item, index }) => {
    const locked = index >= 3; // Solo los primeros 3 no están bloqueados
    return (
      <View
        style={[
          styles.modeContainer,
          locked ? styles.lockedContainer : styles.unlockedContainer,
        ]}
      >
        <View style={styles.radioCircle} />
        <Text style={[styles.modeText, locked ? styles.lockedText : styles.unlockedText]}>
          {item.nombre}
        </Text>
        <TouchableOpacity>
          <Text style={[styles.icon, locked && styles.lockedText]}>
            {locked ? '🔒' : '⚙️'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modos predeterminados</Text>
      <FlatList
        data={presetModes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPresetMode}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity style={styles.customizeButton}>
        <View style={styles.radioCircle} />
        <Text style={styles.customizeText}>Personalizar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF5',
    paddingTop: 60,
    paddingHorizontal: 20,
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
    marginTop: 10,
  },
  customizeText: {
    fontSize: 14,
    color: '#0F1C65',
    fontWeight: '500',
    marginLeft: 12,
  },
});

export default PresetModesScreen;

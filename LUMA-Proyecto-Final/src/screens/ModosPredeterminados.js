import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from '../services/supabaseClient';

const PresetModesScreen = () => {
  const [presetModes, setPresetModes] = useState([]);

  useEffect(() => {
    fetchPresetModes();
  }, []);

  const fetchPresetModes = async () => {
    const { data, error } = await supabase
      .from('modes')
      .select('*')
      .eq('is_default', true);

    if (!error) {
      setPresetModes(data);
    }
  };

  const renderPresetMode = ({ item }) => (
    <TouchableOpacity style={styles.modeContainer}>
      <View style={styles.modeContent}>
        <Text style={styles.modeName}>{item.name}</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsButtonText}>⚙️</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={presetModes}
        keyExtractor={(item) => item.id}
        renderItem={renderPresetMode}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingVertical: 20,
  },
  modeContainer: {
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  modeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingsButton: {
    backgroundColor: '#DCDCDC',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  settingsButtonText: {
    fontSize: 16,
  },
});

export default PresetModesScreen;

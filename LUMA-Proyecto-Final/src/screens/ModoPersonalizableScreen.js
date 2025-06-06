import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Slider, TouchableOpacity } from 'react-native';
import { supabase } from '../services/supabaseClient';
import ColorPicker from 'react-native-color-picker';

const CustomizePresetModeScreen = ({ route }) => {
  const { presetModeId } = route.params;
  const [presetMode, setPresetMode] = useState(null);
  const [intensity, setIntensity] = useState(50);
  const [selectedColor, setSelectedColor] = useState('#FF0000');
  const [music, setMusic] = useState(true);
  const [volume, setVolume] = useState(50);
  const [speed, setSpeed] = useState(50);

  useEffect(() => {
    fetchPresetMode();
  }, [presetModeId]);

  const fetchPresetMode = async () => {
    const { data, error } = await supabase
      .from('modes')
      .select('*')
      .eq('id', presetModeId)
      .single();

    if (!error) {
      setPresetMode(data);
      setIntensity(data.intensity);
      setSelectedColor(data.color);
      setMusic(data.music);
      setVolume(data.volume);
      setSpeed(data.speed);
    }
  };

  const savePresetMode = async () => {
    const { error } = await supabase
      .from('modes')
      .update({
        intensity,
        color: selectedColor,
        music,
        volume,
        speed,
      })
      .eq('id', presetModeId);

    if (!error) {
      console.log('Preset mode updated successfully');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Intensidad</Text>
        <Slider
          style={styles.slider}
          value={intensity}
          onValueChange={setIntensity}
          minimumValue={0}
          maximumValue={100}
          step={1}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Color</Text>
        <ColorPicker
          style={styles.colorPicker}
          color={selectedColor}
          onColorChange={setSelectedColor}
          thumbSize={30}
          sliderSize={30}
          noSnap
          row
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Música</Text>
        <TouchableOpacity
          style={[styles.toggleButton, music ? styles.toggleButtonActive : null]}
          onPress={() => setMusic(!music)}>
          <Text style={styles.toggleButtonText}>{music ? 'Activado' : 'Desactivado'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Volumen</Text>
        <Slider
          style={styles.slider}
          value={volume}
          onValueChange={setVolume}
          minimumValue={0}
          maximumValue={100}
          step={1}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Velocidad</Text>
        <Slider
          style={styles.slider}
          value={speed}
          onValueChange={setSpeed}
          minimumValue={0}
          maximumValue={100}
          step={1}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={savePresetMode}>
        <Text style={styles.saveButtonText}>Actualizar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (previous styles)
  colorPicker: {
    height: 200,
  },
});

export default CustomizePresetModeScreen;

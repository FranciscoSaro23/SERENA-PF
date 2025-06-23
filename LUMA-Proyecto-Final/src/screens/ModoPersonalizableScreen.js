import React from 'react';
import { View, Text, Dimensions, StyleSheet, Button } from 'react-native';
const { width } = Dimensions.get('window');

function PersonalizeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personalizar un modo</Text>

      <View style={styles.section}>
        <Text style={styles.label}>NOMBRE DEL MODO</Text>
        <View style={styles.inputBox}>
          <Text style={styles.inputText}>Modo personalizado</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>SELECCIÓN DE COLORES</Text>
        <View style={styles.colorRow}>
          {['red', 'green', 'blue', 'yellow', 'purple'].map((color, index) => (
            <View key={index} style={[styles.colorCircle, { backgroundColor: color }]} />
          ))}
          <View style={styles.addCircle}>
            <Text style={styles.addText}>+</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>BRILLO</Text>
        <View style={styles.brightnessBar} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>VELOCIDAD</Text>
        <View style={styles.speedBar}>
          <View style={styles.speedFill} />
        </View>
      </View>

      <View style={styles.buttonWrapper}>
        <Button title={'CREAR MODO'} style={{ width: '100%' }}> </Button>
      </View>
    </View>
  );
}

export default PersonalizeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFEF5',
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 24,
  },
  section: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: '#6B7280', // gray-500
    marginBottom: 4,
  },
  inputBox: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 8,
  },
  inputText: {
    fontSize: 14,
  },
  colorRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  addCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 12,
    color: '#6B7280',
  },
  brightnessBar: {
    height: 16,
    borderRadius: 999,
    width: '100%',
    backgroundColor: 'blue',
    opacity: 0.5,
  },
  speedBar: {
    height: 16,
    borderRadius: 999,
    width: '100%',
    backgroundColor: '#E5E7EB',
    position: 'relative',
  },
  speedFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '33%',
    backgroundColor: '#0F1170',
    borderRadius: 999,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 64,
    width: '100%',
  },
});



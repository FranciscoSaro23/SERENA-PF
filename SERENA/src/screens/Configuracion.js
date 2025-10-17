import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Navbar from '../shared/Navbar';
import { supabase } from '../services/supabaseClient';

export default function Configuracion({ navigation }) {
  const [sonidos, setSonidos] = useState(true);
  const [silencioso, setSilencioso] = useState(false);

  const handleLogout = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      Alert.alert('Error', 'No has iniciado sesión.');
      return;
    }
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            await supabase.auth.signOut();
            navigation.navigate('Login');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Encabezado */}
        <Text style={styles.titulo}>Configuración</Text>
        <Text style={styles.subtitulo}>Modifica tu experiencia con Serena</Text>

        {/* Vinculación */}
        <View style={styles.row}>
          <Text style={styles.label}>Vinculación</Text>
          <TouchableOpacity style={styles.rowButton}>
            <Text style={styles.link}>Desvincular</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="#161A68" />
          </TouchableOpacity>
        </View>

        {/* Preferencias */}
        <Text style={styles.sectionTitle}>Preferencias de uso</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Activar Sonidos</Text>
          <Switch
            value={sonidos}
            onValueChange={setSonidos}
            trackColor={{ false: '#ccc', true: '#161A68' }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Modo Silencioso</Text>
          <Switch
            value={silencioso}
            onValueChange={setSilencioso}
            trackColor={{ false: '#ccc', true: '#161A68' }}
            thumbColor="#fff"
          />
        </View>

        {/* Temporizador */}
        <View style={styles.row}>
          <Text style={styles.label}>Temporizador</Text>
          <TouchableOpacity style={styles.rowButton}>
            <Text style={styles.link}>10 mins</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="#161A68" />
          </TouchableOpacity>
        </View>

        {/* Idioma */}
        <View style={styles.row}>
          <Text style={styles.label}>Idioma</Text>
          <TouchableOpacity style={styles.rowButton}>
            <Text style={styles.link}>Español</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="#161A68" />
          </TouchableOpacity>
        </View>

        {/* Información */}
        <View style={styles.row}>
          <Text style={styles.label}>Información</Text>
          <TouchableOpacity style={styles.rowButton}>
            <Ionicons name="chevron-forward-outline" size={22} color="#161A68" />
          </TouchableOpacity>
        </View>

        {/* Acciones de cuenta */}
        <View style={[styles.row, styles.accountRow]}>
          <TouchableOpacity>
            <Text style={styles.danger}>Cambiar cuenta</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.danger}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Versión 1.0.0</Text>
      </ScrollView>

      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFFEF5',
  },
  container: {
    padding: 25,
    paddingBottom: 100,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#161A68',
    marginTop: 50,
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 16,
    color: '#4A4A4A',
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#161A68',
    marginTop: 25,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  label: {
    fontSize: 16,
    color: '#161A68',
    fontWeight: '500',
  },
  rowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  link: {
    fontSize: 16,
    color: '#161A68',
    fontWeight: '600',
  },
  danger: {
    fontSize: 16,
    color: '#8E1C2D',
    fontWeight: '700',
  },
  accountRow: {
    borderBottomWidth: 0,
    marginTop: 20,
  },
  footer: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
    marginTop: 40,
  },
});

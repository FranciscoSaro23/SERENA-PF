import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import NavBar from '../shared/Navbar';
import { supabase } from '../services/supabaseClient';

export default function ConfiguracionScreen({ navigation }) {
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
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            await supabase.auth.signOut();
            navigation.navigate('LoginScreen');
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
          <TouchableOpacity>
            <Text style={styles.link}>Desvincular &gt;</Text>
          </TouchableOpacity>
        </View>

        {/* Preferencias de uso */}
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
          <TouchableOpacity>
            <Text style={styles.link}>10 mins &gt;</Text>
          </TouchableOpacity>
        </View>

        {/* Idioma */}
        <View style={styles.row}>
          <Text style={styles.label}>Idioma</Text>
          <TouchableOpacity>
            <Text style={styles.link}>Español &gt;</Text>
          </TouchableOpacity>
        </View>

        {/* Información */}
        <View style={styles.row}>
          <Text style={styles.label}>Información</Text>
          <TouchableOpacity>
            <Text style={styles.link}>&gt;</Text>
          </TouchableOpacity>
        </View>

        {/* Acciones de cuenta */}
        <View style={styles.row}>
          <TouchableOpacity>
            <Text style={styles.danger}>Cambiar cuenta</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.danger}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFFEF5',
  },
  container: {
    padding: 20,
    paddingBottom: 80,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#161A68',
    marginBottom: 5,
    marginTop: 50,
  },
  subtitulo: {
    fontSize: 16,
    color: '#444',
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#161A68',
    marginTop: 15,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
    color: '#161A68',
  },
  link: {
    fontSize: 16,
    color: '#161A68',
    fontWeight: '500',
  },
  danger: {
    fontSize: 16,
    color: '#8E1C2D',
    fontWeight: '600',
  },
});

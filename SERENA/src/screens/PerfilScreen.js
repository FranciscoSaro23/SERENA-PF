import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import NavBar from '../shared/Navbar';
import { supabase } from '../services/supabaseClient';

export default function PerfilScreen() {
  const [userName, setUserName] = useState('Nombre usuario');
  const [userDescription, setUserDescription] = useState('Descripción:');

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserName(session.user.email);
        setUserDescription(`Email: ${session.user.email}`);
      }
    };
    getCurrentUser();
  }, []);

  const handleEditProfile = () => {
    console.log('Editando perfil...');
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Avatar y datos */}
        <View style={styles.profileHeader}>
          <Image
            source={require('../../assets/avatar.jpg')}
            style={styles.avatar}
          />
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userDescription}>{userDescription}</Text>

          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Text style={styles.editButtonText}>Editar perfil</Text>
          </TouchableOpacity>
        </View>

        {/* Opciones del perfil */}
        <Text style={styles.sectionTitle}>Este es tu espacio personal con Serena.</Text>

        <View style={styles.option}>
          <Text style={styles.optionText}>Mi dispositivo</Text>
          <Text style={styles.arrow}>&gt;</Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Preferencias sensoriales</Text>
          <Text style={styles.arrow}>&gt;</Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Estadísticas</Text>
          <Text style={styles.arrow}>&gt;</Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Actividades realizadas</Text>
          <Text style={styles.arrow}>&gt;</Text>
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 12,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#161A68',
    marginBottom: 4,
  },
  userDescription: {
    fontSize: 16,
    color: '#444',
    marginBottom: 12,
  },
  editButton: {
    backgroundColor: '#161A68',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#161A68',
    marginVertical: 15,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#161A68',
  },
  arrow: {
    fontSize: 16,
    color: '#161A68',
    fontWeight: '1000',
  },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function PerfilScreen () {
  const [userName, setUserName] = useState('Nombre usuario');
  const [userAge, setUserAge] = useState('Edad');

  const handleEditProfile = () => {
    console.log('Editando perfil');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.profileHeader}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userAge}>{userAge}</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Text style={styles.editButtonText}>Editar perfil</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mi Serena</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Preferencias sensoriales</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Estadísticas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Actividades realizadas</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userAge: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 14,
  },
});
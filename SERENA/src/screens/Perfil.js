import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, Alert } from 'react-native';
import Navbar from '../shared/Navbar';
import { supabase } from '../services/supabaseClient';

export default function PerfilScreen() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data, error } = await supabase
          .from('PERFILES')
          .select('nombre, apellido, tipo_usuario, fecha_nacimiento')
          .eq('id', session.user.id)
          .single();
        if (data) {
          setNombre(data.nombre || '');
          setApellido(data.apellido || '');
          setTipoUsuario(data.tipo_usuario || '');
          setFechaNacimiento(data.fecha_nacimiento ? data.fecha_nacimiento.split('-').reverse().join('/') : '');
        }
      }
    };
    getCurrentUser();
  }, []);

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const fechaFormatted = fechaNacimiento ? `${fechaNacimiento.split('/')[2]}-${fechaNacimiento.split('/')[1]}-${fechaNacimiento.split('/')[0]}` : null;
      const { error } = await supabase
        .from('PERFILES')
        .update({
          nombre,
          apellido,
          tipo_usuario: tipoUsuario,
          fecha_nacimiento: fechaFormatted,
        })
        .eq('id', session.user.id);
      if (error) {
        Alert.alert('Error', 'No se pudo actualizar el perfil: ' + error.message);
      } else {
        Alert.alert('Éxito', 'Perfil actualizado correctamente');
        setIsEditing(false);
      }
    }
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
          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
              />
              <TextInput
                style={styles.input}
                placeholder="Apellido"
                value={apellido}
                onChangeText={setApellido}
              />
              <TextInput
                style={styles.input}
                placeholder="Tipo de usuario"
                value={tipoUsuario}
                onChangeText={setTipoUsuario}
              />
              <TextInput
                style={styles.input}
                placeholder="Fecha de nacimiento (DD/MM/YYYY)"
                value={fechaNacimiento}
                onChangeText={(text) => {
                  let formatted = text.replace(/\D/g, '');
                  if (formatted.length > 2) formatted = formatted.slice(0,2) + '/' + formatted.slice(2);
                  if (formatted.length > 5) formatted = formatted.slice(0,5) + '/' + formatted.slice(5);
                  if (formatted.length > 10) formatted = formatted.slice(0,10);
                  setFechaNacimiento(formatted);
                }}
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                <Text style={styles.saveButtonText}>Guardar</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.userName}>{nombre} {apellido}</Text>
              <Text style={styles.userDescription}>Tipo: {tipoUsuario}</Text>
              <Text style={styles.userDescription}>Fecha de nacimiento: {fechaNacimiento}</Text>
            </>
          )}

          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Text style={styles.editButtonText}>{isEditing ? 'Cancelar' : 'Editar perfil'}</Text>
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
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#B9D9EB',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0A0D41',
    marginBottom: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

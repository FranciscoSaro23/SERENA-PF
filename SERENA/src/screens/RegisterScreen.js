import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity, Pressable, Image} from 'react-native';
import { supabase } from '../services/supabaseClient';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Registro exitoso', 'Por favor verifica tu email para confirmar tu cuenta.');
      navigation.navigate('LoginScreen');
    }
  };

  return (
    <View style={styles.container}>    
    <Image 
      source={require('../../assets/icon.png')} 
      style={styles.logo} 
      resizeMode="contain"
    />
    <Text style={styles.title}>Registrarse</Text>
    <TextInput
      placeholder="Email"
      style={styles.input}
      onChangeText={setEmail}
      value={email}
      keyboardType="email-address"
      autoCapitalize="none"
    />
    <TextInput
      placeholder="Contraseña"
      style={styles.input}
      secureTextEntry
      onChangeText={setPassword}
      value={password}
    />

    <Pressable style={styles.button} onPress={handleSignUp}>
      <Text style={styles.buttonText}>Registrarse</Text>
    </Pressable>
    
    <Pressable style={styles.link} onPress={() => navigation.navigate('LoginScreen')}>
      <Text style={styles.linkText}>¿Ya tienes cuenta? Iniciar sesión</Text>
    </Pressable>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFF3',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#161A68',
    textAlign: 'center',
    marginBottom: 32,
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
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: '#161A68',      // igual que LoginScreen
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFF3',                // texto blanco
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  link: {
    marginTop: 10,
    alignItems: 'center',
  },
  linkText: {
    color: '#161A68',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  logo: {
    width: 110,
    height: 110,
    alignSelf: 'center',
    marginBottom: 30,
  },
});

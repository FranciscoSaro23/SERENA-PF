import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Alert, Pressable } from 'react-native';
import { supabase } from '../services/supabaseClient';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      // Extract username from email (everything before @)
      const emailUsername = email.split('@')[0];
      Alert.alert('Login exitoso');
      // Navigate to inicioConUsuario screen with the email username
      navigation.navigate('inicioConUsuario', { emailUsername });
    }
  };

  const handleNavigateToRegister = () => {
    navigation.navigate('RegisterScreen');
  };
  const handleNavigateToPerfil = () => {
    navigation.navigate('PerfilScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
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
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>
      <Pressable style={styles.link} onPress={handleNavigateToRegister}>
        <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 16,
    padding: 8,
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginVertical: 8,
  },
  linkText: {
    color: '#007AFF',
    fontSize: 14,
  },
});

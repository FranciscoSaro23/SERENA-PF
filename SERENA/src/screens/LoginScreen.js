import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Alert, Pressable, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import { supabase } from '../services/supabaseClient';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      const emailUsername = email.split('@')[0];
      navigation.navigate('InicioScreen', { emailUsername });
    }
  };

  const handleNavigateToRegister = () => {
    navigation.navigate('RegisterScreen');
  };
  const handleNavigateToPerfil = () => {
    navigation.navigate('PerfilScreen');
  };

  return (
<KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding">
  <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
    <Image
      source={require('../../assets/icon.png')}
      style={styles.logo}
      resizeMode="contain"
    />
    <Text style={styles.title}>Iniciar Sesión</Text>

    <TextInput
      placeholder="Email"
      style={styles.input}
      onChangeText={setEmail}
      value={email}
      keyboardType="email-address"
      autoCapitalize="none"
    />
    <View style={styles.passwordContainer}>
      <TextInput
        placeholder="Contraseña"
        style={[styles.input, { flex: 1, marginBottom: 0 }]}
        secureTextEntry={!isPasswordVisible}
        onChangeText={setPassword}
        value={password}
      />
      <Pressable
        style={styles.toggleButton}
        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        <Text style={styles.toggleButtonText}>
          {isPasswordVisible ? '👁️' : '🙈'}
        </Text>
      </Pressable>
    </View>
    <Pressable style={styles.button} onPress={handleLogin}>
      <Text style={styles.buttonText}>Entrar</Text>
    </Pressable>
    <Pressable style={styles.link} onPress={handleNavigateToRegister}>
      <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
    </Pressable>
  </ScrollView>
</KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleButton: {
    marginLeft: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#161A68',
    borderRadius: 12,
  },
  toggleButtonText: {
    color: '#FFFFF3',
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#161A68',
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
    color: '#FFFFF3',
    fontSize: 18,
    fontWeight: '600',
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

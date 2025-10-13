import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Alert, Pressable, Image, ScrollView, KeyboardAvoidingView} from 'react-native';
import { supabase } from '../services/supabaseClient';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');

  const [errorNombre, setErrorNombre] = useState('');
  const [errorApellido, setErrorApellido] = useState('');
  const [errorTipoUsuario, setErrorTipoUsuario] = useState('');
  const [errorFechaNacimiento, setErrorFechaNacimiento] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  const validateNombre = (text) => {
    if (!text.trim()) {
      setErrorNombre('El nombre es requerido.');
    } else if (!/^[a-zA-Z\s]+$/.test(text)) {
      setErrorNombre('El nombre solo puede contener letras.');
    } else {
      setErrorNombre('');
    }
  };

  const validateApellido = (text) => {
    if (!text.trim()) {
      setErrorApellido('El apellido es requerido.');
    } else if (!/^[a-zA-Z\s]+$/.test(text)) {
      setErrorApellido('El apellido solo puede contener letras.');
    } else {
      setErrorApellido('');
    }
  };

  const validateTipoUsuario = (text) => {
    if (!text.trim()) {
      setErrorTipoUsuario('El tipo de usuario es requerido.');
    } else {
      setErrorTipoUsuario('');
    }
  };

  const validateFechaNacimiento = (text) => {
    if (!text.trim()) {
      setErrorFechaNacimiento('La fecha de nacimiento es requerida.');
    } else {
      const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      const match = text.match(dateRegex);
      if (!match) {
        setErrorFechaNacimiento('Formato inválido. Use DD/MM/YYYY.');
      } else {
        const day = parseInt(match[1], 10);
        const month = parseInt(match[2], 10);
        const year = parseInt(match[3], 10);
        const date = new Date(year, month - 1, day);
        if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
          setErrorFechaNacimiento('Fecha inválida.');
        } else if (year < 1900 || year > new Date().getFullYear()) {
          setErrorFechaNacimiento('Año inválido.');
        } else {
          setErrorFechaNacimiento('');
        }
      }
    }
  };

  const validateEmail = (text) => {
    if (!text.trim()) {
      setErrorEmail('El email es requerido.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
      setErrorEmail('Formato de email inválido.');
    } else {
      setErrorEmail('');
    }
  };

  const isFormValid = !errorNombre && !errorApellido && !errorTipoUsuario && !errorFechaNacimiento && !errorEmail &&
                      nombre.trim() && apellido.trim() && tipoUsuario.trim() && fechaNacimiento.trim() && email.trim();



  return (
    <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Image
          source={require('../../assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Registrarse</Text>
        <TextInput
          placeholder="Nombre"
          style={styles.input}
          onChangeText={(text) => {
            setNombre(text);
            validateNombre(text);
          }}
          value={nombre}
          autoCapitalize="words"
        />
        {errorNombre ? <Text style={styles.errorText}>{errorNombre}</Text> : null}
        <TextInput
          placeholder="Apellido"
          style={styles.input}
          onChangeText={(text) => {
            setApellido(text);
            validateApellido(text);
          }}
          value={apellido}
          autoCapitalize="words"
        />
        {errorApellido ? <Text style={styles.errorText}>{errorApellido}</Text> : null}
        <TextInput
          placeholder="Tutor, Padre, Madre, Doctor, Paciente..."
          style={styles.input}
          onChangeText={(text) => {
            setTipoUsuario(text);
            validateTipoUsuario(text);
          }}
          value={tipoUsuario}
          autoCapitalize="words"
        />
        {errorTipoUsuario ? <Text style={styles.errorText}>{errorTipoUsuario}</Text> : null}
        <TextInput
          placeholder="DD/MM/YYYY"
          style={styles.input}
          onChangeText={(text) => {
            let formatted = text.replace(/\D/g, '');
            if (formatted.length > 2) formatted = formatted.slice(0,2) + '/' + formatted.slice(2);
            if (formatted.length > 5) formatted = formatted.slice(0,5) + '/' + formatted.slice(5);
            if (formatted.length > 10) formatted = formatted.slice(0,10);
            setFechaNacimiento(formatted);
            validateFechaNacimiento(formatted);
          }}
          value={fechaNacimiento}
          keyboardType="numeric"
        />
        {errorFechaNacimiento ? <Text style={styles.errorText}>{errorFechaNacimiento}</Text> : null}
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={(text) => {
            setEmail(text);
            validateEmail(text);
          }}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errorEmail ? <Text style={styles.errorText}>{errorEmail}</Text> : null}

        <Pressable style={[styles.button, !isFormValid && styles.buttonDisabled]} onPress={() => isFormValid && navigation.navigate('RegisterPasswordScreen', { nombre, apellido, tipoUsuario, fechaNacimiento, email })} disabled={!isFormValid}>
          <Text style={styles.buttonText}>Siguiente</Text>
        </Pressable>

        <Pressable style={styles.link} onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.linkText}>¿Ya tienes cuenta? Iniciar sesión</Text>
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
    paddingBottom: 40,
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
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: '#161A68',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
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
  buttonDisabled: {
    backgroundColor: '#B9D9EB',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 14,
    marginBottom: 16,
    marginTop: -16,
  },
  link: {
    marginTop: 20,
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

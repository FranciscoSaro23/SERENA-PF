import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity, Pressable, Image, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import { supabase } from '../services/supabaseClient';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [telefono, setTelefono] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      const user = data.user;
      if (user) {
        const { error: insertError } = await supabase.from('perfiles').insert({
          id: user.id,
          nombre,
          apellido,
          tipo_usuario: tipoUsuario,
          fecha_nacimiento: fechaNacimiento ? `${fechaNacimiento.split('/')[2]}-${fechaNacimiento.split('/')[1]}-${fechaNacimiento.split('/')[0]}` : null,
          telefono,
        });
        if (insertError) {
          Alert.alert('Error', 'Registro exitoso pero error al guardar perfil: ' + insertError.message);
        } else {
          Alert.alert('Registro exitoso', 'Por favor verifica tu email para confirmar tu cuenta.');
          navigation.navigate('LoginScreen');
        }
      }
    }
  };

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
          onChangeText={setNombre}
          value={nombre}
          autoCapitalize="words"
        />
        <TextInput
          placeholder="Apellido"
          style={styles.input}
          onChangeText={setApellido}
          value={apellido}
          autoCapitalize="words"
        />
        <TextInput
          placeholder="Tutor, Padre, Madre, Doctor, Paciente..."
          style={styles.input}
          onChangeText={setTipoUsuario}
          value={tipoUsuario}
          autoCapitalize="words"
        />
        <TextInput
          placeholder="DD/MM/YYYY"
          style={styles.input}
          onChangeText={(text) => {
            let formatted = text.replace(/\D/g, '');
            if (formatted.length > 2) formatted = formatted.slice(0,2) + '/' + formatted.slice(2);
            if (formatted.length > 5) formatted = formatted.slice(0,5) + '/' + formatted.slice(5);
            if (formatted.length > 10) formatted = formatted.slice(0,10);
            setFechaNacimiento(formatted);
          }}
          value={fechaNacimiento}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Teléfono"
          style={styles.input}
          onChangeText={setTelefono}
          value={telefono}
          keyboardType="phone-pad"
        />
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
            style={styles.passwordInput}
            secureTextEntry={!showPassword}
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={togglePasswordVisibility}
          >
            <Image
              source={showPassword ? require('../../assets/ver.png') : require('../../assets/ojo-cerrado.png')}
              style={styles.eyeImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Confirmar Contraseña"
            style={styles.passwordInput}
            secureTextEntry={!showConfirmPassword}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={toggleConfirmPasswordVisibility}
          >
            <Image
              source={showConfirmPassword ? require('../../assets/ver.png') : require('../../assets/ojo-cerrado.png')}
              style={styles.eyeImage}
            />
          </TouchableOpacity>
        </View>

        <Pressable style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Registrarse</Text>
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
  inputContainer: {
    marginBottom: 20,
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
  passwordContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  passwordInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#B9D9EB',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0A0D41',
    paddingRight: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -12 }],
    padding: 5,
  },
  eyeImage: {
    width: 24,
    height: 24,
  },
});

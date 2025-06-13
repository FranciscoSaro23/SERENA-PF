import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { NavBar } from '../shared/NavBar'
export function ConfigScreen() {
  return (
    <div className="h-full bg-[#FFFEF5] flex flex-col items-center px-6 pt-10 relative">
      <h1 className="text-lg font-medium text-center mb-6">Configuración</h1>
      <p className="text-xs text-gray-500 text-center mb-6">
        Modifica tu experiencia con Luma
      </p>
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Notificaciones</span>
          <div className="w-10 h-6 bg-[#0F1170] rounded-full relative p-0.5">
            <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Activar Bluetooth</span>
          <div className="w-10 h-6 bg-gray-300 rounded-full relative p-0.5">
            <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Modo Vibración</span>
          <div className="w-10 h-6 bg-[#0F1170] rounded-full relative p-0.5">
            <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Idioma</span>
          <div className="flex items-center">
            <span className="text-xs text-gray-500 mr-2">Español</span>
            <span className="text-gray-400">▼</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Información</span>
          <span className="text-gray-400">›</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Cambiar cuenta</span>
          <span className="text-gray-400">›</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-red-500">Cerrar Sesión</span>
        </div>
      </div>
      <NavBar />
    </div>
  )
}


const ConfigurationScreen = () => {
  const [isSoundActive, setIsSoundActive] = useState(true);
  const [isSilentModeActive, setIsSilentModeActive] = useState(false);
  const [language, setLanguage] = useState('Español');

  const handleSoundToggle = () => {
    setIsSoundActive(!isSoundActive);
  };

  const handleSilentModeToggle = () => {
    setIsSilentModeActive(!isSilentModeActive);
  };

  const handleLanguageChange = () => {
    setLanguage(language === 'Español' ? 'English' : 'Español');
  };

  const handleLogout = () => {
    // Implement logout functionality here
    console.log('Logged out');
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferencias de uso</Text>
        <View style={styles.optionContainer}>
          <Text>Activar Sonidos</Text>
          <Switch
            value={isSoundActive}
            onValueChange={handleSoundToggle}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isSoundActive ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
        <View style={styles.optionContainer}>
          <Text>Modo Silencioso</Text>
          <Switch
            value={isSilentModeActive}
            onValueChange={handleSilentModeToggle}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isSilentModeActive ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Idioma</Text>
        <TouchableOpacity style={styles.optionContainer} onPress={handleLanguageChange}>
          <Text>{language}</Text>
          <Text>{'>'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
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
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignSelf: 'center',
    marginTop: 24,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ConfigurationScreen;

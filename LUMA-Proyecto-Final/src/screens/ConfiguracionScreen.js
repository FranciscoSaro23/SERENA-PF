import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

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

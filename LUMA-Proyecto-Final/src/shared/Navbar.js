// src/shared/NavBar.js
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

export default function NavBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('ConfiguracionScreen')}>
        <Ionicons name="settings-sharp" size={32} color="#151F6D" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ModosPredeterminadosScreen')}>
        <Feather name="edit-3" size={32} color="#151F6D" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('InicioScreen')}>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.logo}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('AyudaScreen')}>
        <Ionicons name="notifications-outline" size={32} color="#151F6D" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('PerfilScreen')}>
        <MaterialIcons name="account-circle" size={32} color="#151F6D" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#BCD9EA',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopColor: '#151F6D',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

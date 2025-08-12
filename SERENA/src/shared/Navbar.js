import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

export default function NavBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.navbarContainer}>
      <View style={styles.sideButtons}>
        <TouchableOpacity onPress={() => navigation.navigate('ConfiguracionScreen')}>
          <Ionicons name="settings-sharp" size={34} color="#151F6D" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('ModosPredeterminadosScreen')}>
          <Feather name="edit-3" size={34} color="#151F6D" />
        </TouchableOpacity>
      </View>

      <View style={styles.inicioButtonWrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate('InicioScreen')}
          style={styles.inicioButton}
        >
          <View style={styles.inicioIconWrapper}>
            <Image
              source={require('../../assets/icon.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.activeUnderline} />
        </TouchableOpacity>
      </View>

      <View style={styles.sideButtons}>
        <TouchableOpacity onPress={() => navigation.navigate('AyudaScreen')}>
          <Ionicons name="notifications-outline" size={34} color="#151F6D" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <MaterialIcons name="account-circle" size={34} color="#151F6D" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    width: '100%',
    backgroundColor: '#BCD9EA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 40,
    paddingTop: 15,
    paddingBottom: 15,
    borderTopColor: '#151F6D',
    position: 'relative',
  },
  sideButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 50,
  },
  inicioButtonWrapper: {
    position: 'absolute',
    top: -34, // eleva el botón
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  inicioButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inicioIconWrapper: {
    width: 75,
    height: 75,
    backgroundColor: '#FFFFF3',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  logo: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
  },
});

import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { supabase } from '../services/supabaseClient';

// Obtenemos el ancho de la pantalla
const { width } = Dimensions.get('window');

export default function Navbar() {
  const navigation = useNavigation();
  const route = useRoute();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user?.email) {
        setUserEmail(data.user.email);
      } else {
        setUserEmail(null);
      }
    };
    fetchUser();
  }, []);

  const handleInicioPress = () => {
    if (userEmail) {
      const emailUsername = userEmail.split('@')[0];
      navigation.navigate('Inicio', { emailUsername });
    } else {
      navigation.navigate('Inicio');
    }
  };

  const handleLoginPress = () => {
    if (userEmail) {
      navigation.navigate('Perfil');
    } else {
      navigation.navigate('Login');
    }
  };

  // Cambiar color según la pantalla
  const navbarBackgroundColor =
    route.name === 'Ayuda' ? '#FFFFF6' : '#B9D9EB';

  return (
    <View style={[styles.navbarContainer, { backgroundColor: navbarBackgroundColor }]}>
      {/* Botones del lado izquierdo */}
      <View style={styles.sideButtons}>
        <TouchableOpacity onPress={() => navigation.navigate('Configuracion')}>
          <Ionicons name="settings-sharp" size={width * 0.09} color="#0A0D41" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Modos')}>
          <Feather name="edit-3" size={width * 0.085} color="#0A0D41" />
        </TouchableOpacity>
      </View>

      {/* Botón central */}
      <View style={styles.inicioButtonWrapper} pointerEvents="box-none">
        <TouchableOpacity
          onPress={handleInicioPress}
          style={styles.inicioButton}
          activeOpacity={0.8}
        >
          <View style={styles.inicioIconWrapper}>
            <Image
              source={require('../../assets/icon.png')}
              style={styles.logo}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Botones del lado derecho */}
      <View style={styles.sideButtons}>
        <TouchableOpacity onPress={() => navigation.navigate('Ayuda')}>
          <Ionicons name="help-circle-outline" size={width * 0.1} color="#0A0D41" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLoginPress}>
          <MaterialIcons name="account-circle" size={width * 0.09} color="#0A0D41" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: width * 0.07, // relativo al ancho
    paddingTop: width * 0.02,
    paddingBottom: width * 0.04,
    borderTopColor: '#0A0D41',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 15,
    zIndex: 1,
  },
  sideButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: width * 0.1, // separación proporcional
  },
  inicioButtonWrapper: {
    position: 'absolute',
    top: -width * 0.09, // eleva según tamaño de pantalla
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    pointerEvents: 'box-none',
  },
  inicioButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inicioIconWrapper: {
    width: width * 0.2,
    height: width * 0.2,
    backgroundColor: '#FFFFF3',
    borderRadius: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  logo: {
    width: width * 0.15,
    height: width * 0.15,
    resizeMode: 'contain',
  },
});

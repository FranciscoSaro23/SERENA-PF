import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { supabase } from '../services/supabaseClient'; 

export default function NavBar() {
  const navigation = useNavigation();
  const route = useRoute(); // 👈 detecta la screen actual
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
      navigation.navigate('InicioScreen', { emailUsername });
    } else {
      navigation.navigate('InicioScreen');
    }
  };

  const handleLoginPress = () => {
    if (userEmail) {
      navigation.navigate('PerfilScreen');
    } else {
      navigation.navigate('LoginScreen');
    }
  };

  // 👇 Cambia el color según la pantalla actual
  const navbarBackgroundColor =
    route.name === 'AyudaScreen' ? '#FFFFF6' : '#B9D9EB'; // elegí el color que quieras

  return (
    <View style={[styles.navbarContainer, { backgroundColor: navbarBackgroundColor }]}>
      {/* Botones del lado izquierdo */}
      <View style={styles.sideButtons}>
        <TouchableOpacity onPress={() => navigation.navigate('ConfiguracionScreen')}>
          <Ionicons name="settings-sharp" size={40} color="#0A0D41" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ModosPredeterminadosScreen')}>
          <Feather name="edit-3" size={38} color="#0A0D41" />
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
        <TouchableOpacity onPress={() => navigation.navigate('AyudaScreen')}>
          <Ionicons name="help-circle-outline" size={46} color="#0A0D41" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLoginPress}>
          <MaterialIcons name="account-circle" size={40} color="#0A0D41" />
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
    paddingHorizontal: 30,
    paddingTop: 8,
    paddingBottom: 18,
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
    gap: 45,
  },
  inicioButtonWrapper: {
    position: 'absolute',
    top: -38,
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
    width: 80,
    height: 80,
    backgroundColor: '#FFFFF3',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});

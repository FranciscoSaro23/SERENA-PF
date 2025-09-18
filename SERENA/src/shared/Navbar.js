import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { supabase } from '../services/supabaseClient';

export default function NavBar() {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
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

  return (
    <View style={styles.navbarContainer}>
      <View style={styles.sideButtons}>
        <TouchableOpacity onPress={() => navigation.navigate('ConfiguracionScreen')}>
          <Ionicons name="settings-sharp" size={37} color="#0A0D41" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('ModosPredeterminadosScreen')}>
          <Feather name="edit-3" size={37} color="#0A0D41" />
        </TouchableOpacity>
      </View>

      <View style={styles.inicioButtonWrapper}>
        <TouchableOpacity
          onPress={handleInicioPress}
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
          <Ionicons name="notifications-outline" size={37} color="#0A0D41" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <MaterialIcons name="account-circle" size={37} color="#0A0D41" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    width: '100%',
    backgroundColor: '#B9D9EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 40,
    paddingTop: 15,
    paddingBottom: 20,
    borderTopColor: '#0A0D41',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  sideButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 50,
  },
  inicioButtonWrapper: {
    position: 'absolute',
    top: -37, // eleva el botón
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

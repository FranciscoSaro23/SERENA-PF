import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { supabase } from '../services/supabaseClient';
import { useNavigation } from '@react-navigation/native';

export default function ConfiguracionScreen() {
    return (
        <View>
        <Text>
          Configuración
        </Text>
      <NavBar />
    </View>
    );
}
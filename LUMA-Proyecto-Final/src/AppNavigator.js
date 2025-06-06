import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import ConfiguracionScreen from './screens/ConfiguracionScreen';
import AyudaScreen from './screens/AyudaScreen';
import PerfilScreen from './screens/PerfilScreen';
import ModosPredeterminadosScreen from './screens/ModosPredeterminados';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Configuracion" component={ConfiguracionScreen} />
        {<Stack.Screen name="ModosPredeterminados" component={ModosPredeterminadosScreen} />}
        {/* icono luma */}
        <Stack.Screen name="Ayuda" component={AyudaScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

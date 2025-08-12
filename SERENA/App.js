import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PredeterminadosScreen from './src/screens/ModosPredeterminados';
import PersonalizarScreen from './src/screens/ModoPersonalizableScreen';
import AgregarCancionScreen from './src/screens/AgregarCancionScreen';
import InicioScreen from './src/screens/InicioScreen';
import LoginScreen from './src/screens/LoginScreen';
import ConfiguracionScreen from './src/screens/ConfiguracionScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ModosPredeterminadosScreen" component={PredeterminadosScreen} />
        <Stack.Screen name="ModoPersonalizableScreen" component={PersonalizarScreen} />
        <Stack.Screen name="AgregarCancionScreen" component={AgregarCancionScreen} />
        <Stack.Screen name="InicioScreen" component={InicioScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="ConfiguracionScreen" component={ConfiguracionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
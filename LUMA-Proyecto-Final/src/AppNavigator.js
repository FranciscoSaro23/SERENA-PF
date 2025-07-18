import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PredeterminadosScreen from './screens/ModosPredeterminados';
import PersonalizarScreen from './screens/ModoPersonalizableScreen';
import AgregarCancionScreen from './screens/AgregarCancionScreen';
import InicioScreen from './screens/InicioScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ModosPredeterminadosScreen" component={PredeterminadosScreen} />
        <Stack.Screen name="ModoPersonalizableScreen" component={PersonalizarScreen} />
        <Stack.Screen name="AgregarCancionScreen" component={AgregarCancionScreen} />
        <Stack.Screen name="InicioScreen" component={InicioScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ModosPredeterminadosScreen from './screens/ModosPredeterminados';
import PersonalizarScreen from './screens/ModoPersonalizableScreen';
import AgregarCancionScreen from './screens/AgregarCancionScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ModosPredeterminadosScreen" component={ModosPredeterminadosScreen} />
        <Stack.Screen name="ModoPersonalizableScreen" component={PersonalizarScreen} />
        <Stack.Screen name="AgregarCancionScreen" component={AgregarCancionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// initialRouteName="Splash" screenOptions={{ headerShown: false }
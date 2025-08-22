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
      <Stack.Screen name="ModosPredeterminadosScreen" component={PredeterminadosScreen} options={{ headerTitle: '', headerBackTitleVisible: false }}/>
        <Stack.Screen name="ModoPersonalizableScreen" component={PersonalizarScreen} options={{ headerTitle: '', headerBackTitleVisible: false }}/>
        <Stack.Screen name="AgregarCancionScreen" component={AgregarCancionScreen} options={{ headerTitle: '', headerBackTitleVisible: false }}/>
        <Stack.Screen name="InicioScreen" component={InicioScreen} options={{ headerTitle: '', headerBackTitleVisible: false }}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerTitle: '', headerBackTitleVisible: false }}/>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerTitle: '', headerBackTitleVisible: false }}/>
        <Stack.Screen name="ConfiguracionScreen" component={ConfiguracionScreen} options={{ headerTitle: '', headerBackTitleVisible: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
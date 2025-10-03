import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PredeterminadosScreen from './src/screens/ModosPredeterminados';
import PersonalizarScreen from './src/screens/ModoPersonalizableScreen';
import AgregarCancionScreen from './src/screens/AgregarCancionScreen';
import InicioScreen from './src/screens/InicioScreen';
import LoginScreen from './src/screens/LoginScreen';
import ConfiguracionScreen from './src/screens/ConfiguracionScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import AyudaScreen from './src/screens/AyudaScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#161A68' }, // azul oscuro
        tabBarStyle: { backgroundColor: '#E0F7FA' }, // celeste
        tabBarActiveTintColor: '#161A68',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={InicioScreen}
        options={{
          headerTitle: 'Inicio',
          headerLeft: () => null, // 👈 sin botón back
        }}
      />
      <Tab.Screen
        name="Modos"
        component={PredeterminadosScreen}
        options={{
          headerTitle: 'Modos Predeterminados',
          headerLeft: () => null,
        }}
      />
      <Tab.Screen
        name="Config"
        component={ConfiguracionScreen}
        options={{
          headerTitle: 'Configuración',
          headerLeft: () => null,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          headerTitle: 'Mi Perfil',
          headerLeft: () => null,
        }}
      />
      <Tab.Screen
        name="Ayuda"
        component={AyudaScreen}
        options={{
          headerTitle: 'Ayuda',
          headerLeft: () => null,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
          headerShown: false,
        }}>
      <Stack.Screen name="ModosPredeterminadosScreen" component={PredeterminadosScreen} options={{ headerTitle: '', headerBackTitleVisible: false, headerLeft: null }}/>
        <Stack.Screen name="ModoPersonalizableScreen" component={PersonalizarScreen} options={{ headerTitle: '', headerBackTitleVisible: false, headerLeft: null }}/>
        <Stack.Screen name="AgregarCancionScreen" component={AgregarCancionScreen} options={{ headerTitle: '', headerBackTitleVisible: false, headerLeft: null }}/>
        <Stack.Screen name="InicioScreen" component={InicioScreen} options={{ headerTitle: '', headerBackTitleVisible: false, headerLeft: null }}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerTitle: '', headerBackTitleVisible: false, headerLeft: null }}/>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerTitle: '', headerBackTitleVisible: false, headerLeft: null }}/>
        <Stack.Screen name="ConfiguracionScreen" component={ConfiguracionScreen} options={{ headerTitle: '', headerBackTitleVisible: false, headerLeft: null }}/>
        <Stack.Screen name="PerfilScreen" component={PerfilScreen} options={{ headerTitle: '', headerBackTitleVisible: false, headerLeft: null }}/>
        <Stack.Screen name="AyudaScreen" component={AyudaScreen} options={{ headerTitle: '', headerBackTitleVisible: false, headerLeft: null }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

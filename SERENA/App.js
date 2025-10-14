import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Modos from './src/screens/Modos';
import ModoPersonalizable from './src/screens/ModoPersonalizable';
import AgregarCancion from './src/screens/AgregarCancion';
import Inicio from './src/screens/Inicio';
import Login from './src/screens/Login';
import Configuracion from './src/screens/Configuracion';
import Registro from './src/screens/Registro';
import RegistroContrasenia from './src/screens/RegistroContrasenia';
import Perfil from './src/screens/Perfil';
import Ayuda from './src/screens/Ayuda';

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
        component={Inicio}
        options={{
          headerTitle: 'Inicio',
          headerLeft: () => null,
        }}
      />
      <Tab.Screen
        name="Modos"
        component={ModoPersonalizable}
        options={{
          headerTitle: 'Modos Predeterminados',
          headerLeft: () => null,
        }}
      />
      <Tab.Screen
        name="Config"
        component={Configuracion}
        options={{
          headerTitle: 'Configuración',
          headerLeft: () => null,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          headerTitle: 'Mi Perfil',
          headerLeft: () => null,
        }}
      />
      <Tab.Screen
        name="Ayuda"
        component={Ayuda}
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
      <Stack.Screen name="Inicio" component={Inicio} options={{ headerTitle: '', headerBackTitleVisible: false, headerLeft: null }}/>
        <Stack.Screen name="Modos" component={Modos} options={{ headerTitle: '', headerBackTitleVisible: false, headerLeft: null }}/>
        <Stack.Screen name="ModoPersonalizable" component={ModoPersonalizable} options={{ headerTitle: '', headerBackTitleVisible: false, headerLeft: null }}/>
        <Stack.Screen name="AgregarCancion" component={AgregarCancion} options={{ headerTitle: '', headerBackTitleVisible: false, headerLeft: null }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerTitle: '', headerBackTitleVisible: false, headerLeft: null }}/>
        <Stack.Screen name="Registro" component={Registro} options={{ headerTitle: '', headerBackTitleVisible: false, headerLeft: null }}/>
        <Stack.Screen name="RegistroContrasenia" component={RegistroContrasenia} options={{ headerTitle: '', headerBackTitleVisible: false, headerLeft: null }}/>
        <Stack.Screen name="Configuracion" component={Configuracion} options={{ headerTitle: '', headerBackTitleVisible: false, headerLeft: null }}/>
        <Stack.Screen name="Perfil" component={Perfil} options={{ headerTitle: '', headerBackTitleVisible: false, headerLeft: null }}/>
        <Stack.Screen name="Ayuda" component={Ayuda} options={{ headerTitle: '', headerBackTitleVisible: false, headerLeft: null }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
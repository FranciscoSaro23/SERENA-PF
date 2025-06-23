import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import ConfiguracionScreen from './screens/ConfiguracionScreen';
import ModosPredeterminadosScreen from './screens/ModosPredeterminados';
import RegisterScreen from './screens/RegisterScreen.js';
import AyudaScreen from './screens/AyudaScreen.js';
import PerfilScreen from './screens/PerfilScreen.js';
import PersonalizeScreen from './screens/ModoPersonalizableScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ModosPredeterminadosScreen" component={ModosPredeterminadosScreen} />
        <Stack.Screen name="ModoPersonalizableScreen" component={PersonalizeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// initialRouteName="Splash" screenOptions={{ headerShown: false }

/*<Stack.Screen name="Splash" component={SplashScreen} />
         <Stack.Screen name="Login" component={LoginScreen} />
         <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
         <Stack.Screen name="ConfiguracionScreen" component={ConfiguracionScreen} />
         {/* icono luma */
/*         <Stack.Screen name="AyudaScreen" component={AyudaScreen} />
     <Stack.Screen name="PerfilScreen" component={PerfilScreen} /> */
import { Alert, Platform } from 'react-native';
import { BleManagerModule } from 'react-native-ble-plx';
import { PermissionsModule } from 'react-native-permissions';

export const validateBluetooth = async () => {
  Alert.alert('11');
  const { BleManager } = BleManagerModule;
  Alert.alert('22');
   const manager = new BleManager();
   Alert.alert('33');
  try {
    if (Platform.OS === 'web') {
    
      // On web, Bluetooth is not supported, so return false
      Alert.alert('Error', 'Esta funcionalidad no está disponible en la versión web.');
      return false;
    }
    
    // Dynamic imports to avoid loading native modules on web
    Alert.alert('6');
  
    const { request, PERMISSIONS, RESULTS } = PermissionsModule;
    
    Alert.alert('666');
    // Revisar estado del Bluetooth
    const state = await manager.state();
    Alert.alert('7', state);
    if (state !== 'PoweredOn') {
      Alert.alert(
        'Bluetooth apagado',
        'Por favor, enciende el Bluetooth para continuar.',
      );
      
      return false;
    }

    // Solicitar permisos (Android 12+)
    if (Platform.OS === 'android') {
      const connectStatus = await request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
      const scanStatus = await request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
      const locationStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (
        connectStatus !== RESULTS.GRANTED ||
        scanStatus !== RESULTS.GRANTED ||
        locationStatus !== RESULTS.GRANTED
      ) {
        Alert.alert(
          'Permisos insuficientes',
          'La app necesita permisos de Bluetooth y ubicación para funcionar.',
        );
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error validating Bluetooth:', error);
    Alert.alert('Error', 'Error al verificar Bluetooth.');
    return false;
  } finally {
    // Clean up manager if it was created
    if (typeof manager !== 'undefined') {
      manager.destroy();
    }
  }
};

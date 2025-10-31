import { Alert, Platform } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const validateBluetooth = async () => {
  const manager = new BleManager();

  try {
    // Caso web
    if (Platform.OS === 'web') {
      Alert.alert('Error', 'Esta funcionalidad no está disponible en la versión web.');
      return false;
    }

    // Revisar estado del Bluetooth
    const state = await manager.state();
    if (state !== 'PoweredOn') {
      Alert.alert('Bluetooth apagado', 'Por favor, enciende el Bluetooth para continuar.');
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
          'La app necesita permisos de Bluetooth y ubicación para funcionar.'
        );
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error al validar Bluetooth:', error);
    Alert.alert('Error', 'Ocurrió un error al verificar Bluetooth.');
    return false;
  } finally {
    manager.destroy();
  }
};
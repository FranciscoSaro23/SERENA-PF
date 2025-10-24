import React, { useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const BluetoothValidator = () => {
  const manager = new BleManager();

  useEffect(() => {
    const validateBluetooth = async () => {
      // 1️⃣ Revisar estado del Bluetooth
      const state = await manager.state();
      if (state !== 'PoweredOn') {
        Alert.alert(
          'Bluetooth apagado',
          'Por favor, enciende el Bluetooth para continuar.',
        );
        return;
      }

      // 2️⃣ Solicitar permisos (Android 12+)
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
          return;
        }
      }

      Alert.alert('Bluetooth OK', 'Bluetooth está activado y permisos concedidos');
    };

    validateBluetooth();

    // Limpiar manager al desmontar
    return () => manager.destroy();
  }, []);

  return null;
};

export default BluetoothValidator;
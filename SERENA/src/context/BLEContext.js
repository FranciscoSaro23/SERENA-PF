import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert, Platform, PermissionsAndroid } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const BLEContext = createContext();
const manager = new BleManager();

export const BLEProvider = ({ children }) => {
  const [isBluetoothOn, setIsBluetoothOn] = useState(false);

  useEffect(() => {
    verifyBluetoothState()
  }, []);

  const checkPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);

        const allGranted = Object.values(granted).every(
          (status) => status === PermissionsAndroid.RESULTS.GRANTED
        );

        if (!allGranted) {
          Alert.alert('Permisos requeridos', 'Debes aceptar los permisos Bluetooth para continuar.');
          return false;
        }
      } catch (error) {
        console.error('Error verificando permisos:', error);
        return false;
      }
    }
    return true;
  };

  const verifyBluetoothState = async () => {
    const permissionsOk = await checkPermissions();
    if (!permissionsOk) return false;

    const state = await manager.state();
    if (state === 'PoweredOn') {
      setIsBluetoothOn(true);
      Alert.alert('Bluetooth', 'El Bluetooth está encendido ✅');
    } else {
      setIsBluetoothOn(false);
      Alert.alert('Bluetooth', 'El Bluetooth está apagado ❌. Enciéndelo para continuar.');
    }
  };

  return (
    <BLEContext.Provider value={{ isBluetoothOn, verifyBluetoothState }}>
      {children}
    </BLEContext.Provider>
  );
};

export const useBLE = () => useContext(BLEContext);

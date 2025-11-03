import { useEffect, useState } from "react";
import { BleManager } from "react-native-ble-plx";
import { PermissionsAndroid, Platform } from "react-native";
import * as ExpoDevice from "expo-device";

const bleManager = new BleManager();

// ---- PERMISOS ----
const requestAndroid31Permissions = async () => {
  const bluetoothScanPermission = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    {
      title: "Bluetooth Permission",
      message: "Bluetooth Low Energy requires Bluetooth Scan permission.",
      buttonPositive: "OK",
    }
  );

  const bluetoothConnectPermission = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    {
      title: "Bluetooth Permission",
      message: "Bluetooth Low Energy requires Bluetooth Connect permission.",
      buttonPositive: "OK",
    }
  );

  const fineLocationPermission = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: "Location Permission",
      message: "Bluetooth Low Energy requires Location permission.",
      buttonPositive: "OK",
    }
  );

  return (
    bluetoothScanPermission === "granted" &&
    bluetoothConnectPermission === "granted" &&
    fineLocationPermission === "granted"
  );
};

const requestPermissions = async () => {
  if (Platform.OS === "android") {
    if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "Bluetooth Low Energy requires Location permission.",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const isGranted = await requestAndroid31Permissions();
      return isGranted;
    }
  } else {
    // iOS lo maneja automáticamente
    return true;
  }
};

// ---- HOOK ----
export const useBLE = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);

  useEffect(() => {
    return () => {
      bleManager.destroy();
    };
  }, []);

  const scanForDevices = async () => {
    const permission = await requestPermissions();
    if (!permission) {
      console.log("Bluetooth permission not granted");
      return;
    }

    setIsScanning(true);
    setDevices([]);

    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error("Scan error:", error);
        setIsScanning(false);
        return;
      }

      if (device && !devices.find((d) => d.id === device.id)) {
        setDevices((prev) => [...prev, device]);
      }
    });

    // Detener el escaneo después de 10 segundos
    setTimeout(() => {
      bleManager.stopDeviceScan();
      setIsScanning(false);
    }, 10000);
  };

  const connectToDevice = async (device) => {
    try {
      const connected = await bleManager.connectToDevice(device.id);
      await connected.discoverAllServicesAndCharacteristics();
      setConnectedDevice(connected);
      console.log("Connected to:", connected.name || connected.id);
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  const disconnectDevice = async () => {
    if (connectedDevice) {
      await bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
    }
  };

  return {
    scanForDevices,
    connectToDevice,
    disconnectDevice,
    devices,
    isScanning,
    connectedDevice,
  };
};
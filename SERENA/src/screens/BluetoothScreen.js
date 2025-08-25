import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import { BleManager } from "react-native-ble-plx";

const manager = new BleManager();

export default function BluetoothScreen() {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);

  useEffect(() => {
    return () => {
      manager.destroy();
    };
  }, []);

  const scanForDevices = () => {
    setDevices([]);
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log("Scan error:", error);
        return;
      }
      if (device && !devices.find(d => d.id === device.id)) {
        setDevices(prev => [...prev, device]);
      }
    });

    // detener escaneo a los 10s
    setTimeout(() => manager.stopDeviceScan(), 10000);
  };

  const connectToDevice = async (device) => {
    try {
      const connected = await manager.connectToDevice(device.id);
      await connected.discoverAllServicesAndCharacteristics();
      setConnectedDevice(connected);
      console.log("Conectado a:", connected.name || connected.id);
    } catch (e) {
      console.log("Error al conectar:", e);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Buscar dispositivos" onPress={scanForDevices} />
      {connectedDevice ? (
        <Text style={{ marginTop: 20 }}>Conectado a: {connectedDevice.name || connectedDevice.id}</Text>
      ) : (
        <FlatList
          style={{ marginTop: 20 }}
          data={devices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => connectToDevice(item)}>
              <Text style={{ padding: 10, borderBottomWidth: 1 }}>
                {item.name || "Sin nombre"} ({item.id})
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

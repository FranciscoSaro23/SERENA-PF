import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useBLE } from '../hooks/useBLE';

const BLE = () => {
  const { scanForDevices, connectToDevice, disconnectDevice, devices, isScanning, connectedDevice } = useBLE();

  const handleConnect = async (device) => {
    try {
      await connectToDevice(device);
      Alert.alert('Conectado', `Conectado a ${device.name || device.id}`);
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar al dispositivo');
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectDevice();
      Alert.alert('Desconectado', 'Dispositivo desconectado');
    } catch (error) {
      Alert.alert('Error', 'No se pudo desconectar');
    }
  };

  const renderDevice = ({ item }) => (
    <View style={styles.deviceContainer}>
      <Text style={styles.deviceName}>{item.name || 'Dispositivo desconocido'}</Text>
      <Text style={styles.deviceId}>{item.id}</Text>
      <TouchableOpacity
        style={styles.connectButton}
        onPress={() => handleConnect(item)}
      >
        <Text style={styles.buttonText}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dispositivos BLE</Text>
      <TouchableOpacity
        style={[styles.scanButton, isScanning && styles.scanningButton]}
        onPress={scanForDevices}
        disabled={isScanning}
      >
        <Text style={styles.buttonText}>
          {isScanning ? 'Escaneando...' : 'Escanear Dispositivos'}
        </Text>
      </TouchableOpacity>
      {connectedDevice && (
        <View style={styles.connectedContainer}>
          <Text style={styles.connectedText}>
            Conectado a: {connectedDevice.name || connectedDevice.id}
          </Text>
          <TouchableOpacity
            style={styles.disconnectButton}
            onPress={handleDisconnect}
          >
            <Text style={styles.buttonText}>Desconectar</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={renderDevice}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  scanButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  scanningButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  connectedContainer: {
    backgroundColor: '#d4edda',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  connectedText: {
    fontSize: 16,
    color: '#155724',
  },
  disconnectButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  list: {
    flex: 1,
  },
  deviceContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deviceId: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  connectButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default BLE;
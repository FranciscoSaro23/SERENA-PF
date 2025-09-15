import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: '#FFFFF6',
    },
    scrollContent: {
      padding: 20,
      paddingBottom: 140,
    },
  
    // Título
    title: {
      fontSize: 32,
      fontWeight: '700',
      color: '#161A68',
      textAlign: 'center',
      marginBottom: 24,
    },
  
    // Labels
    label: {
      fontSize: 16,
      fontWeight: '500',
      color: '#374151', // gris oscuro
      marginBottom: 6,
      marginTop: 15,
    },
  
    // Inputs
    input: {
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderColor: '#D1D5DB',
      borderRadius: 16,
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginBottom: 18,
      fontSize: 16,
      color: '#0A0D41',
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 3,
      elevation: 2,
    },
    inputDisabled: {
      backgroundColor: '#F3F4F6',
      color: '#9CA3AF',
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top',
    },
  
    // Botones
    botonGuardar: {
      backgroundColor: '#161A68',
      borderRadius: 16,
      paddingVertical: 14,
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 4,
      elevation: 4,
    },
    textoBotonGuardar: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600',
    },
    botonEnviar: {
      backgroundColor: '#E0F7FA',
      borderRadius: 16,
      paddingVertical: 14,
      alignItems: 'center',
      marginBottom: 32,
    },
    textoBoton: {
      color: '#161A68',
      fontSize: 18,
      fontWeight: '600',
    },
  
    // Botón secundario (+ canción)
    nuevaCancionBtn: 
    { 
      backgroundColor: '#0A0D41', 
      paddingVertical: 10, paddingHorizontal: 24, 
      borderRadius: 30, 
      alignSelf: 'center', 
      marginBottom: 24, }, 
      
    nuevaCancionText: 
    { 
      color: '#FFFFF6', 
      fontSize: 14, 
      fontWeight: '600', 
    },
  
    // Cover
    coverContainer: {
      alignItems: 'center',
      marginVertical: 16,
    },
    cover: {
      width: 200,
      height: 200,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 5,
      elevation: 5,
    },
  
    // Slider (tarjeta)
    sliderContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      padding: 16,
      marginBottom: 28,
      borderWidth: 1,
      borderColor: '#E5E7EB',
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 3,
      elevation: 3,
    },
    sliderValue: {
      fontSize: 22,
      fontWeight: '700',
      color: '#161A68',
      textAlign: 'center',
      marginBottom: 10,
    },
  
    // Mensajes
    message: {
      fontSize: 16,
      textAlign: 'center',
      marginVertical: 12,
      padding: 10,
      borderRadius: 12,
    },
    successMessage: {
      backgroundColor: '#D1FAE5',
      color: '#065F46',
      fontWeight: '600',
    },
    errorMessage: {
      backgroundColor: '#FEE2E2',
      color: '#991B1B',
      fontWeight: '600',
    },
  });
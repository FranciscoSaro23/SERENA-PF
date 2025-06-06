import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

export default function InicioScreen() {
    return (
        <View style={styles.container}>
          <Text className= 'titulo' style={styles.title}>Bienvenido x, vinculate con tu Luma</Text>
          <Button title="EMPEZAR" onPress={Tutorial} />
          <Text className= 'subtitulo'> Iluminá tu calma, estés donde estés </Text>
          <Text> ... </Text>
          <Text className= 'subtitulo'> ¿Qué es Luma? </Text>
          <Text className= 'parrafo'> Luma es un dispositivo sensorial portátil  diseñado para acompañar a personas neurodivergentes en situaciones de estrés, ansiedad o sobreestimulación. 
            A través de una experiencia controlada desde esta aplicación móvil, Luma promueve la relajación y el bienestar emocional de manera accesible, segura y empática. 
            Su diseño inclusivo y funcional permite utilizarlo en cualquier entorno, ofreciendo contención y calma allí donde más se necesita. </Text>
        </View>
      );
}

const styles = StyleSheet.create({
    titulo: {
      fontSize: 24,
      textAlign: 'left',
    },
    button: {
        fontSize: 20,
        display: flex,
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: '2',
    },
    subtitulo:{
        fontSize: 20,
        display: flex,
        textAlign: 'center',
    },
    parrafo:{
        fontSize: 18,
        display: flex,
        textAlign: 'center',
    },
  });
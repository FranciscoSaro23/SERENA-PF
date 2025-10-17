import React, { useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, StyleSheet } from 'react-native';

export default function CardInteractiva({ frontImage, frontText, backText }) {
  const [flipped, setFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipCard = () => {
    Animated.spring(flipAnim, {
      toValue: flipped ? 0 : 180,
      friction: 6,
      tension: 40,
      useNativeDriver: true,
    }).start();
    setFlipped(!flipped);
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();
  };

  return (
    <TouchableOpacity
      onPress={flipCard}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
        {/* Lado frontal */}
        <Animated.View
          style={[
            styles.card,
            {
              transform: [{ rotateY: frontInterpolate }],
              opacity: flipped ? 0 : 1,
            },
          ]}
        >
          <View style={styles.innerFront}>
            <Image source={frontImage} style={styles.icon} />
            <Text style={styles.cardText}>{frontText}</Text>
          </View>
          <View style={styles.glow} />
        </Animated.View>

        {/* Lado trasero */}
        <Animated.View
          style={[
            styles.card,
            styles.cardBack,
            {
              transform: [{ rotateY: backInterpolate }],
              opacity: flipped ? 1 : 0,
              position: 'absolute',
              top: 0,
            },
          ]}
        >
          <Text style={styles.backText}>{backText}</Text>
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',   // antes 95%
    height: 95,    // antes 120
    marginVertical: 8, // más ajustado
    alignSelf: 'center',
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: '#D9D9D9',
    borderRadius: 18,
    padding: 12, // antes 15
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#161A68',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
  },
  innerFront: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 55, // antes 70
    height: 55,
    marginRight: 12,
    resizeMode: 'contain',
  },
  cardText: {
    flex: 1,
    color: '#161A68',
    fontSize: 16, // antes 16
    fontWeight: '700',
  },
  cardBack: {
    backgroundColor: '#161A68',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backText: {
    color: '#FFFFF6',
    fontSize: 15, // antes 15
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 21,
  },
  glow: {
    position: 'absolute',
    width: '120%',
    height: '120%',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    transform: [{ rotate: '45deg' }],
    top: -40,
    left: -40,
    opacity: 0.1,
  },
});

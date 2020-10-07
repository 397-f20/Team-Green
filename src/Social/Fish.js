import React, { useState, useEffect } from 'react';
import { Dimensions, Animated, Easing, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const fishArray = {
  0: {
    name: require('../../assets/green_fish.png'),
    ratio: .479
  },
  1: {
    name: require('../../assets/purple_fish.png'),
    ratio: .479
  },
  2: {
    name: require('../../assets/rare_purple_fish.png'),
    ratio: .781
  },
  3: {
    name: require('../../assets/red_fish.png'),
    ratio: .479
  },
  4: {
    name: require('../../assets/yellow_fish.png'),
    ratio: .479
  },
  5: {
    name: require('../../assets/rainbow_fish.png'),
    ratio: .77
  }
}

const Fish = ({ random1, random2, fishSize, chooseFishRandom }) => {
  const [fishAnimationX, setFishAnimationX] = useState(new Animated.Value(0));
  const [fishAnimationY, setFishAnimationY] = useState(new Animated.Value(0));

  const animateFish = (easing) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fishAnimationX, {
          toValue: 1,
          duration: 5000,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(fishAnimationX, {
          toValue: 0,
          duration: 5000,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true
        })
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(fishAnimationY, {
          toValue: 1,
          duration: 5000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(fishAnimationY, {
          toValue: 0,
          duration: 5000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true
        })
      ])
    ).start();
  };

  // Calculate random positions for rendered fish
  const generateRandomRange = (random, value, margin) => {
    return random * (value - (margin * 2)) + margin;
  };

  const topPosition = generateRandomRange(random1, height, 100);
  const leftPosition = generateRandomRange(random2, width, 40);

  const getTranslateYValue = (random, margin) => {
    const randomValue = random * (height - (margin * 2)) + margin;
    return randomValue - topPosition;
  };

  const getTranslateXValue = (random, margin) => {
    const randomValue = random * (width - (margin * 2)) + margin;
    return randomValue - leftPosition;
  };

  const fishPosition = {
    position: 'absolute',
    top: generateRandomRange(random1, height, 100),
    left: generateRandomRange(random2, width, 40),
    transform: [{
        translateY: fishAnimationY.interpolate({
          inputRange: [0, 1],
          outputRange: [0, getTranslateYValue(Math.random(), 100)]
        })
      },
      {
        translateX: fishAnimationX.interpolate({
          inputRange: [0, 1],
          outputRange: [0, getTranslateXValue(Math.random(), 40)]
        })
      }   
    ]
  };
  
  useEffect(() => {
    const easing = Easing.ease;
    animateFish(easing);
  }, []);

  return (
    <Animated.View style={fishPosition}>
      <Image source={fishArray[chooseFishRandom].name} style={{width: fishSize, height: fishSize * fishArray[chooseFishRandom].ratio}} />
    </Animated.View>
  );
}; 

export default Fish;
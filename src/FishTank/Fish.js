import React, { useState, useEffect} from 'react';
import { Image, Animated, StyleSheet } from 'react-native';
import { fishArray } from './FishArray.js';

const Fish = ( props ) => {

  const [fishAnimated, setFishAnimated] = useState(new Animated.Value(0));
  const animationDuration = 250000 * props.random + 75000;
  const chosenIndex = props.fishType; 
  const [name, setName] = useState(fishArray[chosenIndex].name)
  const [ratio, setRatio] = useState(fishArray[chosenIndex].ratio)
  const [initialTop, setInitialTop] = useState(Math.floor(Math.random() * (props.SCREEN_HEIGHT - 100)) + 50)
  const [initialLeft, setInitialLeft] = useState(Math.floor(Math.random() * (props.SCREEN_WIDTH -100)) + 50)
  const [size, setSize] = useState(props.sizeRandom);

  const runFishAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fishAnimated, {
          toValue: 100,
          useNativeDriver: true,
          duration: animationDuration,
        }),
        Animated.timing(fishAnimated, {
          toValue: 0,
          useNativeDriver: true,
          duration: animationDuration,
        })
      ])
    ).start();
  }

  // TO DO
  const getTranslateX = () => {
    const difference = (props.SCREEN_WIDTH - initialLeft);
    const moveRight = ((props.SCREEN_WIDTH - 50) - initialLeft);
    const moveLeft = (25 - initialLeft); 

    if (difference > props.SCREEN_WIDTH / 2) {
      return [0, moveRight - 10, moveRight, moveRight  - 10, moveLeft + 10,  moveLeft, moveLeft + 10, moveRight - 10, moveRight, moveRight - 10, 10, 0];
    } else {
      return [0, moveLeft + 10, moveLeft, moveLeft + 10, moveRight - 10, moveRight, moveRight - 10, moveLeft + 10, moveLeft, moveLeft + 10, -10, 0];
    }
  }

   // TO DO
   const getTranslateY = () => {
    const difference = props.SCREEN_HEIGHT - initialTop;

    if (difference > props.SCREEN_HEIGHT / 2) {
      return [0, 5, 15, 35, 75, 135, 195, 235, 255, 265, 270, 265, 255, 235, 195, 135, 75, 35, 15, 5, 0]
    } else {
      return [0, -5, -15, -35, -75, -135, -195, -235, -255, -265, -270, -265, -255, -235, -195, -135, -75, -35, -15, -5, 0]
    }
  }

  useEffect(() => {
    runFishAnimation();
  }, [])

  const fishAnimation = {
    transform: [
      {
        translateY: fishAnimated.interpolate({
          inputRange: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
          outputRange: getTranslateY()
        })
      },
      {
        translateX: fishAnimated.interpolate({
          inputRange: [0, 22.5, 25, 27.5, 47.5, 50, 52.5, 72.5, 75, 77.5, 97.5, 100],
          outputRange: getTranslateX()
        })
      }
    ]
  }

  return (
    <Animated.View style={[fishAnimation, styles.fish, {top: initialTop, left: initialLeft}]}>
      <Image source={name} style={{width: size, height: size * ratio}} ></Image>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  fish: {
    position: 'absolute'
  }
})

export default Fish;
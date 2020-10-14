import React, { useState, useEffect} from 'react';
import { Image, Animated, StyleSheet, Easing, SegmentedControlIOSComponent } from 'react-native';
import { fishArray, fishArrayLength } from './FishArray.js';

const Fish = (props) => {

  const [fishAnimated, setFishAnimated] = useState(new Animated.Value(0));
  const animationDuration = 25000;
  const [name, setName] = useState()
  const [ratio, setRatio] = useState()
  const [initialTop, setInitialTop] = useState()
  const [initialLeft, setInitialLeft] = useState()
  const [size, setSize] = useState()

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

    const difference = props.SCREEN_WIDTH - initialLeft;
    const moveRight = (props.SCREEN_WIDTH - 50) - initialLeft;
    const moveLeft = 25 - initialLeft; 

    if (difference > props.SCREEN_WIDTH / 2) {
      return [0, moveRight - 10, moveRight, moveRight  - 10, moveLeft + 10,  moveLeft, moveLeft + 10, moveRight - 10, moveRight, moveRight - 10, 10, 0];
    } else {
      return [0, moveLeft + 10, moveLeft, moveLeft + 10, moveRight - 10, moveRight, moveRight - 10, moveLeft + 10, moveLeft, moveLeft + 10, -10, 0];
    }

  }
  const [translationX, setTranslateX] = useState([0, 0, 0, 0, 0]);

   // TO DO
   const getTranslateY = () => {
    const difference = props.SCREEN_HEIGHT - initialTop;


    if (difference > props.SCREEN_HEIGHT / 2) {
      return [0, 5, 15, 35, 75, 135, 195, 235, 255, 265, 270, 265, 255, 235, 195, 135, 75, 35, 15, 5, 0]
    } else {
      return [0, -5, -15, -35, -75, -135, -195, -235, -255, -265, -270, -265, -255, -235, -195, -135, -75, -35, -15, -5, 0]
    }
    return [0, 0]
  }

  useEffect(() => {
    const chosenIndex = Math.floor(Math.random() * fishArrayLength()),
    const size = Math.floor(Math.random() * 25) + 25,
    const top = Math.floor(Math.random() * (SCREEN_HEIGHT - 100)) + 50,
    const left = Math.floor(Math.random() - (SCREEN_WIDTH-100)) + 50
    
    setName(fishArray[chosenIndex].name)
    setRatio(fishArray[chosenIndex].ratio)
    setSize(size)
    setInitialTop(top)
    setInitialLeft(left)
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
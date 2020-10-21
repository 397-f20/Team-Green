import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated, StyleSheet, View, Dimensions, Easing } from 'react-native';

// dimensions
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;

const Bubble = (props) => {

  const width_offset = Math.random() * (SCREEN_WIDTH - 50) + 25

  const [bubbleAnimated, setBubbleAnimated] = useState(new Animated.Value(0));

  useEffect(() => {
    runBubbleAnimation();
  }, [])

  const runBubbleAnimation = () => {
    Animated.sequence([
      Animated.delay(props.delay),
      Animated.timing(bubbleAnimated, {
        toValue: 100,
        useNativeDriver: true,
        duration: props.time,
        Easing: Easing.linear
      })
    ]).start(() => {
      props.finished(props.index);
    })
  }

  const animatedStyles = {
    transform: [
      {
        scale: bubbleAnimated.interpolate({
          inputRange: [0, 20],
          outputRange: [0, 1],
          extrapolate: 'clamp'
        })
      },
      {
        translateY: bubbleAnimated.interpolate({
          inputRange: [0, 100],
          outputRange: [0, -SCREEN_HEIGHT - 100]
        })
      }
    ]
  }

  return (
    <Animated.View style={[animatedStyles, styles.bubble, {left: width_offset}]}>
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(255, 255, 255, 0.1)', 'rgba(0, 164, 228, 0.4)']}
        style={{
          left: 0,
          top: 0,
          position: 'absolute',
          height: 30,
          width: 30,
          borderRadius: 15
        }}
        start={[.3, .2]}
        end={[1, 1]}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
    bottom: 0,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  }
})

export default Bubble;
// package dependencies
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// components
import BubbleWrapper from './BubbleWrapper.js';
import FishWrapper from './FishWrapper.js';

// dimensions
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const Background = ( props ) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#eaeaea', '#00a4e4']}
        style={styles.gradient}
        start={[0, .1]}
        end={[.2, .9]}
      />
      <FishWrapper SCREEN_WIDTH={SCREEN_WIDTH} SCREEN_HEIGHT={SCREEN_HEIGHT} fishObjects={props.fishObjects} />
      <BubbleWrapper />
    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'lightblue',
    width: SCREEN_WIDTH, 
    height: SCREEN_HEIGHT
  },
  gradient:{
    position: 'absolute',
    left: 0,
    top: 0,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH
  }
})

export default Background;
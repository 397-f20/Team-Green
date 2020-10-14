// package dependencies
import React, { useState } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// dimensions
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

// components
import BubbleWrapper from './BubbleWrapper.js';
import FishWrapper from './FishWrapper.js';

const Background = (props) => {

  return (
    <View style={[styles.container, {width: SCREEN_WIDTH, height: SCREEN_HEIGHT}]}>
      
      <LinearGradient
        // Background Linear Gradient
        colors={['#eaeaea', '#00a4e4']}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: SCREEN_HEIGHT,
          width: SCREEN_WIDTH
        }}
        start={[0, .1]}
        end={[.2, .9]}
      />

      <BubbleWrapper />

      <FishWrapper SCREEN_WIDTH={SCREEN_WIDTH} SCREEN_HEIGHT={SCREEN_HEIGHT} numFish={props.numFish} />
      
    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'lightblue'
  }
})

export default Background;
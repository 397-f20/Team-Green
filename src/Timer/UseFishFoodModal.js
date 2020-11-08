import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, Dimensions } from 'react-native';

// dimensions
const SCREEN_WIDTH = Dimensions.get('screen').width

const UseFishFoodModal = ({ modalVisible, setModalVisible, callback }) => {

  const [animation, setAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (modalVisible) {
      runOpeningAnimation();
    }
  }, [modalVisible])

  const runOpeningAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true
    }).start()
  }

  const runClosingAnimation = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true
    }).start(() => {
      setModalVisible(false);
    })
  }

  const closeModal = () => {
    runClosingAnimation();
  }

  const animationStyling = {
    transform: [
      { 
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -400]
        })
      }
    ]
  }

  return (
    <View style={styles.container}>

      <View style={{...styles.modal, ...animationStyling}}>
        <TouchableOpacity onPress={closeModal}>
          <Text>hello!</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({

  container: {
    zIndex: 1000
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default UseFishFoodModal;
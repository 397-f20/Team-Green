import React, { useState, useEffect, Component } from 'react';
import { Text, TouchableOpacity, TouchableHighlight, View, StyleSheet, Dimensions, Animated } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width

import Modal from 'modal-react-native-web';
 
const UseFishFoodModal = ({modalVisible, setModalVisible}) => {
  const [animation, setAnimation] = useState(new Animated.Value(0));

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
    //runClosingAnimation();
    setModalVisible(false);
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
      <View>
            <View>
              <Text>Task complete! You've got a new fish!</Text>
 
              <TouchableHighlight
                onPress={closeModal}>
                <Text>Close</Text>
              </TouchableHighlight>
            </View>
            </View>
    </View>
  )
    {/*return (
        <Modal style={styles.modal}
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onDismiss={() => {
            alert('Modal has been closed.');
          }}>
          <View style={styles.container}>
            <View>
              <Text>Task complete! You've got a new fish!</Text>
 
              <TouchableHighlight
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text>Close</Text>
              </TouchableHighlight>
            </View>
            </View>
              </Modal>
            )*/}
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    position: "absolute", 
    alignItems: 'center', 
    alignSelf: 'center', 
    backgroundColor: 'white',
    height: '50%', 
    borderRadius: 25,
    zIndex: 1000,
    padding: 20
  },
  modal:{
    flex: 0,
    margin: 0, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: 'white',
    width: SCREEN_WIDTH,    
  },
  text:{
    padding: 10
  } 
});

export default UseFishFoodModal;

/*
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

*/
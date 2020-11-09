import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { fishArray } from './FishArray.js';

// dimensions
const SCREEN_WIDTH = Dimensions.get('screen').width


const UseFishFoodModal = ({ modalVisible, setModalVisible, callback }) => {

  const [animation, setAnimation] = useState(new Animated.Value(0));

  const [fishName, setFishName] = useState('');
  const [fishRatio, setFishRatio] = useState(1);
  const [fishSize, setFishSize] = useState(0);
  const [renderFish, setRenderFish] = useState(false);

  // this is how you render the fish:
  // const [name, setName] = useState(fishArray[chosenIndex].name)
  // const [ratio, setRatio] = useState(fishArray[chosenIndex].ratio)

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
        <Text>Congrats! You received a new fish.</Text>
        {renderFish && <Image source={fishName} style={{width: fishSize, height: fishSize * fishRatio, marginVertical: 25}} />}
        {IF USER HAS GIFTS && 
          <Text>You have been gifted fish food by a friend! Feed it to your fish?</Text>
          <View style={{flexDirection: 'horizontal', justifyContent: 'space-between', alignItems: 'center'}}>
          <TouchableOpacity onPress={FEED_THE_FOOD}>
            <View style={{backgroundColor: 'blue'}}>
              <Text style={{padding: 10}}>Yes!</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={CLOSE_THE_MODAL}>
            <View style={{backgroundColor: 'blue'}}>
              <Text style={{padding: 10}}>No</Text>
            </View>
          </TouchableOpacity>
          </View>
        }
      </View>
    </View>
  )

}

const styles = StyleSheet.create({

  container: {
    zIndex: 1000,

  },
  modal: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  }
})

export default UseFishFoodModal;
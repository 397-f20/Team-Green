// package dependencies
import React, { useState } from 'react'
import { View, Dimensions, StyleSheet } from 'react-native';

// components
import Bubble from './Bubble.js';

// dimensions
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const BubbleWrapper = () => {

  const restartBubble = (index) => {
    if (index === 1) {
      setBubblesObjOne()
      setBubblesObjOne(<Bubble delay={3000} time={25000} index={index} finished={restartBubble} />)
    } else if (index === 2) {
      setBubblesObjTwo()
      setBubblesObjTwo(<Bubble delay={3000} time={35000} index={index} finished={restartBubble} />)
    } else if (index === 3) {
      setBubblesObjThree()
      setBubblesObjThree(<Bubble delay={3000} time={50000} index={index} finished={restartBubble} />)
    } else if (index === 4) {
      setBubblesObjFour()
      setBubblesObjFour(<Bubble delay={3000} time={40000} index={index} finished={restartBubble} />)
    } else if (index === 5) {
      setBubblesObjFive()
      setBubblesObjFive(<Bubble delay={3000} time={45000} index={index} finished={restartBubble} />)
    } else if (index === 6) {
      setBubblesObjSix()
      setBubblesObjSix(<Bubble delay={3000} time={30000} index={index} finished={restartBubble} />)
    }
  }

  const [bubblesObjOne, setBubblesObjOne] = useState(<Bubble delay={3000} time={25000} index={1} finished={restartBubble} />)
  const [bubblesObjTwo, setBubblesObjTwo] = useState(<Bubble delay={5000} time={35000} index={2} finished={restartBubble} />)
  const [bubblesObjThree, setBubblesObjThree] = useState(<Bubble delay={7000} time={50000} index={3} finished={restartBubble} />)
  const [bubblesObjFour, setBubblesObjFour] = useState(<Bubble delay={9000} time={40000} index={4} finished={restartBubble} />)
  const [bubblesObjFive, setBubblesObjFive] = useState(<Bubble delay={12000} time={45000} index={5} finished={restartBubble} />)
  const [bubblesObjSix, setBubblesObjSix] = useState(<Bubble delay={15000} time={30000} index={6} finished={restartBubble} />)

  return (
    <View style={styles.container}>
      { bubblesObjOne }
      { bubblesObjTwo }
      { bubblesObjThree }
      { bubblesObjFour }
      { bubblesObjFive }
      { bubblesObjSix }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute', 
    height: SCREEN_HEIGHT, 
    width: SCREEN_WIDTH, 
    top: 0
  },
})

export default BubbleWrapper;
// package dependencies
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

// components
import Fish from './Fish.js';

const FishWrapper = (props) => {

  const [renderedFish, setRenderedFish] = useState([''] * props.numFish)
  useEffect(() => {
    const tempArray = []
    for (let i = 0; i < props.numFish.length; i++) {
      tempArray.push({
        chosenIndex: Math.floor(Math.random() * fishArrayLength()),
        size: Math.floor(Math.random() * 25) + 25,
        top: Math.floor(Math.random() * (SCREEN_HEIGHT - 100)) + 50,
        left: Math.floor(Math.random() - (SCREEN_WIDTH-100)) + 50
      })
    }
    setRenderedFish(tempArray)
  })

  return (
    <View>
      {renderedFish.map(fish => {
        <Fish SCREEN_WIDTH={props.SCREEN_WIDTH} SCREEN_HEIGHT={props.SCREEN_HEIGHT} />
      })}
    </View>
  )
}

export default FishWrapper;
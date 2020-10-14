// package dependencies
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

// components
import Fish from './Fish.js';

const FishWrapper = (props) => {

  const [renderedFish, setRenderedFish] = useState(new Array(props.numFish).fill('', 0, props.numFish))
  console.log(renderedFish)
  // useEffect(() => {
  //   console.log(renderedFish.length)
  // }, [])

  return (
    <View>
      {renderedFish.map(fish => (
        <Fish SCREEN_WIDTH={props.SCREEN_WIDTH} SCREEN_HEIGHT={props.SCREEN_HEIGHT} />
      ))}
    </View>
  )
}

export default FishWrapper;
// package dependencies
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

// components
import Fish from './Fish.js';

const FishWrapper = ( props ) => {

  const [renderedFish, setRenderedFish] = useState(props.fishObjects)

  useEffect(() => {
    setRenderedFish([])
    setRenderedFish(props.fishObjects);
  }, [props.fishObjects])

  return (
    <View>
      {(renderedFish && renderedFish != []) ? Object.keys(renderedFish).map((fish) => (
        <Fish SCREEN_WIDTH={props.SCREEN_WIDTH} SCREEN_HEIGHT={props.SCREEN_HEIGHT} key={fish} random={Math.random()} sizeRandom={renderedFish[fish].size} fishType={renderedFish[fish].idx} />
      )) : null}
    </View>
  )
}

export default FishWrapper;
import React, { useState, useEffect} from 'react';
import { Text, Image, TouchableOpacity, TouchableHighlight, View, StyleSheet, Dimensions} from 'react-native';
import { fishArray, fishArrayLength } from '../FishTank/FishArray';
import {firebase} from '../../config/firebase'
const SCREEN_WIDTH = Dimensions.get('screen').width

import { useUserContext } from '../UserContext';
 
const UseFishFoodModal = ({modalVisible, setModalVisible}) => {
  const { userData } = useUserContext();  
  
  const [fishIdx, setFishIdx] = useState(0);
  const [fishSize, setFishSize] = useState(0);
  const [renderFish, setRenderFish] = useState(false);
  const [isResized, setIsResized] = useState(false);
  
  const closeModal = () => {
    setModalVisible(false);
    updateFishObjects();
  }

  useEffect(() => {
    if (modalVisible){
      addFishObject();
    }
  }, [modalVisible]);

  function incrementFish() {
    firebase.database().ref('users').child(userData.id).child('fish').set(userData.fish + 1);
  }

  function addFishObject(){
    let idx = Math.floor(Math.random() * fishArrayLength());
    let size = Math.floor(Math.random() * 40) + 25;
    setFishIdx(idx);
    setFishSize(size);
    setRenderFish(true);
  }

  function updateFishObjects(){
    incrementFish();
    firebase.database().ref('users').child(userData.id).child('fishObjects').push({idx: fishIdx, size: fishSize});

    // remove gift from user if they use it on fish
    if (isResized) {
      
      const tempData = {...userData.gifts};
      const tempDataKeys = Object.keys(tempData);
      delete tempData[tempDataKeys[0]];
      firebase.database().ref('users').child(userData.id).child('gifts').set(tempData);
    }
  }

  function resizeFish(){
    if (!isResized){
      let size = fishSize * 3;
      setFishSize(size);
      setIsResized(true);
    }
  }

  return (
    <View style={styles.container}>
          <Text>Congrats! You received a new fish.</Text>
          {renderFish && <Image source={fishArray[fishIdx].name} style={{width: fishSize, height: fishSize * fishArray[fishIdx].ratio, marginVertical: 25}} />}
          {"gifts" in userData && Object.keys(userData.gifts).length > 0 ?  
            <React.Fragment>
              {!isResized && 
              <React.Fragment>
                <Text>You have been gifted fish food by a friend! Feed it to your fish?</Text>
                <View style={{flexDirection: 'row', alignSelf: 'stretch', marginTop: 10, justifyContent: 'space-around', alignItems: 'center'}}>
                  <TouchableOpacity onPress={resizeFish}>
                    <View style={styles.button}>
                        <Text style={{paddingHorizontal: 20, paddingVertical: 10}}>Yes!</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={closeModal}>
                      <View style={styles.button}>
                        <Text style={{paddingHorizontal: 20, paddingVertical: 10}}>No</Text>
                      </View>
                  </TouchableOpacity> 
                </View> 
              </React.Fragment>} 
            </React.Fragment> : null}
          <TouchableHighlight
            onPress={closeModal}>
            <Text style={{marginTop: 20}}>Close</Text>
          </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    position: "absolute", 
    alignItems: 'center', 
    alignSelf: 'center', 
    backgroundColor: 'white',     
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
  }, 
  button: {
    backgroundColor: 'rgba(0, 164, 228, 1)',
  } 
});

export default UseFishFoodModal;

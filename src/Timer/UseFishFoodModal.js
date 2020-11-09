import React, { useState, useEffect, useContext} from 'react';
import { Text, Image, TouchableOpacity, TouchableHighlight, View, StyleSheet, Dimensions} from 'react-native';
import { fishArray, fishArrayLength } from '../FishTank/FishArray';
import {firebase} from '../../config/firebase'
import UserContext from '../UserContext';
import { set } from 'react-native-reanimated';
const SCREEN_WIDTH = Dimensions.get('screen').width

 
const UseFishFoodModal = ({modalVisible, setModalVisible}) => {
  const [context, setContext] = useContext(UserContext)
  const [user, setUser] = useState(context.userData);

  const [fishIdx, setFishIdx] = useState(0);
  const [fishSize, setFishSize] = useState(0);
  const [renderFish, setRenderFish] = useState(false);
  const [isResized, setIsResized] = useState(false);

  useEffect(()=>{
    const db = firebase.database().ref('users').child(context.userData.id);
    db.on('value', snap => {
        if (snap.val()) {
            setContext({
                userData: snap.val(),
                userUid: context.userData.id
            })
        } 
    }, error => alert(error))
  }, []);
  
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
    firebase.database().ref('users').child(user.id).child('fish').set(user.fish + 1);
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
    firebase.database().ref('users').child(user.id).child('fishObjects').push({idx: fishIdx, size: fishSize});
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
          {"gifts" in user && Object.keys(user.gifts).length > 0 &&  
            <React.Fragment>
            {!isResized && <React.Fragment>
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
            </View> </React.Fragment>} 
            </React.Fragment>}
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
  }, 
  button: {
    backgroundColor: 'rgba(0, 164, 228, 1)',
  } 
});

export default UseFishFoodModal;

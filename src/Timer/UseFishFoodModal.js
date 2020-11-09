import React, { useState, useEffect, useContext} from 'react';
import { Text, TouchableHighlight, View, StyleSheet, Dimensions} from 'react-native';
import { fishArrayLength } from '../FishTank/FishArray';
import {firebase} from '../../config/firebase'
import UserContext from '../UserContext';
const SCREEN_WIDTH = Dimensions.get('screen').width

 
const UseFishFoodModal = ({modalVisible, setModalVisible}) => {
  const [context, setContext] = useContext(UserContext)
  const [user, setUser] = useState(context.userData);
  
  const closeModal = () => {
    setModalVisible(false);
  }

  useEffect(() => {
    if (modalVisible){
      addFishObject(user.id);
    }
  }, [modalVisible]);

  function addFishObject(userId){
    let idx = Math.floor(Math.random() * fishArrayLength());
    let size = Math.floor(Math.random() * 40) + 25;
    firebase.database().ref('users').child(userId).child('fishObjects').push({idx: idx, size: size});
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

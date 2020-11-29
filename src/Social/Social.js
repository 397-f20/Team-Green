// package dependencies
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { firebase } from '../../config/firebase'
import 'firebase/auth';

// components
import Background from '../FishTank/Background.js';
import SendFishFood from './SendFishFood.js';
import SendMessage from './SendMessage';
import NewFriendModal from './NewFriendModal';
import AddFriendButton from './AddFriendButton';
import MessagesButton from './MessagesButton';
import MessageModal from './MessageModal';
import Dropdown from './Dropdown.js';

import { useUserContext } from '../UserContext';


const Social = ({navigation}) => {

  const { userData } = useUserContext();
  const [displayedUser, setDisplayedUser] = useState(userData);
  const [modalVisible, setModalVisible] = useState(false);
  const [messageModalVisible, setMessageModalVisible] = useState(false);

  // user = {id}
  const changeUser = (uid) => {
    // change displayed user --> uid -> call to firebase -- > set displayed user from firebase response
    firebase.database().ref('users/' + uid).on('value', snap => {
      if (snap.val()) {
        setDisplayedUser(snap.val());
      }
    });
  }

  const showAddFriend = () => {
    setModalVisible(true);
  }

  const sendFishFoodCallback = useCallback(() => {
    if (displayedUser.id === userData.id) {
      alert("you can't send food to yourself!")
      return;
    }

    // does the person actually have a fishFoodTimeout field ? check the timeout : send the food, create a timeout
    // check the timeout : has it been 24 hours ? send the food, update timeout : don't send the food, alert the user

    firebase.database().ref('users').child(displayedUser.id).child('gifts').push({
      sender: userData.name
    })
    alert('fish food is sent!');
    return;
  }, [displayedUser, userData])

  function sendMessageCallback () {
    if (displayedUser.id === userData.id) {
      alert("you can't send messages to yourself!")
      return;
    }

    setMessageModalVisible(true);
    return;
  }

  return (
    <View style={styles.container}>      
      <Background fishObjects={displayedUser.fishObjects} />

      <Dropdown friendsList={userData.friends} loggedIn={userData.id} changeUser={changeUser} currentlySelected={displayedUser} />
      
      <AddFriendButton addFriend={showAddFriend} />
      <MessagesButton navigation={navigation} />

      {modalVisible && <NewFriendModal style={styles.modal} modalVisible={modalVisible} setModalVisible={setModalVisible}/>}

      {displayedUser.id !== userData.id ? <SendFishFood callback={sendFishFoodCallback} /> : null}
      {displayedUser.id !== userData.id ? <SendMessage callback={sendMessageCallback}/> : null}
      {messageModalVisible && <MessageModal style={styles.modal} modalVisible={messageModalVisible} setModalVisible={setMessageModalVisible} displayedUser={displayedUser}/>}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal:{
    width: 25, 
    height: 25
  },
  dropdown: {
    top: 500
  }
});

export default Social;
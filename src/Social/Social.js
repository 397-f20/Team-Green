// package dependencies
import React, { useState, useCallback } from 'react';
import { View, StyleSheet} from 'react-native';
import { firebase } from '../../config/firebase'
import 'firebase/auth';

// components
import Background from '../FishTank/Background.js';
import SendFishFood from './SendFishFood.js';
import Logout from '../Logout/Logout';
import NewFriendModal from './NewFriendModal';
import AddFriendButton from './AddFriendButton';
import Dropdown from './Dropdown.js';

import { useUserContext } from '../UserContext';

const Social = () => {

  const { userData } = useUserContext();
  const [displayedUser, setDisplayedUser] = useState(userData);
  const [modalVisible, setModalVisible] = useState(false);

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

  return (
    <View style={styles.container}>      
      <Background fishObjects={displayedUser.fishObjects} />

      <Dropdown friendsList={userData.friends} loggedIn={userData.id} changeUser={changeUser} currentlySelected={displayedUser} />
      
      <AddFriendButton addFriend={showAddFriend} />
      <Logout style={styles.logout}/>

      {modalVisible && <NewFriendModal style={styles.modal} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
}


      <SendFishFood callback={sendFishFoodCallback} />
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
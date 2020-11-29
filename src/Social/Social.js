// package dependencies
import React, { useState, useCallback, useEffect } from 'react';
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


const Social = ({navigation, route}) => {

  const initialShow = route && route.params && route.params.initialShow ? route.params.initialShow : null;

  const { userData } = useUserContext();
  const [displayedUser, setDisplayedUser] = useState(userData);
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
  
  useEffect(() => {
    if (initialShow) changeUser(initialShow)
  }, [initialShow])

  return (
    <View style={styles.container}>      
      <Background fishObjects={displayedUser.fishObjects} />

      <Dropdown friendsList={userData.friends} loggedIn={userData.id} changeUser={changeUser} currentlySelected={displayedUser} />
      
      <MessagesButton navigation={navigation} />
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
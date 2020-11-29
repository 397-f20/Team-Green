// package dependencies
import React, { useState, useEffect } from 'react';
import { View, StyleSheet} from 'react-native';
import { firebase } from '../../config/firebase'
import 'firebase/auth';

// components
import Background from '../FishTank/Background.js';
import Dropdown from './Dropdown.js';

import { useUserContext } from '../UserContext';


const Social = ({route}) => {

  const initialShow = route && route.params && route.params.initialShow ? route.params.initialShow : null;

  const { userData } = useUserContext();
  const [displayedUser, setDisplayedUser] = useState(userData);

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
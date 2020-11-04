import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { firebase } from '../../config/firebase'

import Background from '../FishTank/Background.js';
import Dropdown from './Dropdown.js';
import UserContext from '../UserContext';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const Social = () => {
  const [context, setContext] = useContext(UserContext);
  const [usersData, setUsersData] = useState({});
  const [displayedUser, setDisplayedUser] = useState({});
  const [fishRendered, setFishRendered] = useState({});
  
  useEffect(() => {
    const db = firebase.database().ref('users');
    db.on('value', snap => {
      if (snap.val()) {
        const data = snap.val()
        setUsersData(data);
      }
      if (context.userData){
        setDisplayedUser(context.userData);
        setFishRendered(context.userData.fishObjects);
      }
    }, error => console.log(error));
  }, []);

  const changeUser = (user) => {
    if (user){
      if (user in usersData){
        setDisplayedUser(usersData[user]);
        setFishRendered(usersData[user].fishObjects);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Background fishObjects={fishRendered} />
      <Dropdown userData={usersData} selectedUser={displayedUser.name} changeUser={changeUser} loggedIn={context.userData.name} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default Social;
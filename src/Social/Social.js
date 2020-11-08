// package dependencies
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { firebase } from '../../config/firebase'
import UserContext from '../UserContext';

// components
import Background from '../FishTank/Background.js';
import Dropdown from './Dropdown.js';
import SendFishFood from './SendFishFood.js';

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
    }, error => console.log(error));
  }, []);

  useEffect(() => {
    setDisplayedUser(context.userData);
    setFishRendered(context.userData.fishObjects);
  }, [])

  const changeUser = (user) => {
    if (user){
      if (user in usersData){
        setDisplayedUser(usersData[user]);
        setFishRendered(usersData[user].fishObjects);
      }
    }
  }

  const sendFishFoodCallback = useCallback(() => {
    if (displayedUser.id === context.userData.id) {
      alert("you can't send food to yourself!")
      return;
    }

    // does the person actually have a fishFoodTimeout field ? check the timeout : send the food, create a timeout
    // check the timeout : has it been 24 hours ? send the food, update timeout : don't send the food, alert the user

    firebase.database().ref('users').child(displayedUser.id).child('gifts').push({
      sender: context.userData.name
    })
    alert('fish food is sent!');
    return;
  }, [displayedUser, usersData])

  return (
    <View style={styles.container}>
      <Background fishObjects={fishRendered} />
      <Dropdown userData={usersData} selectedUser={displayedUser.name} changeUser={changeUser} loggedIn={context.userData.name} />
      <SendFishFood callback={sendFishFoodCallback} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default Social;
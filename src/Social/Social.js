import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { firebase } from '../../config/firebase'
import Background from '../FishTank/Background.js';
import Dropdown from './Dropdown.js';
const SCREEN_WIDTH = Dimensions.get('screen').width;


const Social = ({route}) => {

  console.log(route.params)

  const [usersData, setUsersData] = useState({});
  const [displayedUser, setDisplayedUser] = useState(route.params.userData);
  const [fishRendered, setFishRendered] = useState(route.params.userData.fishObjects);
  

  useEffect(() => {
    const db = firebase.database().ref('users');
    db.on('value', snap => {
      if (snap.val()) {
        const data = snap.val()
        setUsersData(data);
      }
    }, error => console.log(error));
  }, []);

  const changeUser = (user) => {
    setDisplayedUser(usersData[user]);
    setFishRendered(usersData[user].fishObjects);
  }

  return (
    <View style={styles.container}>
      <Background fishObjects={fishRendered} />
      <Dropdown userData={usersData} loggedIn={displayedUser.displayName} changeUser={changeUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default Social;
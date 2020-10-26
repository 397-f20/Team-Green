import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { firebase } from '../../config/firebase'
import Background from '../FishTank/Background.js';
import Dropdown from './Dropdown.js';
const SCREEN_WIDTH = Dimensions.get('screen').width;

const c = 'numFish';


const Social = () => {

  const [usersData, setUsersData] = useState({});
  const [loggedInUser, setLoggedInUser] = useState({name: '', fish: 0});
  const [numFishRendered, setNumFishRendered] = useState(0)

  useEffect(() => {
    const db = firebase.database().ref('users');
    db.on('value', snap => {
      if (snap.val()) {
        setUsersData(snap.val());
        setLoggedInUser(snap.val().a)
        setNumFishRendered(snap.val().a.fish)
      }
    }, error => console.log(error));
  }, []);

  const changeUser = (user) => {
    setLoggedInUser(usersData[user]);
    setNumFishRendered(usersData[user].fish);
  }

  return (
    <View style={styles.container}>
      <Background numFish={numFishRendered}/>
      <Dropdown userData={usersData} loggedIn={loggedInUser.name} changeUser={changeUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default Social;
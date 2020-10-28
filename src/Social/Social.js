import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { firebase } from '../../config/firebase'
import Background from '../FishTank/Background.js';
import Dropdown from './Dropdown.js';
const SCREEN_WIDTH = Dimensions.get('screen').width;


const Social = ({route}) => {

  

  const [usersData, setUsersData] = useState({});
  const [loggedInUser, setLoggedInUser] = useState({name: '', fish: 0});
  const [fishRendered, setFishRendered] = useState([]);
  

  useEffect(() => {
    const db = firebase.database().ref('users');
    db.on('value', snap => {
      if (snap.val()) {
        const data = snap.val()
        setUsersData(data);
        setLoggedInUser(data[route.params.username])
        setFishRendered(data[route.params.username].fishObjects)
      }
    }, error => console.log(error));
  }, []);

  const changeUser = (user) => {
    setLoggedInUser(usersData[user]);
    setFishRendered(usersData[user].fishObjects);
  }

  return (
    <View style={styles.container}>
      <Background fishObjects={fishRendered} />
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
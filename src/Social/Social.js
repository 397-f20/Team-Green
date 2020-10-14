import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Fish from './Fish.js';
import UserContext from "../UserContext"
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { firebase } from '../../config/firebase'


const SCREEN_WIDTH = Dimensions.get('window').width;


const Social = () => {
  // const user = useContext(UserContext); 

  const [user, setUser] = useState({});
  const [usr, setUsr] = useState({ "friends": [] });

  const [selectedValue, setSelectedValue] = useState("");
  const [fishArray, setFishArray] = useState([]);

  useEffect(() => {
    const db = firebase.database().ref('users');
    db.on('value', snap => {
      if (snap.val()) {
        setUser(snap.val());
      }
    }, error => console.log(error));
  }, []);

  // Currently user being the users list from JSON and usr being the individual user
  // const usr = user.a;
  useEffect(() => {
    if ("a" in user) {
      setUsr(user.a);
      setSelectedValue(user.a.name);
      setFishArray(new Array(user.a.fish).fill(0));
    }
  }, [user])


  function changeFishTank(itemValue) {
    setSelectedValue(itemValue);
    setFishArray(new Array(user[itemValue].fish).fill(0));
  }

  function getFriendsList(friends) {
    let friendArr = [];
    friendArr.push({ label: usr.name, value: usr.id });
    // friendArr.push({label: user.name, value: user.name});

    let friendIDs = Object.keys(friends);
    let friendNames = Object.values(friends);

    for (let i = 0; i < friendNames.length; i++) {
      let currItem = {
        label: friendNames[i],
        value: friendIDs[i]
      };
      friendArr.push(currItem);
    }

    if (typeof (friendArr[0].label) === "undefined") {
      friendArr = [];
      friendArr.push({ label: "loading", value: "loading" })
    }
    return friendArr;
  }
  const pickerStyle = {
    inputIOS: {
      paddingTop: 13,
      paddingHorizontal: 10,
      paddingBottom: 12,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      top: 0,
      borderRadius: 25,
      marginLeft: 20,
      marginRight: 20,
    },
    viewContainer: {
      top: '-30%',
      borderRadius: 25
    },
    inputAndroid: {
      color: 'black',
      backgroundColor: 'white'
    },
    inputWeb: {
      color: 'black',
      backgroundColor: 'white',
      marginTop: '-5%',
      margin: 'auto',
      width: '50%',
      borderRadius: 25,
    },
    underline: { borderTopWidth: 5 },
    icon: {
      backgroundColor: 'grey',
      borderTopWidth: 5,
      borderTopColor: '#00000099',
      borderRightWidth: 5,
      borderRightColor: 'grey',
      borderLeftWidth: 5,
      borderLeftColor: 'grey',
      width: 0,
      height: 0,
      top: -250,
      right: 15,
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          style={pickerStyle}
          onValueChange={(itemValue) => changeFishTank(itemValue)}
          items={getFriendsList(usr.friends)}
          // items={getFriendsList(user.friends)}
          placeholder={{}}
        />
      </View>
      {fishArray.map((fish, index) => (
        <RenderFish key={index} />
      ))}

    </View>
  );
}

const RenderFish = () => {
  const random1 = Math.random();
  const random2 = Math.random();
  const fishSize = Math.random() * 40 + 20;
  const chooseFishRandom = Math.floor(Math.random() * 6);

  return (
    <Fish random1={random1} random2={random2} fishSize={fishSize} chooseFishRandom={chooseFishRandom} />
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    shadowColor: 'white',
    shadowOffset: {
      width: 4,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    top: '-35%',
    width: SCREEN_WIDTH - 50
  },
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Social;
import React, { useState, useEffect, useContext} from 'react';
import { Text, Image, TouchableOpacity, TouchableHighlight, View, StyleSheet, Dimensions, TextInput} from 'react-native';
import { fishArray, fishArrayLength } from '../FishTank/FishArray';
import {firebase} from '../../config/firebase'
import UserContext from '../UserContext';
import { set } from 'react-native-reanimated';
const SCREEN_WIDTH = Dimensions.get('screen').width

const NewFriendModal = ({modalVisible, setModalVisible}) => {
  const [context, setContext] = useContext(UserContext)
  const [user, setUser] = useState(context.userData);
  const [emailInput, setEmailInput] = useState("");

  useEffect(()=>{
    const db = firebase.database().ref('users').child(context.userData.id);
    db.on('value', snap => {
        if (snap.val()) {
            setContext({
                userData: snap.val(),
                userUid: context.userData.id
            })
        } 
    }, error => alert(error))
  }, []);
  
  const closeModal = () => {
    setModalVisible(false);
  }

  function searchFriend() {
    var usersRef = firebase.database().ref('users');
    var thisUserRef = firebase.database().ref('users').child(user.id);
    var friendsEmailList = [];
    for (var friend in user.friends) {
      if (friend != '0') {
        friendsEmailList.push(user.friends[friend].friendEmail);
      }
    }
    usersRef.once("value", function(snapshot) {
      snapshot.forEach(function(child) {
        if (child.val().email && emailInput == child.val().email 
            && !friendsEmailList.includes(emailInput)
            && emailInput != user.email) {
          var friendUID = child.val().id;
          var friendName = child.val().name;
          var friendEmail = child.val().email;
          thisUserRef.child('friends')
            .push({friendName: friendName, friendUID: friendUID, friendEmail: friendEmail});
          alert("Successfully added friend!");
          closeModal();
        }
      });
    });
  }

  return (
    <View style={styles.container}>
          <Text>Search Friends by Email</Text>
          <TextInput 
                style={styles.field} 
                placeholder='Email'
                placeholderTextColor='rgb(0, 164, 228)'
                value={emailInput} 
                onChangeText={value => setEmailInput(value)}>
            </TextInput>
            <TouchableOpacity onPress={searchFriend} activeOpacity={1}>
                <View style={styles.button}>
                    <Text style={styles.text}>Search Friend</Text>
                </View>                
            </TouchableOpacity>
          <TouchableHighlight
            onPress={closeModal}>
            <Text style={{marginTop: 20}}>Close</Text>
          </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    position: "absolute", 
    alignItems: 'center', 
    alignSelf: 'center', 
    backgroundColor: 'white',
    height: '50%', 
    borderRadius: 25,
    zIndex: 1000,
    padding: 20
  },
  modal:{
    flex: 0,
    margin: 0, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: 'white',
    width: SCREEN_WIDTH,    
  },
  text:{
    padding: 10
  }, 
  button: {
    backgroundColor: 'rgba(0, 164, 228, 1)',
  },
  field: {
    backgroundColor: 'rgba(255, 255, 255, .9)',
    height: 30,
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 8,
    paddingVertical: 4
    }
});

export default NewFriendModal;

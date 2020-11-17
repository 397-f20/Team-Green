import React, { useState } from 'react';
import { Text , TouchableOpacity, TouchableHighlight, View, StyleSheet, Dimensions, TextInput } from 'react-native';
import {firebase} from '../../config/firebase'
const SCREEN_WIDTH = Dimensions.get('screen').width

import { useUserContext } from '../UserContext';

const NewFriendModal = ({setModalVisible}) => {
  const { userData } = useUserContext();

  const [emailInput, setEmailInput] = useState("");
  
  const closeModal = () => {
    setModalVisible(false);
  }

  function searchFriend() {
    var usersRef = firebase.database().ref('users');
    var thisUserRef = firebase.database().ref('users').child(userData.id);

    // check if user already has person as friend
    for (var friend in userData.friends) {
      if (userData.friends[friend].friendEmail === emailInput) {
        alert('You already have this person as a friend!');
        closeModal();
        return;
      }
    }

    // if not already friend, add as friend
    usersRef.once("value", function(snapshot) {
      snapshot.forEach(function(child) {
        if (child.val().email && emailInput == child.val().email) {
          thisUserRef.child('friends')
            .push({friendName: child.val().name, friendUID: child.val().id, friendEmail: child.val().email});
          alert("Successfully added friend!");
          closeModal();
          return;
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

import React, { useState } from 'react';
import { Text , TouchableOpacity, TouchableHighlight, View, StyleSheet, Dimensions, TextInput } from 'react-native';
import {firebase} from '../../config/firebase'
const SCREEN_WIDTH = Dimensions.get('screen').width

import { useUserContext } from '../UserContext';

const MessageModal = ({setModalVisible, displayedUser}) => {
  const { userData } = useUserContext();

  const [messageInput, setMessageInput] = useState("");
  
  const closeModal = () => {
    setModalVisible(false);
  }

  function getTimestamp(){
    const now = new Date(Date.now());
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();
    const mins = now.getMinutes();
    const today = `${month}/${day} ${hour}:${mins}`;
    return today
  }

  function sendMessage () {
      //update self's sent messages
      firebase.database().ref('users').child(userData.id).child('messages').child('sent').push({
        to: displayedUser.name,
        message: messageInput, 
        timestamp: getTimestamp()
      })

      //update recipient's received messages; 
      firebase.database().ref('users').child(displayedUser.id).child('messages').child('received').push({
        sender: userData.name,
        message: messageInput, 
        timestamp: getTimestamp()
      })
      closeModal();
  }

  return (
    <View style={styles.container}>
          <Text>Send Message to {displayedUser.name}</Text>
          <TextInput 
                style={styles.field} 
                placeholder='Message'
                placeholderTextColor='rgb(0, 164, 228)'
                value={messageInput} 
                onChangeText={value => setMessageInput(value)}>
            </TextInput>
            <TouchableOpacity onPress={sendMessage} activeOpacity={1}>
                <View style={styles.button}>
                    <Text style={styles.text}>Send</Text>
                </View>                
            </TouchableOpacity>
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

export default MessageModal;

import React, { useState, useEffect} from 'react';
import { View, StyleSheet, Text,Dimensions, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons'; 
import { firebase } from '../../config/firebase'
import { useNavigation } from '@react-navigation/native';

import { useUserContext } from '../UserContext';
import Message from '../FriendMessages/Message';

// dimensions
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

// FUNCTIONS:
// - CONTACTS LIST
// ---- SEND MESSAGE
// ---- GIFT FOOD
// ---- VIEW TANK
// - MESSAGES (?)
// - ADD FRIEND

const Friends = () => {
  const { userData } = useUserContext();

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#eaeaea', '#00a4e4']}
        style={styles.gradient}
        start={[0, .1]}
        end={[.2, .9]}
      />
      <View style={{flexDirection: 'row', padding: 100, width: '100%'}}>
        <ContactsList />
      </View>
    </View>
  )
}

const ContactsList = () => {
  const { userData } = useUserContext();

  const [showAddFriend, setShowAddFriend] = useState(false);
  const [mappedFriends, setMappedFriends] = useState([]);

  const toggleAddFriend = () => setShowAddFriend(!showAddFriend);
  console.log(userData)
  console.log(userData.friends)

  useEffect(() => {
    if ('friends' in userData === false) return;

    firebase.database().ref('users').on('value', snapshot => {
      const sortArray = [];

      Object.values(userData.friends).forEach((friend) => {
        sortArray.push({
          friendUID: friend.friendUID,
          fish: snapshot.val()[friend.friendUID].fish,
          friendName: friend.friendName,
          friendEmail: friend.friendEmail
        })
      })

      // SORT THE ARRAY HERE
      setMappedFriends(sortArray.sort((a, b) => {return b.fish - a.fish}))
    })
  }, [])

  return (
    <View style={{flex: 1}}>
      <View style={styles.contactListTitle}>
        <Text style={{fontWeight: '700', fontSize: 32, marginRight: 15, width: 200}} >Leaderboard</Text>
        <TouchableOpacity onPress={toggleAddFriend} style={{paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#2a2a72', borderRadius: 8, flexDirection: 'row', alignItems: 'center'}}>
          <AntDesign name="adduser" size={20} color="white" />
          <Text style={{marginRight: 5, color: 'white'}}>Add friend</Text>
        </TouchableOpacity>
      </View>
      {showAddFriend && <AddFriend hide={toggleAddFriend} />}
      {'friends' in userData && mappedFriends.length === 0 && <Text>Loading...</Text>}
      <View style={styles.mappedContactsList}>
        {mappedFriends.map((friend, index) => (
          <SingleContact data={friend} index={index} key={index}/>
        ))}
      </View>
    </View>
  )
}

const AddFriend = ({ hide }) => {

  const { userData } = useUserContext();
  const [val, setVal] = useState('');

  const submitted = (val) => {
    var usersRef = firebase.database().ref('users');
    var thisUserRef = firebase.database().ref('users').child(userData.id);

    // check if user already has person as friend
    for (var friend in userData.friends) {
      if (userData.friends[friend].friendEmail === val) {
        alert('You already have this person as a friend!');   
        return;
      }
    }

    // if not already friend, add as friend
    usersRef.once("value", function(snapshot) {
      snapshot.forEach(function(child) {
        if (child.val().email && val == child.val().email) {
          thisUserRef.child('friends')
            .push({friendName: child.val().name, friendUID: child.val().id, friendEmail: child.val().email});
          usersRef.child(child.val().id).child('friends')
            .push({friendName: userData.name, friendUID: userData.id, friendEmail: userData.email});
            alert("Successfully added friend!");
          hide();
        }
      });
    });
  }

  return (
    <TextInputSend
      placeholder="Type friend email"
      onSend={submitted}
      buttonText="Submit"
      val={val}
      setVal={setVal}
    />
  )
}

// data: {friendEmail, friendName, friendUID}
const SingleContact = ({ data, index }) => {
  const navigation = useNavigation();
  const { userData } = useUserContext();

  const [showSendMessageInput, setShowSendMessageInput] = useState(false);
  const sendFood = () => {
    console.log(data);
    firebase.database().ref('users').child(data.friendUID).child('gifts').push({
      sender: userData.name
    })
    alert('fish food is sent!');
    return;
  }

  const viewTank = () => {
    navigation.navigate('Tank', {
      initialShow: data.friendUID
    });
  }

  const getBackgroundColor = () => {
    if (index === 0) return "#f9a602"
    else if (index === 1) return "rgb(100, 100, 100)";
    else if (index === 2) return "#cd7f32"
    return "#00a4e4";
  }

  return (
    <View style={{width: '100%'}}>
      <View style={styles.singleContact}>
        <Text style={{fontSize: 18, fontWeight: '600', width: 100}}>{data.friendName}</Text>

        <View style={{paddingVertical: 5, paddingHorizontal: 10, borderRadius: 8, backgroundColor: getBackgroundColor(), opacity: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: 3}}>
          <Text style={{fontWeight: '700', color: 'white'}}>{data.fish} points</Text>
        </View>

        {data.friendName === userData.name && <View style={{paddingVertical: 5, paddingHorizontal: 10, borderRadius: 8, backgroundColor: '#2a2a72', opacity: 0.7, alignItems: 'center', justifyContent: 'center', marginHorizontal: 3}}>
          <Text style={{fontWeight: '700', color: 'white'}}>YOU</Text>
        </View>}

        <View style={{flex: 1}} />

        {data.friendName !== userData.name && <SingleContactButton onPress={viewTank} >View tank</SingleContactButton>}
        {data.friendName !== userData.name && <SingleContactButton onPress={() => setShowSendMessageInput(!showSendMessageInput)} >Messages</SingleContactButton>}
        {data.friendName !== userData.name && <SingleContactButton onPress={sendFood} >Gift food</SingleContactButton>}
      </View>
      {showSendMessageInput && <Messages
        data={data}
      />}
    </View>
  )
}

const TextInputSend = ({onSend, placeholder, buttonText , val, setVal}) => {

  return (
    <View style={styles.addFriendContainer}>
      <TextInput 
        value={val}
        onChangeText={(value) => setVal(value)}
        style={styles.addFriendInput}
        placeholder={placeholder}
      />
      <SingleContactButton onPress={() => onSend(val)} >{buttonText}</SingleContactButton>
    </View>
  )
}

const SingleContactButton = ({children, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{paddingHorizontal: 10, paddingVertical: 5, borderColor: '#2a2a72', backgroundColor: 'transparent', borderWidth: 1, borderRadius: 8, marginHorizontal: 3}}>
        <Text style={{fontWeight: '700', color: '#2a2a72'}}>{children}</Text>
      </View>
    </TouchableOpacity>
  )
}

const Messages = ({ data }) => {

  const { userData } = useUserContext();
  const [val, setVal] = useState('');

  const getTimestamp = () => {
    const now = new Date(Date.now());
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();
    const mins = now.getMinutes();
    const today = `${month}/${day} ${hour}:${mins}`;
    return today
  }

  const sendMessage = () => {
    if (val === '') return;
    const sendVal = val.trim();

    firebase.database().ref('users').child(userData.id).child('messages').push({
      to: data.friendName,
      from: userData.name,
      message: sendVal, 
      timestamp: getTimestamp()
    })

    //update recipient's received messages; 
    firebase.database().ref('users').child(data.friendUID).child('messages').push({
      from: userData.name,
      to: data.friendName,
      message: sendVal, 
      timestamp: getTimestamp()
    })

    setVal('');
  }
  
  const getMessages = (messages,friend) => {
    return Object.values(messages).filter( msg => (msg.to === userData.name && msg.from === friend) || (msg.to === friend && msg.from === userData.name))
  }

  return (
    <View style={{width: '100%'}}>
      {"messages" in userData ? 
          Object.values(getMessages(userData.messages, data.friendName)).map(msg => <Message msg={msg} type="To" key={msg.timestamp}/>) : null 

      } 
      <TextInputSend 
        placeholder="Type your message..."
        buttonText="Send"
        onSend={sendMessage}
        val={val}
        setVal={setVal}
      />
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  gradient:{
    position: 'absolute',
    left: 0,
    top: 0,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: '600',
    marginTop: 20    
  },
  contactListTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10
  },
  mappedContactsList: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%'
  },
  addFriendContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%'
  },
  addFriendInput: {
    borderRadius: 8,
    borderColor: 'gray',
    borderWidth: 2,
    flex: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center'
  },
  singleContact: {
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%'
  }
})

export default Friends;
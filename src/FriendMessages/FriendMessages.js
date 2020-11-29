import React from 'react';
import { View, Text } from 'react-native';
import BackButton from "./Back";
import { useUserContext } from '../UserContext';
import Message from "./Message";


const FriendMessages = ({ route, navigation }) => {
  const { userData } = useUserContext();  
  console.log(userData.messages)


  const ReceivedMessages = () =>{
    return (
      <View>
        {"messages" in userData && "received" in userData.messages && Object.keys(userData.messages.received).length > 0 ? 
          Object.values(userData.messages.received).map( msg => (<Message msg={msg} type="From" />))  :
          <Text>No messages sent!</Text>
        }
      </View>
    )
  }

  const SentMessages = () =>{
    return (
      <View>
        {"messages" in userData && "sent" in userData.messages && Object.keys(userData.messages.sent).length > 0 ? 
          Object.values(userData.messages.sent).map( msg => (<Message msg={msg} type="To" />)) :
          <Text>No messages sent!</Text>
        }
      </View>
    )
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <BackButton navigation={navigation}/>
      <ReceivedMessages />
      <SentMessages />      
    </View>
  )
}

export default FriendMessages;
import React from 'react';
import { View, Text } from 'react-native';
import BackButton from "./Back";

const FriendMessages = ({ route, navigation }) => {

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <BackButton navigation={navigation}/>
      <Text>Hello!</Text>
    </View>
  )
}

export default FriendMessages;
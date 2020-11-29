import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const Message = ({msg, type}) => {
    return(
      <View style={styles.container}>
        <Text style={styles.text}> {type}: {msg.sender} {msg.message} {msg.timestamp} </Text>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'left', 
        marginLeft: 20
    },
    text: {
        fontSize: 18,
        color: 'black'
    }
})

export default Message;


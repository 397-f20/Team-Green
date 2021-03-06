import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { useUserContext } from '../UserContext';

const Message = ({msg, type}) => {
    const { userData } = useUserContext();

    return(
      <View style={styles.container}>
        <View>
          <View style={{
      height: '100%',
      width: 3,
      position: 'absolute',
      top: 0,
      left: -10,
      borderRadius: 10,
     backgroundColor: msg.from === userData.name ? 'rgb(0, 164, 228)' : 'rgb(150, 150, 150)'}} />
          <View style={styles.metaData}>
            <Text style={{marginRight: 20, fontSize: 12, fontWeight: '700', color: 'gray'}}>{msg.from}</Text>
            <Text style={{fontWeight: '600', fontSize: 12, color: 'rgb(0, 164, 228)'}}>{msg.timestamp}</Text>
          </View>
          <Text style={styles.text}>{msg.message}</Text>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'flex-start', 
        marginLeft: 20,
        marginBottom: 10
    },
    leftBar: {
      height: '100%',
      width: 3,
      backgroundColor: 'rgb(0, 164, 228)',
      position: 'absolute',
      top: 0,
      left: -10,
      borderRadius: 10
    },
    metaData: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    text: {
        fontSize: 18,
        color: 'black'
    }
})

export default Message;


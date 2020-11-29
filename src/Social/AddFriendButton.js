/*
    Add Friend Button Component

    **Note**
    This button is currently fixed on each tab screen so that it's accessible.
    This design is temporary and can be changed for the screens. 
*/

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';



const AddFriendButton = (props) => {
    return (
    <TouchableOpacity style={styles.buttonPosition} activeOpacity={1} onPress={props.addFriend}>
        <View style={styles.button}>
            <Text style={styles.text}>Add Friend</Text>
        </View>                
    </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        height: 30,
        width: 105,
        borderRadius: 12,
        backgroundColor: 'rgba(0, 164, 228, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100           
    },
    text: {
        fontSize: 20,
        color: '#FFF'
    },
    buttonPosition: {
        position: 'absolute',
        left: 10,
        top: 45               
    }
})


export default AddFriendButton;

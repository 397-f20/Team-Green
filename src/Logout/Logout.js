/*
    Logout Button Component

    **Note**
    This button is currently fixed on each tab screen so that it's accessible.
    This design is temporary and can be changed for the screens. 
*/



import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { firebase } from '../../config/firebase'
import { useNavigation } from '@react-navigation/native';
import 'firebase/auth';

import { useUserContext } from '../UserContext';

const Logout = () => {
    const { userUidCallback } = useUserContext();

    const navigation = useNavigation(); // get navigation object

    // Signs user out with firebase
    // Redirects to login page if successful
    const logout = () => {
        userUidCallback(null);
        firebase.auth().signOut()
            .then(function() {
                navigation.navigate('Login');
            })
            .catch(function(err) {
                alert(err.message);
            })
    }

    return (
    <TouchableOpacity style={styles.buttonPosition} onPress={logout} activeOpacity={1}>
        <View style={styles.button}>
            <Text style={styles.text}>Log out</Text>
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
        alignItems: 'center'               
    },
    text: {
        fontSize: 20,
        color: '#FFF'
    },
    buttonPosition: {
        position: 'absolute',
        right: 10,
        top: 45               
    }
})


export default Logout;

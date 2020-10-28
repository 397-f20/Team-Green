import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { firebase } from '../../config/firebase'



const Login = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const login = () => {
        const db = firebase.database().ref('login');
        if (username in db && db[username] === password) {            
            navigation.navigate('Social', { username });
        }
        else {
            Alert.alert('Username or password incorrect');
        }    
    }

    return ( 
        <View style={styles.container}>
            <TextInput 
                style={styles.field} 
                placeholder='Username' 
                value={username} 
                onChangeText={value => setUsername(value)}>
            </TextInput>
            <TextInput 
                style={styles.field} 
                placeholder='Password' 
                secureTextEntry={true} 
                value={password}
                onChangeText={value => setPassword(value)}>
            </TextInput>
            <TouchableOpacity onPress={login}>
                <View style={styles.button}>
                    <Text style={styles.text}>Login</Text>
                </View>                
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    text: {
        fontSize: 40,
        color: '#FFF'
    },
    button: {
        width: '80%',
        height: 30,
        borderRadius: 12,
        backgroundColor: '#2a2a72'
    },
    field: {
        backgroundColor: 'rgba(0, 0, 0, .4)',
        height: 30,
        width: '80%',
        borderRadius: 12
    }
})

export default Login;
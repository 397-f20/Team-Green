import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Animated } from 'react-native';
import { firebase } from '../../config/firebase'

import Background from '../FishTank/Background.js';


const Login = ({navigation}) => {


    const [titleAnimated, setTitleAnimated] = useState(new Animated.Value(0));
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        runTitleAnimation();
    }, [])

    const login = () => {
        const db = firebase.database().ref('login');
        if (username in db && db[username] === password) {            
            navigation.navigate('Social', { username });
        }
        else {
            Alert.alert('Username or password incorrect');
        }    
    }

    const animationDuration = 10000;
    const runTitleAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(titleAnimated, {
                    toValue: 1,
                    duration: animationDuration,
                    useNativeDriver: false
                }),
                Animated.timing(titleAnimated, {
                    toValue: 0,
                    duration: animationDuration,
                    useNativeDriver: false
                })
            ])
        ).start()
    }

    const titleOpacity = 0.7
    const titleColors = {
        color: titleAnimated.interpolate({
            inputRange: [0, 0.25, 0.5, 0.75, 1],
            outputRange: [
                'rgba(255, 47, 92,' + titleOpacity + ')', 
                'rgba(255, 195, 91,' + titleOpacity + ')', 
                'rgba(19, 194, 144,' + titleOpacity + ')', 
                'rgba(17, 127, 171,' + titleOpacity + ')', 
                'rgba(7, 54, 72,' + titleOpacity + ')'
            ]
        })
    }

    const backgroundFish = [
        {idx: 0, size: 80}, 
        {idx: 4, size: 100}, 
        {idx: 3, size: 54}, 
        {idx: 1, size: 44}, 
        {idx: 2, size: 44}, 
        {idx: 5, size: 70}
    ]

    return ( 
        <View style={styles.container}>
            <Background fishObjects={backgroundFish} />
            <Animated.Text style={{...styles.pageTitle, ...titleColors}}>TEMPO</Animated.Text>
            <View style={styles.formContainer}>
                <TextInput 
                    style={styles.field} 
                    placeholder='Username'
                    placeholderTextColor='rgb(0, 164, 228)'
                    value={username} 
                    onChangeText={value => setUsername(value)}>
                </TextInput>
                <TextInput 
                    style={styles.field} 
                    placeholder='Password' 
                    secureTextEntry={true} 
                    placeholderTextColor='rgb(0, 164, 228)'
                    value={password}
                    onChangeText={value => setPassword(value)}>
                </TextInput>
                <TouchableOpacity onPress={login} activeOpacity={1}>
                    <View style={styles.button}>
                        <Text style={styles.text}>Login</Text>
                    </View>                
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    pageTitle: {
        fontSize: 60,
        fontWeight: '900',
        alignSelf: 'center',
        letterSpacing: 7,
        position: 'absolute',
        top: 200
    },
    formContainer: {
        padding: 20, 
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        borderRadius: 12, 
        margin: 20,
        shadowColor: "black",
        shadowOffset: {
        width: 0,
        height: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 5,
        marginTop: 300
    },
    field: {
        backgroundColor: 'rgba(255, 255, 255, .9)',
        height: 30,
        borderRadius: 12,
        marginBottom: 20,
        paddingHorizontal: 8,
        paddingVertical: 4
    },
    text: {
        fontSize: 20,
        color: '#FFF'
    },
    button: {
        height: 30,
        borderRadius: 12,
        backgroundColor: 'rgba(0, 164, 228, 0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Login;
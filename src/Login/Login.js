import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Animated } from 'react-native';
import { firebase } from '../../config/firebase'
import 'firebase/auth';
import { Validation } from './Validation';

import Background from '../FishTank/Background.js';
import { useUserContext } from '../UserContext';

const Login = ({navigation}) => {   
    
    const { userUidCallback } = useUserContext();
    
    const [titleAnimated, setTitleAnimated] = useState(new Animated.Value(0));
    const [displayName, setDisplayName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [createAccount, setCreateAccount] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        checkUserSession();
        runTitleAnimation();
    }, [])

    const login = () => {
        if (createAccount) {
            const validated = Validation(displayName, password, confirmPassword, setErrorMessage);
            if (validated) {
                firebase.auth().createUserWithEmailAndPassword(username, password).then(function (user) {
                    var user = firebase.auth().currentUser;
                    const now = new Date(Date.now());
                    const year = now.getUTCFullYear();
                    const month = now.getUTCMonth();
                    const day = now.getUTCDate();
                    const today = new Date(Date.UTC(year, month, day));
                    const key = today.valueOf();

                    const newUserData = {
                        fish: 0,
                        fishObjects: {},
                        history: {[key] : 0},
                        friends: [{friendUID: user.uid, friendName: displayName, friendEmail: username}],
                        id: user.uid,
                        name: displayName,
                        email: username
                    }
                    firebase.database().ref('users/' + user.uid).set(newUserData);
                    userUidCallback(newUserData.id);
                    navigation.navigate('Home', {screen: 'Timer'});
                }, function (error){
                    console.log(error.message);
                    setErrorMessage(error.message);
                })
            }
        } else {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL) // persistent login can only be cleared on user sign out
                .then(function() {                
                    firebase.auth().signInWithEmailAndPassword(username, password)
                        .then(function(user) {
                            const currentUser = firebase.auth().currentUser;
                            userUidCallback(currentUser.uid)
                            navigation.navigate('Home', {screen: 'Timer'});
                            // const db = firebase.database().ref('users').child(currentUser.uid);
                            // db.on('value', snap => {
                            //     if (snap.val()) {
                            //         userUidCallback(currenUser.id);
                            //         navigation.navigate('Home', {screen: 'Timer'});
                            //     } 
                            // }, error => alert(error))
                    }, function (error){
                        console.log(error.message);
                        setErrorMessage(error.message);
                    })
            })
            .catch(function(error) {
                console.log(error.message);
                setErrorMessage(error.message);
            })
        }    
    }

    // Checks if there is an existing user session
    // If so, sets the user context and then navigates to home stack
    const checkUserSession = () => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {                
                // const db = firebase.database().ref('users').child(user.uid);
                userUidCallback(user.uid)
                navigation.navigate('Home', {screen: 'Timer'});
                // db.on('value', snap => {
                //     if (snap.val()) {
                //         userUidCallback(snapid);
                //         navigation.navigate('Home', {screen: 'Timer'});
                //     } 
                // }, error => alert(error))
            }        
        })
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

    const titleOpacity = 0.7;
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
    };

    const backgroundFish = [
        {idx: 0, size: 80}, 
        {idx: 4, size: 100}, 
        {idx: 3, size: 54}, 
        {idx: 1, size: 44}, 
        {idx: 2, size: 44}, 
        {idx: 5, size: 70}
    ];

    return ( 
        <View style={styles.container}>
            <Background fishObjects={backgroundFish} />
            <View style={styles.pageTitleContainer}>
                <Animated.Text style={[styles.pageTitle, titleColors]}>TEMPO</Animated.Text>
            </View>
            <View style={styles.formContainer}>
                {errorMessage.length > 0 && <Text style={styles.errorMessage}>{ errorMessage }</Text>}
                {createAccount && <TextInput 
                    style={styles.field} 
                    placeholder='Display name'
                    placeholderTextColor='rgb(0, 164, 228)'
                    value={displayName} 
                    onChangeText={value => setDisplayName(value)}>
                </TextInput>}
                <TextInput 
                    style={styles.field} 
                    placeholder='Email'
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
                {createAccount && <TextInput
                    style={styles.field} 
                    placeholder='Confirm password' 
                    secureTextEntry={true} 
                    placeholderTextColor='rgb(0, 164, 228)'
                    value={confirmPassword}
                    onChangeText={value => setConfirmPassword(value)}
                >
                </TextInput>}
                <TouchableOpacity onPress={login} activeOpacity={1}>
                    <View style={styles.button}>
                        <Text style={styles.text}>{createAccount ? 'Create account' : 'Sign in'}</Text>
                    </View>                
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCreateAccount(!createAccount)}>
                    <Text style={styles.createAccountButton}>or, {createAccount ? 'go back to sign in' : 'create an account'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    pageTitleContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    pageTitle: {
        fontSize: 60,
        fontWeight: '900',
        alignSelf: 'center',
        letterSpacing: 7,
        position: 'absolute',
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
    errorMessage: {
        fontSize: 14,
        color: 'red',
        marginBottom: 15
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
    },
    createAccountButton: {
        textDecorationLine: 'underline',
        fontSize: 14,
        color: 'rgb(7, 54, 72)',
        marginTop: 10,
        alignSelf: 'center'
    }
})

export default Login;
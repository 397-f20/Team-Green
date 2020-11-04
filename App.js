// package dependencies
import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View , KeyboardAvoidingView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
const Tab = createBottomTabNavigator();
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import {firebase} from './config/firebase';
import UserContext from './src/UserContext';

// components
import Profile from './src/Profile/Profile.js';
import Social from './src/Social/Social.js';
import Timer from './src/Timer/Timer.js';
import Login from './src/Login/Login';


const Stack = createStackNavigator();

const App = () => {
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS == "ios" ? "padding" : "height"}>
      <MainNavigator />
    </KeyboardAvoidingView>
  )
}

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' head>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Home' component={Home} options={({route}) => ({
          userData: route.params.userData,
          userUID: route.params.userUID
        })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Home = ({route}) => {
  return (      
    <UserContext.Provider value={route}>
      <Tab.Navigator
        initialRouteName="Social"
        tabBarOptions={{activeTintColor: "black", inactiveTintColor: '#2a2a72', style: {backgroundColor: '#00a4e4', borderTopColor: '#00a4e4', color: 'white'}}}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === 'Social') {
              iconName = focused
                ? <MaterialCommunityIcons name="fishbowl" size={24} color="black" />
                : <MaterialCommunityIcons name="fishbowl-outline" size={24} color="#2a2a72" />;
            } else if (route.name === 'Timer') {
              iconName = focused 
                ? <AntDesign name="clockcircle" size={24} color="black" /> 
                : <AntDesign name="clockcircleo" size={24} color="#2a2a72" />;
            } else if (route.name === 'Profile') {
              iconName = focused
                ? <FontAwesome name="user" size={24} color="black" />
                : <AntDesign name="user" size={24} color="#2a2a72" />
            }

            // You can return any component that you like here!
            return iconName;
          },
        })}
      >
        <Tab.Screen name="Social" component={Social} 
        />
        <Tab.Screen name="Timer" component={Timer}
        />
        <Tab.Screen name="Profile" component={Profile} 
        /> 
      </Tab.Navigator>
    </UserContext.Provider>
  );
}

export default App;

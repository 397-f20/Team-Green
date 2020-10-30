// package dependencies
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
const Tab = createBottomTabNavigator();
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { createContext } from 'react';
import UserContext from "./src/UserContext"
import {firebase} from './config/firebase'

import userJSON from './test_data/users.json'

// components
import Profile from './src/Profile/Profile.js';
import Social from './src/Social/Social.js';
import Timer from './src/Timer/Timer.js';
import Login from './src/Login/Login';


const Stack = createStackNavigator();

function TabNavigator() {
  return (      
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
      <Tab.Screen name="Social" component={Social} options={({route}) => ({
        loggedInUser: route.params.username
      })}/>
      <Tab.Screen name="Timer" component={Timer} />
      <Tab.Screen name="Profile" component={Profile} /> 
    </Tab.Navigator>
    
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Home' component={TabNavigator}/>
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

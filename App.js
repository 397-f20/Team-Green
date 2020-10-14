// package dependencies
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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



export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Social"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === 'Social') {
              iconName = focused
                ? <MaterialCommunityIcons name="fishbowl" size={24} color="black" />
                : <MaterialCommunityIcons name="fishbowl-outline" size={24} color="black" />;
            } else if (route.name === 'Timer') {
              iconName = focused 
                ? <AntDesign name="clockcircle" size={24} color="black" /> 
                : <AntDesign name="clockcircleo" size={24} color="black" />;
            } else if (route.name === 'Profile') {
              iconName = focused
                ? <FontAwesome name="user" size={24} color="black" />
                : <AntDesign name="user" size={24} color="black" />
            }

            // You can return any component that you like here!
            return iconName;
          },
        })}
      >
        <Tab.Screen name="Social" component={Social} />
        <Tab.Screen name="Timer" component={Timer} />
        {/* <Tab.Screen name="Profile" component={Profile} /> */}
      </Tab.Navigator>
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

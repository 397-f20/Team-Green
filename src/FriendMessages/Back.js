import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const BackButton = ({navigation}) => {
    return (
      <TouchableOpacity style={styles.buttonPosition} activeOpacity={1} onPress={() => navigation.navigate("Social", {screen: "SocialTab"})}>
          <View style={styles.button}>
              <Text style={styles.text}>Back</Text>
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
        top: 90               
    }
})

export default BackButton;
import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const SendFishFood = ({ callback }) => {

  return (
    <TouchableOpacity style={styles.outerContainer} onPress={callback}>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Gift fish food</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  buttonContainer: {
    opacity: 0.7,
    backgroundColor: 'rgb(7, 54, 72)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 12
  },
  buttonText: {
    fontWeight: '700',
    color: 'white',
  }
})
export default SendFishFood;
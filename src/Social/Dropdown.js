import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Dropdown = (props) => {

  return (
    <View>
      <TouchableOpacity>
        <View style={styles.currentSelection}>
        </View>
      </TouchableOpacity>

      <View>
      </View>
    </View>
  )
}

const SingleOption = (props) => {
  
}

const styles = StyleSheet.create({

})

export default Dropdown;
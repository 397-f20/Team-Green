import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import INTERVALS from '../../config/intervals'; // constant intervals



const IntervalBlock = ({data, isFilled}) => {

    const getBackgroundColor = () => {
        return (isFilled) 
                ? (data.type === 'study') 
                    ? 'blue'
                    : 'orange'
                : 'transparent';
    }    

    const dynamicStyles = {
        width: data.length * 2,
        backgroundColor: getBackgroundColor(),
        borderColor: (data.type === 'study') ? 'blue' : 'orange'
    }

    console.log(dynamicStyles);


    return (
        <View style={{...styles.block, ...dynamicStyles}}/>      
      
    )
}

const styles = StyleSheet.create({
    block: {
        height: 8,
        borderRadius: 10,
        borderWidth: 2                
    }
})



export default IntervalBlock;

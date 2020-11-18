import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import IntervalBlock from './IntervalBlock';

import INTERVALS from '../../config/intervals'; // constant intervals



const ProgressBar = ({intervalProgress}) => {

    
    const dynamicStyles = {        
        color: (INTERVALS[intervalProgress].type === 'study') ? 'blue' : 'orange'
    }

    return (
        <View>
            <View style={styles.intervalBar}>{INTERVALS.map((interval, index) => (
                <IntervalBlock key={index} data={interval} isFilled={intervalProgress > index}/>
            ))}
            </View>
            <View>
                <Text style={{ ...dynamicStyles}}>lorum</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    intervalBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', 
        marginBottom: 10,
        backgroundColor: 'yellow'             
    }
})



export default ProgressBar;

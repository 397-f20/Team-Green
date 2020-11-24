import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import IntervalBlock from './IntervalBlock';

import INTERVALS from '../../config/intervals'; // constant intervals



const ProgressBar = ({intervalProgress, inProgress}) => {

    
    const dynamicStyles = {        
        fontWeight: '600',
        color: (INTERVALS[intervalProgress].type === 'study') ? 'white' : 'black'
    }

    const viewStyles = {
        backgroundColor: (INTERVALS[intervalProgress].type === 'study') ? 'blue' : 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 4
    }

    const getText = () => {
        if (inProgress) {
            if (INTERVALS[intervalProgress].type === 'study') return 'Currently: studying';
            else return 'Currently: taking break';
        }
        if (INTERVALS[intervalProgress].type === 'study') return 'Next up: study';
        else return 'Next up: break'
    }

    return (
        <View style={{alignSelf: 'center'}}>
            <View style={styles.intervalBar}>{INTERVALS.map((interval, index) => (
                <IntervalBlock key={index} data={interval} isFilled={intervalProgress > index}/>
            ))}
            </View>
            <View style={{...viewStyles, opacity: 0.7}}>
            <Text style={{ ...dynamicStyles}}>You've completed {Math.ceil(intervalProgress / 2)} cycle(s). {getText()}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    intervalBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        marginVertical: 10,
    }
})



export default ProgressBar;

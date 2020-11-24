import React from 'react';
import { View } from 'react-native';

const IntervalBlock = ({data, isFilled}) => {

    const getBackgroundColor = () => {
        if (isFilled && data.type === 'study') return 'blue'
        else if (isFilled) return 'orange'
        return 'transparent'
    }

    return (<View style={{
        width: data.length * 1.5 + 5,
        height: 10,
        borderRadius: 10,
        borderWidth: 2,
        marginHorizontal: 5,
        backgroundColor: getBackgroundColor(),
        borderColor: data.type === 'study' ? 'blue' : 'orange'
    }}/>)
}

export default IntervalBlock;

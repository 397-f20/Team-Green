import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native'; 
import { expect, it, done } from '@jest/globals';

import Social from '../src/Social/Social';
import Background from '../src/FishTank/Background';
import Dropdown from '../src/Social/Dropdown';



describe("Social Page Testing", () => {
    it('should render Background', async() => {
        const fishObj = {
            'fishObj': {
                idx: 0,
                size: 50
            }
        }
        const background = render(<Background fishObjects={fishObj} />);
        expect(background).toBeDefined();
    })

    // In Progress
    // it('selecting user updates number of fish', () => {
    //     render(<Social />);
    // })
});
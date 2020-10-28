import React from 'react';
import { render } from '@testing-library/react-native'; 
import { expect, it, done } from '@jest/globals';

import Background from '../src/FishTank/Background';
import Dropdown from '../src/Social/Dropdown';



describe("Social Page Testing", () => {
    it('should render Background', () => {
        const fishObj = {
            'fishObj': {
                idx: 0,
                size: 50
            }
        };
        async() => {
            render(<Background fishObjects={fishObj} />)
        };
    });

    // In Progress
    // it('selecting user updates number of fish', () => {
    //     render(<Social />);
    // })
});
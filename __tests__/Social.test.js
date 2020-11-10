import React from 'react';
import { render } from '@testing-library/react-native'; 
import { expect, it, done } from '@jest/globals';
import ShallowRenderer from 'react-test-renderer/shallow';

import Background from '../src/FishTank/Background';
import Social from '../src/Social/Social';
import Dropdown from '../src/Social/Dropdown';

const renderer = new ShallowRenderer();

describe("Social Page Testing", () => {
    it('should render Background', () => {
        const fishObj = {
            'fishObj': {
                idx: 0,
                size: 50
            }
        };
        async() => {
            const background = render(<Background fishObjects={fishObj} />);
            expect(background).toBeDefined();
        };
    });

    {/*it('user selection matches number of fish', () => {
        const usersTest = {
            'x': {
                fish: 10,
                id: "x",
                name: "Shaggy Rogers"
            },
            'y': {
                fish: 1,
                id: "y",
                name: "Scooby Doo"
            }
        }
        const dropdown = renderer.render(<Dropdown userData={usersTest}/>);
        expect(dropdown.props.userData['x'].fish).not.toEqual(dropdown.props.userData['y'].fish);
    })*/}

});
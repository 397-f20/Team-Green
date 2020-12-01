import React from 'react';
import { render } from '@testing-library/react-native'; 
import { expect, it, done } from '@jest/globals';
import ShallowRenderer from 'react-test-renderer/shallow';

import Background from '../src/FishTank/Background';
import Dropdown from '../src/Social/Dropdown';
import Friends from '../src/Friends/Friends';

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

    it('dropdown components passed in friends', () => {
        async() => {
            const usersTest = {
                'x': {
                    fish: 10,
                    id: "x",
                    name: "Shaggy Rogers",
                    email: "x@abc.com",
                    friends: {
                        "a": {
                            friendName: "Scooby Doo",
                            friendEmail: "y@abc.com",
                            friendUID: "y"
                        }
                    }
                },
                'y': {
                    fish: 1,
                    id: "y",
                    name: "Scooby Doo",
                    email: "y@abc.com",
                    friends: {
                        "b": {
                            friendName: "Shaggy Rogers",
                            friendEmail: "x@abc.com",
                            friendUID: "x"
                        }
                    }
                }
            }
            render(<Dropdown userData={usersTest} loggedIn={usersTest['x']} friendsList={usersTest['x'].friends} />);
        }
    });


    it('leaderboard page renders', () => {
        async() => {
            const Friends = render(<Friends />);
            const leaderboard = Friends.queryByText('Leaderboard');

            expect(leaderboard).toBeTruthy();
        };
    });
});
/*
    Background Component Testing
    
    Unit tests for the fish obtained functionality
*/


import React from 'react';
import { create } from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import {fireEvent, render, act } from '@testing-library/react-native'; // using react native testing library
import { firebase } from '../config/firebase';

import Timer from '../src/Timer/Timer';
import Social from '../src/Social/Social';
import Background from '../src/FishTank/Background';

const shallow = new ShallowRenderer(); // shallow rendering for components
const testUser = 'a'; // user to test on


/*
NOTE: 
All tests use Jest fake timers
Using Jest mock functions to control passing of time
*/

describe('Fish Obtained', () => {
  it('should render Background', () => {
      render(<Background numFish={{idx: 0, size: 1}}/>);    
  });

  it('should render Social', () => {
    render(<Social/>);
  })

  it('should add fish at end of timer', () => {
    let fakeFishCount = {"hello": {idx: 0, size: 1}}; // mock firebase fish count
    const incrementFish = () => fakeFishCount["goodbye"] = {idx:1, size:2}; // mock function for when timer ends

   // const social = render(<Social/>)
   // const initialBackground = social.props.children[0];
   // expect(initialBackground.props.fishObjects).toEqual({});    

    const loadedBackground = shallow.render(<Background fishObjects={fakeFishCount}/>);
    expect(loadedBackground.props.children[1].props.fishObjects).toEqual(fakeFishCount);
    
    incrementFish();

    const reloadedBackground = shallow.render(<Background fishObjects={fakeFishCount}/>);
    expect(reloadedBackground.props.children[1].props.fishObjects).toEqual(fakeFishCount);       
  })
});
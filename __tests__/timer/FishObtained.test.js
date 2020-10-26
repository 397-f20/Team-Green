/*
    Background Component Testing
    
    Unit tests for the fish obtained functionality
*/


import React from 'react';
import { create } from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import {fireEvent, render, act } from '@testing-library/react-native'; // using react native testing library
import { firebase } from '../../config/firebase';

import Timer from '../../src/Timer/Timer';
import Social from '../../src/Social/Social';
import Background from '../../src/FishTank/Background';

const shallow = new ShallowRenderer(); // shallow rendering for components
const testUser = 'a'; // user to test on


/*
NOTE: 
All tests use Jest fake timers
Using Jest mock functions to control passing of time
*/

describe('Fish Obtained', () => {
  it('should render Background', () => {
      render(<Background numFish={5}/>);    
  });

  it('should render Social', () => {
    render(<Social/>);
  })

  it('should add fish at end of timer', () => {
    let fakeFishCount = 10; // mock firebase fish count
    const incrementFish = () => fakeFishCount++; // mock function for when timer ends

    const social = shallow.render(<Social/>)
    const initialBackground = social.props.children[0];
    expect(initialBackground.props.numFish).toEqual(0);    

    const loadedBackground = shallow.render(<Background numFish={fakeFishCount}/>);
    expect(loadedBackground.props.children[1].props.numFish).toEqual(fakeFishCount);
    
    incrementFish();

    const reloadedBackground = shallow.render(<Background numFish={fakeFishCount}/>);
    expect(reloadedBackground.props.children[1].props.numFish).toEqual(fakeFishCount);       
  })
});
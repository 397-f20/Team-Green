/*
    Timer.js Component Testing
    
    Unit tests for the start button functionality
*/


import React from 'react';
import { create } from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import {fireEvent, render, act } from '@testing-library/react-native'; // using react native testing library

import Timer from '../src/Timer/Timer';


const TIME_DURATION = 10; // constant for value the timer should start as in seconds (s) after press 
const renderer = new ShallowRenderer(); // shallow rendering for components

/*
NOTE: 
All tests use Jest fake timers
Using Jest mock functions to control passing of time
*/


describe.skip('Start Timer', () => {   

  it('should render', () => {
    const timer = render(<Timer/>);             
  });

  it('should only show start button', () => {
    const timer = render(<Timer/>);

    const start = timer.queryByText('Start');       
    const pause = timer.queryByText('Pause');
    const restart = timer.queryByText('Restart');
    const completedTask = timer.queryByText(/^Task complete/);

    expect(start).toBeTruthy();    
    expect(pause).toBeNull();
    expect(restart).toBeNull();
    expect(completedTask).toBeNull();   
  });
  
  it('should show correct starting time', () => {
    const timer = render(<Timer/>);

    const displayTime = timer.queryByText('25:00');
    expect(displayTime).toBeTruthy();    
  })

  it('should not start timer on render', () => {
    const timer = render(<Timer/>);

    let displayTime = timer.queryByText('25:00');
    expect(displayTime).toBeTruthy();  

    // wait 2 seconds and check time again
    act(() => jest.runOnlyPendingTimers()); // fast forward time by 1 second
    act(() => jest.runOnlyPendingTimers());
        
    displayTime = timer.queryByText('25:00');
    expect(displayTime).toBeTruthy();  
  });

  it('should trigger start button press', () => {    
    const timer = render(<Timer/>);
    const start = timer.queryByText('Start');
    fireEvent.press(start); 
  });  

  it('should remove start button when pressed', () => {
    const timer = render(<Timer/>);
    let start = timer.queryByText('Start');
    expect(start).toBeTruthy();

    fireEvent.press(start);    

    start = timer.queryByText('Start');
    expect(start).toBeNull();
  });

  it('should show pause and restart buttons when pressed', () => {
    const timer = render(<Timer/>);
    const start = timer.queryByText('Start');

    let pause = timer.queryByText('Pause');
    let restart = timer.queryByText('Restart');
    expect(pause).toBeNull();
    expect(restart).toBeNull();

    fireEvent.press(start);  
    
    pause = timer.queryByText('Pause');
    restart = timer.queryByText('Restart');
    expect(pause).toBeTruthy();
    expect(restart).toBeTruthy();
  })

  it('should start countdown timer at constant time duration', () => {
    const timer = render(<Timer/>);
    const start = timer.queryByText('Start');
    let displayTime = timer.queryByText('25:00');
    expect(displayTime).toBeTruthy();

    fireEvent.press(start);
    
    const queryTime = (TIME_DURATION < 10) // set the new expected time for timer
    ? `00:0${TIME_DURATION}`
    : `00:${TIME_DURATION}`;
    displayTime = timer.queryByText(queryTime);
    expect(displayTime).toBeTruthy();
  });

  it('should decrement time on timer by 1 every second', () => {    
    const timer = render(<Timer/>);
    const start = timer.queryByText('Start');
    let displayTime = timer.queryByText('25:00');
    expect(displayTime).toBeTruthy();    
    
    fireEvent.press(start);   

    // test timer countdown for 4 seconds
    for (t = TIME_DURATION; t > TIME_DURATION - 4; t--) {        
        queryTime = (t < 10) // set the new display time for each interval
            ? `00:0${t}`
            : `00:${t}`;            
        displayTime = timer.queryByText(queryTime);    
        expect(displayTime).toBeTruthy();
        
        act(() => jest.runOnlyPendingTimers()); // fast forward time by 1 second
    }     
  });
});


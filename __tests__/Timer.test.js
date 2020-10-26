import React from 'react';
import {fireEvent, render, act } from '@testing-library/react-native'; 
import {expect, it} from '@jest/globals';
import Timer from '../src/Timer/Timer.js';
import { lessThan } from 'react-native-reanimated';

jest.useFakeTimers();

describe('Timer', () => {
  it('Timer counts down correctly', () => {
    const timer = render(<Timer />)
    const start = timer.queryByText('Start')
    fireEvent.press(start);

    // let renderedTime = '00:10';
    // let timeIsThere = timer.queryByText(renderedTime);
    // expect(timeIsThere).toBeTruthy(); 
    // jest.runOnlyPendingTimers();
    // renderedTime = '00:09';
    // timeIsThere = timer.queryByText(renderedTime);
    // expect(timeIsThere).toBeTruthy(); 
    for (let i = 10; i > 1; i--) {
      let renderedTime = '00:' + i.toString();
      if (i < 10) {
        renderedTime = '00:0' + i.toString();
      }
      let timeIsThere = timer.queryByText(renderedTime);
      expect(timeIsThere).toBeTruthy();
      act(() => jest.runOnlyPendingTimers());
    }
  })
  it('Timer displays time correctly', () => {
    const timer = render(<Timer />)
    const start = timer.queryByText('Start');
    expect(start).toBeTruthy();
  })
});
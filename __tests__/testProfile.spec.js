import React from 'react';
import renderer from 'react-test-renderer';
import Profile from "../src/Profile/Profile";

describe('<Profile />', () => {
    it('renders correctly', () => {
        const test = renderer.create(<Profile />).toJSON();
        expect(test).toMatchSnapshot();
      });

    it('constructs data correctly', () => {
        expect(constructData.mock.results[0].value).toBe('return value');
    })
  });

  
import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native'; 
import { expect, it, done } from '@jest/globals';
import Profile from '../src/Profile/Profile';
import ProfileHeader from '../src/Profile/ProfileHeader';



describe('Profile', () => {
  it('should render Profile User Bar', () => {
    render(<ProfileHeader />);
  })

  it('should render Profile Chart', () => {
    render(<Profile />);
  })

  it('should show username text', () => {
    async () => {
      const username = "Shaggy Rogers";
      const header = render(<ProfileHeader title={username} img={"https://randomuser.me/api/portraits/men/1.jpg"} />);
      const title = header.queryByText(username);
      expect(title).toBeTruthy();
      //expect(header.props.title).not.toBeNaN();
    }
  })

  it('should show progress cycle chart', () => {
    async () => {
      const profile = render(<Profile />);
      const graphDisplayed = profile.queryByText(' Studying Progress (cycles) ');
      expect(graphDisplayed).toBeTruthy();
    }
  })
});

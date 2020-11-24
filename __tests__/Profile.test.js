import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native'; 
import { expect, it, done } from '@jest/globals';
import Profile from '../src/Profile/Profile';
import ProfileHeader from '../src/Profile/ProfileHeader';



describe('Profile', () => {
  it('should render Profile User Bar', () => {
    async () => {
      render(<ProfileHeader />);
    }
  })

  it('should render Profile Chart', () => {
    async () => {
      render(<Profile />);
    }
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

  it('should show total fish in tank', () => {
    async () => {
      const userData = {
        id: "a",
        fish: 10, 
        history: {"1604880000000": 4, "1605052800000": 2},
        name: "Claire"
      }
      const profile = render(<UserSummary userData={userData} />);
      const fishTotal = profile.queryByText('Total Fish: 10');
      expect(fishTotal).toBeTruthy();

      const history = profile.queryByText('Congratulations! You have studied 2 days in total!')
      expect(history.toBeTruthy());
      
    }
  })
});

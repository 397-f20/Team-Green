import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const UserSummary = ({userData}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>
            Congratulations! You have studied {Object.values(userData.history).length} days in total!
        </Text>
        <Text style={styles.text}>
            Total Fish: {userData.fish}
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text:{
    paddingVertical: 10
  }
});

export default UserSummary;

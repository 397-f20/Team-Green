import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const ProfileHeader = ({title, img}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
      <Image style={styles.img} source={img}/>
    </View>
  );
};

ProfileHeader.defaultProps = {
  title: 'Your Name',
  img: "https://randomuser.me/api/portraits/men/1.jpg"
};

const styles = StyleSheet.create({
  header: {
    height: 100,
    padding: 15,
    alignSelf: "stretch",
    backgroundColor: 'darkblue',
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25
  },
  text: {
    color: 'white',
    fontSize: 23,
    paddingVertical: 20
  },
  img:{
    width: 75,
    height: 75,
    borderRadius: 75/2,
    alignSelf: "center",
  }
});

export default ProfileHeader;
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import ProfileHeader from "./ProfileHeader"
import { useUserContext } from '../UserContext';
import 'firebase/auth';
import { firebase } from '../../config/firebase'

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: '#c6d9f7',
  backgroundGradientTo: '#c6d9f7',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  fillShadowGradient: 'blue',
  fillShadowGradientOpacity: 1,
  decimalPlaces: 0, // optional, defaults to 2dp
};

const Profile = ({navigation}) => {
  const { userData, userUidCallback } = useUserContext();
  const [segments, setSegments] = useState(1);
  const [fromZero, setFromZero] = useState(false);
  
  useEffect(() => {
    let max = Object.values(userData.history).reduce(function (a, b) { return Math.max(a, b); });
    if (max > 2){
      setSegments(max);
      setFromZero(true);
    }
    else{
      setSegments(1);
      setFromZero(false);
    }
  },[userData])
  

  // Formats date as month-day
  function getDate (ms) {
    const date = new Date;
    date.setTime(ms);

    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}-${day}`;
  }

  function constructData() {
    let labels = Object.keys(userData.history).map(e => getDate(e));
    let dataPoints = Object.values(userData.history);
    return { labels: labels, datasets: [{ data: dataPoints }] };
  }

  const logoutCallback = () => {
    firebase.auth().signOut()
    .then(function() {
        navigation.navigate('Login');
        userUidCallback(null);
    })
    .catch(function(err) {
        alert(err.message);
    })
    return;
  }

  return (
    <View style={styles.container}>
      <ProfileHeader title={userData.name} img={require('../../assets/profiles/shaggy.jpg')} />
      <ScrollView style={{ alignSelf: "stretch", paddingLeft: 10 }}>
        {Object.keys(userData.history).length > 0 ?
        <React.Fragment>
          <Text style={{paddingVertical: 10}}>
            Congratulations! You have studied {Object.values(userData.history).length} days in total!
          </Text>
          <Text style={styles.graphTitle}> Studying Progress (cycles) </Text>
          <LineChart
            style={styles.graphStyle}
            data={constructData()}
            width={screenWidth * 0.9}
            height={220}
            chartConfig={chartConfig}
            fromZero={fromZero}
            segments={segments}
          /> 
        </React.Fragment> :
        null}

        <TouchableOpacity style={{alignSelf: 'stretch', marginHorizontal: 20}} onPress={logoutCallback}>
          <View style={styles.logout}>
            <Text style={{color: 'white', paddingVertical: 10, fontSize: 18, fontWeight: '500'}}>Log Out</Text>
          </View>
        </TouchableOpacity> 
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
  },
  graphStyle: {
    borderRadius: 16,
    marginTop: 15,
    alignSelf: "center"
  },
  graphTitle: {
    fontSize: 14,
    marginTop: 30,
    alignSelf: "center",
    fontWeight: "bold"
  },
  username: {
    marginTop: 20,
    fontSize: 16
  },
  logout:{
    alignItems: 'center', 
    alignSelf:'stretch', 
    marginVertical: 20,
    backgroundColor: 'rgb(7, 54, 72)',
    justifyContent: 'center',
    borderRadius: 12
  }
});

export default Profile;
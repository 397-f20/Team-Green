import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { firebase } from '../../config/firebase'
import { Dimensions } from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import ProfileHeader from "./ProfileHeader"
import UserContext from '../UserContext';

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
  const [context, setContext] = useContext(UserContext);

  const [user, setUser] = useState({});
  const [usr, setUsr] = useState(context.userData);

  const [history, setHistory] = useState({});
  const [segments, setSegments] = useState(2);

  useEffect(() => {
    const db = firebase.database().ref('users');
    db.on('value', snap => {
      if (snap.val()) {
        setUser(snap.val());
      }
    }, error => console.log(error));
  }, []);

  useEffect(() => {
      if (usr){
        if (usr.id in user){
          setHistory(user[usr.id].history);
          let max = Object.values(user[usr.id].history).reduce(function (a, b) { return Math.max(a, b); });
          setSegments(max);
        }
      }
  }, [user])

  // Formats date as month-day
  function getDate (ms) {
    const date = new Date();
    date.setTime(ms);

    const month = date.getMonth() + 1;
    const day = date.getDay();
    return `${month}-${day}`;
  }

  function constructData(history) {
    let labels = Object.keys(history).map(e => getDate(e));
    let dataPoints = Object.values(history);
    return { labels: labels, datasets: [{ data: dataPoints }] };
  }
  usr.img = require('../../assets/profiles/shaggy.jpg') ////////////////////////eventually get images from server
  return (
    <View style={styles.container}>
      <ProfileHeader title={usr.name} img={usr.img} />
      <ScrollView style={{ alignSelf: "stretch", paddingLeft: 10 }}>
        <Text style={{paddingVertical: 10}}>
          Congratulations! You have studied {Object.values(history).length} days in total!
        </Text>
        <Text style={styles.graphTitle}> Studying Progress (cycles) </Text>
        <LineChart
          style={styles.graphStyle}
          data={constructData(history)}
          width={screenWidth * 0.9}
          height={220}
          chartConfig={chartConfig}
          fromZero={true}
          segments={segments < 10 ? segments : 5}          
        />       
        <TouchableOpacity style={{alignSelf: 'stretch', marginHorizontal: 20}} onPress={() => navigation.navigate("Login")}>
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
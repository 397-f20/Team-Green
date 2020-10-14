import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {firebase} from '../../config/firebase'
import { Dimensions } from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const data = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43, 50]
    }
  ]
};


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

const Profile = () => {
  const [user, setUser] = useState({});
  const [usr, setUsr] = useState({"friends":[]});

  const [history, setHistory] = useState({});
  const [segments, setSegments] = useState(5);

  useEffect(() => {
    const db = firebase.database().ref('users');
    db.on('value', snap => {
      if (snap.val()) {
        setUser(snap.val());
      }
    }, error => console.log(error));
  }, []);


  // Currently user being the users list from JSON and usr being the individual user
  // const usr = user.a;
  useEffect(()=>{
    if ("a" in user) {
      setUsr(user.a);
      setHistory(user.a.history);
      let max = Object.values(user.a.history).reduce(function(a, b) {return Math.max(a, b);});
      setSegments(max);
    }
  }, [user])


  function constructData(history){
    let labels = Object.keys(history).map(e => e.slice(0,4));
    let dataPoints = Object.values(history);
    return {labels: labels, datasets:[{data: dataPoints}]};
  }

  return (
    <View style={styles.container}>
      <Text style={styles.username}> {usr.name} </Text>
      <Text style={styles.graphTitle}> Studying Progress (cycles) </Text>
      <BarChart
        style={styles.graphStyle}
        data={constructData(history)}
        width={screenWidth * 0.75}
        height={220}
        chartConfig={chartConfig}
        fromZero={true}
        segments={segments}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center'
  },
  graphStyle:{
    borderRadius: 16, 
    marginTop: 15
  },
  graphTitle:{
    fontSize: 14,
    marginTop: 30
  },
  username:{
    marginTop: 20,
    fontSize: 16
  }
});

export default Profile;
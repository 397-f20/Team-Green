import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import {firebase} from '../../config/firebase'

import Background from '../FishTank/Background.js';
import { fishArrayLength } from '../FishTank/FishArray';
import UserContext from '../UserContext';

const Timer = () => {

  const data = React.useContext(UserContext);
  console.log(data.params.params.userData)
  const [user, setUser] = useState({});
  const [usr, setUsr] = useState(data.params.params.userData);

  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [completedTask, setCompletedTask] = useState(false);
  const [isStopped, setIsStopped] = useState(true);
  const [fishRendered, setFishRendered] = useState([]);
  const [history, setHistory] = useState([]);

  const timerDuration = 10; 

  useEffect(() => {
    const db = firebase.database().ref('users');
    db.on('value', snap => {
      if (snap.val()) {
        setUser(snap.val());
        if (usr.id in user){
          setHistory(user[usr.id].history);
        }
        if (usr){
          setFishRendered(snap.val()[usr.id].fishObjects);
        }
      }
    }, error => console.log(error));
  }, []);

  // const usr = user.a;
  /*useEffect(()=>{
    if ("a" in user) {
      setUsr(user.a);
    }
  }, [user])
  */

  useEffect(() => {  
    if (time===0 && !isPaused){
      setIsPaused(true);
      setCompletedTask(true);
      addFishObject(usr.id);
      incrementFish(usr.id);
      updateHistory(usr.id);
    }
    else if (!isPaused) {
      setTimeout(() => {
        const tempTime = time - 1;
        setTime(tempTime);
      }, 1000)
    }
  }, [time, isPaused]);

  function addFishObject(userId){
    let idx = Math.floor(Math.random() * fishArrayLength());
    let size = Math.floor(Math.random() * 40) + 25;
    firebase.database().ref('users').child(userId).child('fishObjects').push({idx: idx, size: size});
  }

  function incrementFish(userId) {
    firebase.database().ref('users').child(userId).child('fish').set(usr.fish +1);
  }

  function updateHistory(userId) {
    const now = new Date(Date.now());
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth();
    const day = now.getUTCDay();
    const today = new Date(Date.UTC(year, month, day));
    const key = today.valueOf();
    if (history[key]){
      firebase.database().ref('users').child(userId).child('history').child(key).set( history[key] + 1);
    }
    else{
      firebase.database().ref('users').child(userId).child('history').child(key).set(1);
    }
  }

  function startTimer() {
    setTime(timerDuration);
    setIsPaused(!isPaused);
    setIsStopped(false);
    setCompletedTask(false);
  }

  function stopTimer(){
    setTime(timerDuration);
    setIsPaused(true);
    setIsStopped(true);
    setCompletedTask(false);
  }

  const displayTime = (time) => {
    let tempMinutes = Math.floor(time / 60).toLocaleString('en-US', { minimumIntegerDigits: 2 })
    let tempSeconds = (time % 60).toLocaleString('en-US', { minimumIntegerDigits: 2 })
    if (tempMinutes.length <=1){
      tempMinutes= "0" + tempMinutes}
    if (tempSeconds.length <=1){
      tempSeconds= "0" + tempSeconds
    }
    return tempMinutes + ":" + tempSeconds;
  }

  return (
    <View style={styles.timer}>
      <Background fishObjects={fishRendered} />
      
      <CountdownCircleTimer
        key={isStopped || time=== 0}
        isPlaying={!isPaused}
        duration={timerDuration}
        colors={[
        ['#004777', 0.33],
        ['#9966FF', 0.33],
        ['#0066FF', 0.33],
        ]}
        size={300}
        >
          <Text style={styles.timerText}>{isStopped ? "25:00" : displayTime(time) }</Text>
      </CountdownCircleTimer>

      {isStopped &&
      <TouchableOpacity style={styles.buttonBase} onPress={() => { startTimer() }}>
        <Text style={styles.font}>Start</Text>
      </TouchableOpacity>}
      
      {!isStopped && !completedTask && 
      <TouchableOpacity style={styles.buttonBase} onPress={() => setIsPaused(!isPaused)}>
        <Text style={styles.font}>{isPaused ? "Resume" : "Pause"}</Text>
      </TouchableOpacity>}

      {!isStopped && 
      <TouchableOpacity style={styles.buttonBase} onPress={() => stopTimer()}>
        <Text style={styles.font}>Restart</Text>
      </TouchableOpacity>}

      {completedTask && <Text>Task complete! You've got a new fish!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  timer: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 60
  },
  startButton: {
    fontSize: 38
  },
  buttonBase : {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    height: 60,
    padding: 10,
    minWidth: 90,
    maxWidth: 90,
    backgroundColor: '#004a99'
 },
  font : {
    color: '#f0f2f5',
    fontSize: 15,
    fontWeight:'bold',
  }
});

export default Timer;

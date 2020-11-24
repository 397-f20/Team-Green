import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import {firebase} from '../../config/firebase'

import Background from '../FishTank/Background.js';
import UseFishFoodModal from './UseFishFoodModal.js';
import Logout from '../Logout/Logout';
import ProgressBar from './ProgressBar';

import { useUserContext } from '../UserContext';

import INTERVALS from '../../config/intervals'; // constant intervals

const Timer = () => {
  const { userData } = useUserContext();

  const [time, setTime] = useState(0);
  const [initialTime, setInitialTime] = useState(25);
  const [isPaused, setIsPaused] = useState(true);
  const [completedTask, setCompletedTask] = useState(false);
  const [isStopped, setIsStopped] = useState(true);
  const [intervalProgress, setIntervalProgress] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);

  const timerDuration = 10; 

  useEffect(() => {  
    let timeout; // cleanup variable to clear setTimeout();
    if (time===0 && !isPaused){
      completedCycle();
    }
    else if (!isPaused) {
      timeout = setTimeout(() => {
        const tempTime = time - 1;
        setTime(time - 1);
      }, 1000)
    }

    return () => clearTimeout(timeout); // cleanup function
  }, [time, isPaused]);

  const completedCycle = () => {
    setIsPaused(true);
    setCompletedTask(true);   
    
    if (INTERVALS[intervalProgress].type === 'study') {
      localUpdateHistory(userData.id);
      setModalVisible(true);      
    }

    // resets if at end of 8 intervals
    if (intervalProgress === INTERVALS.length - 1) {
      setIntervalProgress(0);
      setInitialTime(INTERVALS[0].length);
    }
    else {
      setInitialTime(INTERVALS[intervalProgress + 1].length);
      setIntervalProgress(intervalProgress + 1);
    }
  }

  function localUpdateHistory(userId) {
    const now = new Date(Date.now());
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth();
    const day = now.getUTCDate() + 1;
    const today = new Date(Date.UTC(year, month, day));
    const key = today.valueOf();
    if (userData.history && userData.history[key]){
      firebase.database().ref('users').child(userId).child('history').child(key).set( userData.history[key] + 1);
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
      <Background fishObjects={userData.fishObjects} /> 
      <Logout/>
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
          <Text style={styles.timerText}>{isStopped ? `${initialTime}:00` : displayTime(time) }</Text>
      </CountdownCircleTimer>

      <ProgressBar intervalProgress={intervalProgress} inProgress={!isPaused} />
      
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        {isStopped &&
          <TouchableOpacity style={styles.buttonBase} onPress={() => { startTimer() }}>
            <Text style={styles.font}>Start</Text>
          </TouchableOpacity>
        }
        
        {!isStopped && !completedTask && 
          <TouchableOpacity style={styles.buttonBase} onPress={() => setIsPaused(!isPaused)}>
            <Text style={styles.font}>{isPaused ? "Resume" : "Pause"}</Text>
          </TouchableOpacity>
        }

        {!isStopped && 
          <TouchableOpacity style={styles.buttonBase} onPress={() => stopTimer()}>
            <Text style={styles.font}>Restart</Text>
          </TouchableOpacity>
        }
      </View>

      {modalVisible && <UseFishFoodModal style={styles.modal} modalVisible={modalVisible} setModalVisible={setModalVisible}/>}

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
  modal:{
    width: 25, 
    height: 25
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

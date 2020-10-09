import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import {firebase} from '../../config/firebase'

const Timer = () => {
  const [user, setUser] = useState({});
  const [usr, setUsr] = useState({});

  useEffect(() => {
    const db = firebase.database().ref('users');
    db.on('value', snap => {
      if (snap.val()) {
        setUser(snap.val());
      }
    }, error => console.log(error));
  }, []);

  // const usr = user.a;
  useEffect(()=>{
    if ("a" in user) {
      setUsr(user.a);
    }
  }, [user])


  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [completedTask, setCompletedTask] = useState(false);
  const [isStopped, setIsStopped] = useState(true);

  const timerDuration = 10; 

  useEffect(() => {  
    if (time===0 && !isPaused){
      setIsPaused(true);
      setCompletedTask(true);
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

  function incrementFish(userId) {
    firebase.database().ref('users').child(userId).child('fish').set(usr.fish +1);
  }

  function updateHistory(userId) {
    const today = new Date().toDateString();
    if (usr.history[today]) {
      firebase.database().ref('users').child(userId).child('history').child(today).set( usr.history[today] + 1);
    }
    else{
      firebase.database().ref('users').child(userId).child('history').child(today).set(1);
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
    const tempMinutes = Math.floor(time / 60).toLocaleString('en-US', { minimumIntegerDigits: 2 });
    const tempSeconds = (time % 60).toLocaleString('en-US', { minimumIntegerDigits: 2 });
    return `${tempMinutes}:${tempSeconds}`;
  }

  return (
    <View style={styles.timer}>
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
        <Text>Start</Text>
      </TouchableOpacity>}
      
      {!isStopped && !completedTask && 
      <TouchableOpacity style={styles.buttonBase} onPress={() => setIsPaused(!isPaused)}>
        <Text>{isPaused ? "Resume" : "Pause"}</Text>
      </TouchableOpacity>}

      {!isStopped && 
      <TouchableOpacity style={styles.buttonBase} onPress={() => stopTimer()}>
        <Text>Reset</Text>
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
}
});

export default Timer;
import React, { createContext, useCallback, useContext, useState, useEffect } from 'react';
import { firebase } from '../config/firebase'

export const UserContext = createContext({
  userUid: null,
  userData: {},
  userUidCallback: () => {},
})

export const ContextProvider = (props) => {

  const [userUid, setUserUid] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (userUid !== null) {
      firebase.database().ref('users/' + userUid).on('value', snapshot => {
        setUserData(snapshot.val());
      })
    }
  }, [userUid])

  const userUidCallback = useCallback((value) => {
    setUserUid(value)
    if (userUid === null) {
      setUserData({})
    }
  }, []);

  const defaultUserContext = {
    userUidCallback,
    userUid,
    userData
  }

  return (
    <UserContext.Provider value={defaultUserContext}>
      {props.children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);

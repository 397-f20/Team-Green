import React, {useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';

const Dropdown = ({ friendsList, loggedIn, changeUser, currentlySelected }) => {

  const [showDropdown, setShowDropdown] = useState(false);

  const internalChangeUser = (uid) => {
    setShowDropdown(false);
    changeUser(uid);
  }

  return (
    <View >
      <TouchableOpacity style={styles.currentSelection} activeOpacity={1} onPress={() => setShowDropdown(!showDropdown)}>
        <Text style={styles.currentSelectionText}>{currentlySelected.name} {currentlySelected.id === loggedIn ? "(You)" : ""}</Text>
        <Text style={styles.currentSelectionTextCarat}>&#8964;</Text>
      </TouchableOpacity>

      {showDropdown &&
        <ScrollView
          contentContainerStyle={styles.scrollView}
        >
          {
            Object.values(friendsList).map((friend) => (
              <SingleOption user={friend} key={friend.friendUID} changeUser={internalChangeUser} loggedIn={loggedIn} />
            ))
          }
        </ScrollView>}
    </View>
  )
}

const SingleOption = ({ user, changeUser, loggedIn }) => {
  return (
    <TouchableOpacity onPress={() => changeUser(user.friendUID)}>
      <View style={styles.singleOption}>
        <Text>{user.friendName} {user.friendUID === loggedIn ? "(You)" : ""}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5
  },
  currentSelection: {
    flexDirection: 'row',
    marginTop: 150,
    width: Dimensions.get('screen').width - 100,
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginLeft: 50,
    borderRadius: 25,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  currentSelectionText: {
    paddingHorizontal: 20,
    color: 'black',
    fontWeight: '500'
  },
  currentSelectionTextCarat: {
    paddingHorizontal: 20,
    fontSize: 25,
    bottom: 6
  },
  scrollView: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginLeft: 50,
    marginTop: 20,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  singleOption: {
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 1,
    paddingVertical: 10
  }
})

export default Dropdown;
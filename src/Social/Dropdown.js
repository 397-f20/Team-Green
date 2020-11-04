import React, {useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';

const Dropdown = (props) => {

  const [showDropdown, setShowDropdown] = useState(false)

  const changeUser = (user) => {
    setShowDropdown(false);
    props.changeUser(user)
  }

  return (
    <View >
      <TouchableOpacity activeOpacity={1} onPress={() => setShowDropdown(!showDropdown)}>
        <View style={styles.currentSelection}>
          <Text style={styles.currentSelectionText}>{props.selectedUser} {props.selectedUser === props.loggedIn ? "(You)" : ""}</Text>
          <Text style={styles.currentSelectionTextCarat}>&#8964;</Text>
        </View>
      </TouchableOpacity>

      {showDropdown &&
        <ScrollView
          contentContainerStyle={styles.scrollView}
        >
          {
            Object.keys(props.userData).map((user, index) => (
              <SingleOption user={props.userData[user]} key={index} changeUser={() => changeUser(user)} loggedIn={props.loggedIn} />
            ))
          }
        </ScrollView>}
    </View>
  )
}

const SingleOption = (props) => {
  return (
    <TouchableOpacity onPress={props.changeUser}>
      <View style={styles.singleOption}>
        <Text>{props.user.name} {props.user.name === props.loggedIn ? "(You)" : ""}</Text>
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
    alignItems: 'center',
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
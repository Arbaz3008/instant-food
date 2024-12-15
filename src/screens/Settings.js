import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import React from 'react';

const Settings = () => {
  return (

    <View >
      <StatusBar barStyle="light-content" backgroundColor="red" />
      <View style={styles.container}>
      <Text style={styles.headerText}>Settings</Text>
      </View>
      <TouchableOpacity style={[styles.button, styles.profileButton]}>
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.editButton]}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    paddingHorizontal:10,

  },
  headerText: {
    color: 'white',
    fontSize: 24, // Increased font size for better visibility
    fontWeight: 'bold',
    marginBottom: 20, // Adds spacing below the header
  },
  button: {
    width: '90%', 
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal:15 // Adds vertical spacing between buttons
  },
  profileButton: {
    backgroundColor: 'red', // Green background for the profile button
  },
  editButton: {
    backgroundColor: 'red', // Blue background for the edit profile button
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

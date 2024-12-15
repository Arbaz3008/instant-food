import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as Location from 'expo-location';

const Header = () => {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState('Fetching location...');
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);

        const [place] = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });

        if (place) {
          setCity(`${place.city}, ${place.region}`);
        } else {
          setCity('Unknown location');
        }
      } catch (error) {
        setErrorMsg('Error fetching location');
        console.error(error);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.locationContainer}>
        <Entypo name="location-pin" size={24} color="black" style={styles.icon} />
        <View>
          <Text style={styles.locationText}>Location</Text>
          <Text style={styles.cityText}>{errorMsg ? errorMsg : city}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    borderBottomWidth: 1,
    borderColor: 'grey',
    height: 50,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  locationText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cityText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView, TextInput, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import AntDesign from '@expo/vector-icons/AntDesign';
import Categories from '../components/Categories';
import Slider from '../components/Slider';
import FoodCard from '../components/FoodCard';
import { db } from "../../firebase";
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [food, setFooddata] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'FoodData'), (snapshot) => {
      setFooddata(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = handleSearch();
    return () => unsubscribe && unsubscribe();
  }, [searchText]);

  const handleSearch = () => {
    if (!searchText.trim()) {
      setSearchResults([]);
      return;
    }

    const itemsRef = collection(db, 'FoodData');
    const q = query(
      itemsRef,
      where('name', '>=', searchText),
      where('name', '<=', searchText + '\uf8ff')
    );

    const unsubscribeSearch = onSnapshot(q, (snapshot) => {
      const results = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSearchResults(results);
    });

    return unsubscribeSearch;
  };

  const refreshHandler = async () => {
    setRefreshing(true);
    const snapshot = await getDocs(collection(db, 'FoodData'));
    setFooddata(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshHandler} />
      }
    >
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="red" />

        <Header />
        <View style={styles.box}>
          <AntDesign name="search1" size={24} color="red" />
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
          />
        </View>
        <View>
          {searchResults.length > 0 ? (
            <View>
              {searchResults.map(item => (
                <Text key={item.id} style={styles.result}>
                  {item.name}
                </Text>
              ))}
            </View>
          ) : (
            <Text style={styles.noResults}>{}</Text>
          )}
        </View>
        <View>
          <Categories />
        </View>
        <View>
          <Slider />
        </View>
        <View>
          <FoodCard navigation={navigation} data={searchResults.length > 0 ? searchResults : food} />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    borderColor: 'red',
    borderRadius: 30,
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    padding: 4,
    marginVertical: 15,
    alignSelf: 'center',
    elevation: 2,
    backgroundColor: 'white',
  },
  input: {
    marginLeft: 6,
    color: '#c4c4c4',
    width: '90%',
    fontSize: 16,
  },
  result: {
    margin: 10,
    fontSize: 16,
    color: 'black',
  },
  noResults: {
    margin: 10,
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
  },
});

import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, FlatList, SafeAreaView } from 'react-native';
import React from 'react';

const FoodCard = ({navigation , data}) => {
  const openProducthandler = (item) =>{
    navigation.navigate('ProductScreen', { item })
  }
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Today's Special Offers</Text>
        <SafeAreaView>
           <FlatList style={styles.flatlist}
           horizontal
           showsHorizontalScrollIndicator ={false}
           data={data}
           renderItem={({ item }) => (
  <TouchableOpacity style={styles.touch} onPress={() =>{openProducthandler(item)} }>
    <View style={styles.slide}>
      <Image source={{ uri: item.image }} style={styles.image} />
    </View>
    <View style={styles.cardin1}>
      <Text style={styles.title}>{item.name}</Text>
    </View>
    <View style={styles.cardin2}>
      <Text style={styles.title2}>{item.category}</Text>
      <Text style={styles.title3}>
        | Price -
        <Text style={styles.oldPrice}> {item.oldPrice} </Text>
      </Text>
      <Text style={styles.discountPrice}> {item.discountPrice}</Text>
      <Text style={styles.title4}> | {item.type}</Text>
    </View>
  </TouchableOpacity>
)}
/>
</SafeAreaView>
    </View>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  head: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
    bottom:2
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
  touch: {
    width: 300,
    height: 200,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginHorizontal:8
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardin1: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardin2: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    bottom:5
  },
  title2: {
    fontSize: 14,
    color: '#555',
  },
  title3: {
    fontSize: 14,
    color: '#555',
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  discountPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e63946',
  },
  title4: {
    fontSize: 14,
    color: '#28a745',
    fontWeight: 'bold',
  },
});

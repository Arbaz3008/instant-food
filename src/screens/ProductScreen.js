import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Alert } from 'react-native';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useUser } from '../context/UserContext';

const ProductScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useUser();
  const { item: data } = route.params;
  const [quantity, setQuantity] = useState('0');

  const addtocarthandler = async () => {
    const date = new Date().getTime().toString();
    const docRef = doc(db, 'users', user.uid, 'usercart', user.uid); // Adjust according to your user ID management
    const foodData = {
      item_id: data.id,
      image: data.image, 
      foodQuantity: parseInt(quantity, 10),
      userid: user.uid, // Adjust according to your user ID management
      cartItemid: `${date}_${user.uid}`, // Adjust according to your user ID management
    };

    try {
      const docSnap = await getDoc(docRef);
      let cartItems = docSnap.exists() ? docSnap.data().cartItems || [] : [];
      const existingItemIndex = cartItems.findIndex((item) => item.item_id === data.id);

      if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].foodQuantity += foodData.foodQuantity;
      } else {
        cartItems.push(foodData);
      }

      await setDoc(docRef, { cartItems }, { merge: true });
      Alert.alert('Success', 'Item added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      Alert.alert('Error', 'Failed to add item to cart. Please try again.');
    }
  };

  const validateQuantity = (val) => {
    const numericValue = parseInt(val, 10);
    return isNaN(numericValue) || numericValue < 1 ? '1' : numericValue.toString();
  };

  const decreaseHandler = () => {
    setQuantity((prev) => validateQuantity((parseInt(prev) - 1).toString()));
  };

  const increaseHandler = () => {
    setQuantity((prev) => validateQuantity((parseInt(prev) + 1).toString()));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('MainTabs')}>
          <Text style={styles.headerText}>Closed</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.productContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: data.image }} style={styles.image} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{data.name}</Text>
            <Text style={styles.productPrice}>{data.discountPrice}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>About Item</Text>
            <Text style={styles.descriptionText}>{data.About}</Text>
            <Text style={styles.vegText}>{data.type}</Text>
          </View>
          <View style={styles.restaurantInfo}>
            <Text style={styles.sectionTitle}>Restaurant Name</Text>
            <Text style={styles.restaurantName}>{data.restaurantName}</Text>
          </View>
          <View style={styles.qntyc}>
            <Text style={styles.qtitle}>Quantity</Text>
            <View style={styles.count}>
              <TouchableOpacity onPress={decreaseHandler}>
                <Text style={styles.menus}>-</Text>
              </TouchableOpacity>
              <TextInput style={styles.textinput} value={quantity} onChangeText={(val) => setQuantity(validateQuantity(val))} />
              <TouchableOpacity onPress={increaseHandler}>
                <Text style={styles.plus}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={addtocarthandler}>
            <Text style={styles.buttonText}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'red',
    padding: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  productContainer: {},
  image: {
    width: '100%',
    height: 220,
  },
  infoContainer: {
    backgroundColor: '#ebebeb',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    elevation: 2,
    position: "relative",
    top: -20,
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  productName: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 20,
    color: 'black',
  },
  vegText: {
    fontSize: 15,
    color: 'white',
    backgroundColor: "green",
    borderRadius: 10,
    textAlign: "center",
    width: 70,
    paddingHorizontal: 15,
    paddingVertical: 4,
    marginTop: 2,
    marginBottom: 2
  },
  restaurantInfo: {
    marginTop: 10,
    backgroundColor: "#F2F2F2",
    width: "100%",
    padding: 20,
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: 10,
    elevation: 2,
    alignItems: "center"
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 120,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qntyc: {
    width: "90%",
    alignSelf: "center",
    alignItems: "center"
  },
  qtitle: {
    color: 'grey',
    fontSize: 18,
    fontWeight: "700"
  },
  count: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10
  },
  menus: {
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    elevation: 2,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    padding: 10
  },
  plus: {
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    padding: 10
  },
  textinput: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    elevation: 2,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "white",
    padding: 10,
    width: 50,
    marginHorizontal: 10,
    elevation: 2,
    textAlign: "center"
  }
});

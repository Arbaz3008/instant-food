import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, Alert, RefreshControl } from 'react-native';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useUser } from '../context/UserContext';

const UserCart = ({ navigation }) => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCartItems = async () => {
    try {
      const docRef = doc(db, 'users', user.uid, 'usercart', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCartItems(docSnap.data().cartItems || []);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleRemoveItem = async (cartItemid) => {
    try {
      const docRef = doc(db, 'users', user.uid, 'usercart', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const updatedCartItems = docSnap.data().cartItems.filter((item) => item.cartItemid !== cartItemid);
        await setDoc(docRef, { cartItems: updatedCartItems }, { merge: true });
        setCartItems(updatedCartItems);
        Alert.alert('Success', 'Item removed from cart successfully!');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      Alert.alert('Error', 'Failed to remove item from cart. Please try again.');
    }
  };

  const handleCheckout = async () => {
    try {
      const docRef = doc(db, 'users', user.uid, 'usercart', user.uid);
      await deleteDoc(docRef);
      setCartItems([]);
      Alert.alert('Success', 'Checkout successful!');
      navigation.navigate('OrderSummary', { cartItems });
    } catch (error) {
      console.error('Error during checkout:', error);
      Alert.alert('Error', 'Checkout failed. Please try again.');
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchCartItems();
    setRefreshing(false);
  }, []);

  const renderEmptyCart = () => (
    <View style={styles.emptyCartContainer}>
      <Text style={styles.emptyCartText}>Your cart is empty!</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.cartItemid}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>Quantity: {item.foodQuantity}</Text>
              <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(item.cartItemid)}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        ListEmptyComponent={renderEmptyCart}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      {cartItems.length > 0 && (
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UserCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 20,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemQuantity: {
    fontSize: 16,
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
    width:100,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
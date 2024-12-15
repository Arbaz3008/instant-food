import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider, useUser } from './src/context/UserContext'
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ForgetScreen from './src/screens/ForgetScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';
import ProductScreen from './src/screens/ProductScreen';
import UserCart from './src/screens/UserCart';
import Settings from './src/screens/Settings';
import TrackOrders from './src/screens/TrackOrders';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  const { user } = useUser();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: styles.tabBar,
        headerShown: false,
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Settings') {
            iconName = 'cog';
          } else if (route.name === 'Orders') {
            iconName = 'reorder';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          } else if (route.name === 'Cart') {
            iconName = 'shopping-cart';
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={UserCart} />
      <Tab.Screen name="Orders" component={TrackOrders} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

const HomeStack = () => {
  const { user } = useUser();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <>
          {/* MainTabs for authenticated users */}
          <Stack.Screen name="MainTabs" component={HomeTabs} />
          <Stack.Screen name="ProductScreen" component={ProductScreen} />
        </>
      ) : (
        <>
          {/* Login/Registration for unauthenticated users */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Forget" component={ForgetScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <UserProvider>
          <NavigationContainer>
            <HomeStack />
          </NavigationContainer>
        </UserProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderTopWidth: 4,
    elevation: 10,
    shadowColor: '#FF073A',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    borderWidth: 2,
  },
});

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import DetailContact from '../screens/DetailContact';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailContact} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;

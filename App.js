import React, { Component } from "react";
import BottomTabNavigator from "./components/BottomTabNavigator";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import Login from "./screens/Login";


const Stack = createStackNavigator()

export default function App() {
  return (
     <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='screen1' component={Login}/>
        <Stack.Screen name='screen2' component={BottomTabNavigator}/>
        </Stack.Navigator>
        </NavigationContainer>
  );
}
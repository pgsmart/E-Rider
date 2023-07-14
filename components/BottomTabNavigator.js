import React, { Component } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import RideScreen from "../screens/Ride";
import RideHistoryScreen from "../screens/RideHistory";

const Tab = createBottomTabNavigator();

export default class BottomTabNavigator extends Component {
  render() {
    return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

               if (route.name === "Ride") {
                 iconName = focused ? "bicycle": 'bicycle-outline';
               } else if (route.name === "Ride History") {
                 iconName = focused ? "time" : 'time-outline';
               }

              return (
                <Ionicons
                  name={iconName}
                  size={50}
                  color={color}
                />
              );
            }
          })}
          tabBarOptions={{
            activeTintColor: "#FBE5C0",
            inactiveTintColor: "black",
            style: {
              height: 100,
              borderTopWidth: 0,
              backgroundColor: "#F88379"
            },
            labelStyle: {
              fontSize: 20,
              fontFamily: "sans-serif"
            },
            labelPosition: "below-icon",
            tabStyle: {
              alignItems: "center",
              justifyContent: "center"
            }
          }}
        >
          <Tab.Screen name="Ride" component={RideScreen} />
          <Tab.Screen name="Ride History" component={RideHistoryScreen} />
        </Tab.Navigator>
    );
  }
}
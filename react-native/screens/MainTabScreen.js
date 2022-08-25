import React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
// import Icon from 'react-native-vector-icons/Ionicons';
import { Entypo, Ionicons } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import DetailsScreen from "./DetailsScreen";
import ExploreScreen from "./ExploreScreen";
import ProfileScreen from "./ProfileScreen";
import { Button } from "react-native-paper";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import ProgressReport from "./ProgressReport";
import SessionScreen from "./SessionScreen";
import RoomIndexScreen from "./TaskRoom/RoomIndexScreen";
import Pomodoro from "./Pomodoro";
import Schedule from "./../components/Schedule/Schedule";

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const CustomTabButtom = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: "center",
      alignItems: "center",
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#e32f45",
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const MainTabScreen = ({ navigation }) => (
  <Tab.Navigator
    // initialRouteName="Home"
    // activeColor="#fff"
    tabBarOptions={{
      showLabel: false,
      style: {
        position: "absolute",
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: "#ffffff",
        borderRadius: 15,
        height: 90,
      },
    }}
  >
    <Tab.Screen
      name="Dashboard"
      component={HomeScreen}
      options={{
        tabBarLabel: "Home",
        tabBarColor: "#3c40bd",
        tabBarIcon: ({ color }) => (
          <Image
            source={require("../icons/home.png")}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Schedule"
      component={Schedule}
      options={{
        tabBarLabel: "Schedule",
        tabBarColor: "#3c40bd",
        tabBarIcon: ({ color }) => (
          <Image
            source={require("../icons/schedule.png")}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Voice"
      component={DetailsScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <Image
            source={require("../icons/mic.png")}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          />
        ),
        tabBarButton: (props) => <CustomTabButtom {...props} />,
      }}
    />
    <Tab.Screen
      name="Space"
      component={RoomIndexScreen}
      options={{
        tabBarLabel: "Space",
        tabBarColor: "#694fad",
        tabBarIcon: ({ color }) => (
          <Image
            source={require("../icons/space.png")}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="More"
      component={() => null}
      listeners={() => ({
        tabPress: (e) => {
          e.preventDefault(); // Prevents navigation
          navigation.openDrawer();
        },
      })}
      options={{
        tabBarLabel: "More",
        tabBarColor: "#d02860",
        tabBarIcon: ({ color }) => (
          <Image
            source={require("../icons/more.png")}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#3c40bd",
        height: 100,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontSize: 30,
        fontWeight: "bold",
      },
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: "Hi Krishna",
        headerRight: () => (
          <Button
            name="ios-menu"
            size={25}
            backgroundColor="#3c40bd"
            onPress={() => navigation.openDrawer()}
          >
            <Entypo name="menu" size={24} color="black" />
          </Button>
        ),
      }}
    />
  </HomeStack.Navigator>
);

const DetailsStackScreen = ({ navigation }) => (
  <DetailsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#1f65ff",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <DetailsStack.Screen
      name="Details"
      component={DetailsScreen}
      options={{
        headerLeft: () => (
          <Button
            name="ios-menu"
            size={25}
            backgroundColor="#3c40bd"
            onPress={() => navigation.openDrawer()}
          >
            <Entypo name="menu" size={24} color="black" />
          </Button>
        ),
      }}
    />
  </DetailsStack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  shadow: {
    shadowColor: "#7f5df0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

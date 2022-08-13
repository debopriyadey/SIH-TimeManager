import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// import Icon from 'react-native-vector-icons/Ionicons';
import { Entypo, Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';
import { Button } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ProgressReport from './ProgressReport';
import SessionScreen from './SessionScreen';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const CustomTabButtom = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#e32f45'
      }}>
      {children}
    </View>
  </TouchableOpacity>
)

const MainTabScreen = () => (
  <Tab.Navigator
    // initialRouteName="Home"
    // activeColor="#fff"
    tabBarOptions={{
      showLabel: false,
      style: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        height: 90,
      }
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#009387',
        tabBarIcon: ({ color }) => (
          <Entypo name="home" size={24} color="black" />
        ),
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={DetailsScreen}
      options={{
        tabBarLabel: 'Updates',
        tabBarColor: '#1f65ff',
        tabBarIcon: ({ color }) => (
          <Entypo name="notification" size={24} color="black" />
        ),
      }}
    />
    <Tab.Screen
      name="Voice"
      component={DetailsScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <Ionicons name="person-circle" size={24} color={focused ? "#fff" : "#1f1f1f"} />
        ),
        tabBarButton: (props) => (
          <CustomTabButtom {...props} />
        )
      }}
    // options={{
    //   tabBarIcon: ({ focused }) => (
    //     <View style={{ alignItems: 'center', justifyContent: 'center', top: 20 }}>
    //       <Image
    //         source={require('../...')}
    //         resizeMode="contain"
    //         style={{
    //           width: 25,
    //           height: 25,
    //           tintColor: focused ? "#fff" : "#1f1f1f",
    //         }}
    //       />
    //       <Text
    //         style={{ color: focused ? '#fff' : '#1f1f1f', fontSize: 12 }}>
    //         Speak
    //       </Text>

    //     </View>
    //   )
    // }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarColor: '#694fad',
        tabBarIcon: ({ color }) => (
          <Ionicons name="person-circle" size={24} color="black" />
        ),
      }}
    />
    <Tab.Screen
      name="Session"
      component={SessionScreen}
      options={{
        tabBarLabel: 'Session',
        tabBarColor: '#d02860',
        tabBarIcon: ({ color }) => (
          <Ionicons name="aperture" size={24} color="black" />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  shadow: {
    shadowColor: '#7f5df0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  },
});


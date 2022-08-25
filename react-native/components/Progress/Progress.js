import React from "react";
import { View, Text, StatusBar, StyleSheet, Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Weekly from "./Weekly";
import Monthly from "./Monthly";
import Daily from "./Daily";

const Tab = createMaterialTopTabNavigator();
function Progress() {
  return (
    <Tab.Navigator
      style={styles.Tab}
      sceneContainerStyle={styles.scene}
      initialRouteName="Daily"
      backBehavior="history"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarStyle: { backgroundColor: "#3c40bd", padding: 3 },
        tabBarIndicatorStyle: {
          backgroundColor: "rgba(0,0,0,0)",
          height: "100%",
          borderColor: "white",
          borderWidth: 2,
        },
      }}
    >
      <Tab.Screen name="Weekly" component={Weekly} />
      <Tab.Screen name="Daily" component={Daily} />
      <Tab.Screen name="Monthly" component={Monthly} />
    </Tab.Navigator>
  );
}

export default Progress;
const styles = StyleSheet.create({
  Tab: {
    paddingTop: 10,
    overflow: "scroll",
  },
  scene: {
    padding: 10,
    width: Dimensions.get("window").width,
    overflow: "scroll",
  },
});

import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Animated,
  Dimensions,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { LinearGradient } from "expo-linear-gradient";
import { format } from "date-fns";

const HEIGHT = Dimensions.get("window").height;

function ListItem({ item, status }) {
  const {
    name,
    desc,
    duration,
    selectedTime,
    endTime,
    startTime,
    importance,
    urgent,
    date,
  } = item;
  const LeftAction = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return (
      <LinearGradient
        colors={["#009387", "#46a39c", "#1fc4b7"]}
        style={styles.leftAction}
      >
        <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
          Delete
        </Animated.Text>
      </LinearGradient>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.taskView}>
        <GestureHandlerRootView>
          <Swipeable renderLeftActions={LeftAction}>
            <TouchableHighlight
              underlayColor="#C0C0C0"
              onPress={() => console.log("btn clicked")}
            >
              <View
                style={[
                  styles.textView,
                  {
                    backgroundColor:
                      status === "Upcoming" ? "#c1dcef" : " #cfd0ef",
                  },
                ]}
              >
                <Text style={{ fontSize: 15 }}>{name}</Text>
                <Text style={{ color: "#878787" }}>{desc}</Text>
                <Text>
                  {duration} {selectedTime}
                </Text>
                <View style={styles.timeView}>
                  <Text>{format(new Date(startTime), "hh:mm a")}</Text>
                  <Text>•{status}</Text>
                </View>
              </View>
            </TouchableHighlight>
          </Swipeable>
        </GestureHandlerRootView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT / 7,
    width: "100%",
    borderRadius: 15,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  seperator: {
    width: "100%",
    height: 5,
    backgroundColor: "#C0C0C0",
  },
  leftAction: {
    backgroundColor: "#009387",
    justifyContent: "center",
    flex: 1,
  },
  actionText: {
    color: "white",
    fontWeight: "600",
    padding: 10,
  },
  taskView: {
    height: "100%",
    width: "100%",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "white",
  },

  textView: {
    padding: 15,
    borderRadius: 15,
    height: "100%",
    backgroundColor: "#cfd0ef",
    justifyContent: "flex-start",
    // elevation: 5,
  },
  timeView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default ListItem;

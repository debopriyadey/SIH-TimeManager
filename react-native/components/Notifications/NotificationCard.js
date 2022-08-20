import React from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

function NotificationCard({
  title,
  subTitle,
  image,
  renderRightActions,
  manageScreen,
}) {
  const getname = (image) => {
    if (image == "Task") {
      return "android-messages";
    }
    if (image == "Promodoro") {
      return "clock-check-outline";
    }
    if (image == "Progress") {
      return "progress-check";
    }
  };
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight underlayColor="#e3e1e1" onPress={manageScreen}>
          <View style={styles.container}>
            <View style={styles.iconView}>
              <MaterialCommunityIcons
                name={getname(image)}
                size={28}
                color="#3c40bd"
              />
            </View>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subTitle}>{subTitle}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

export default NotificationCard;
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flexDirection: "row",
    margin: 5,
    alignItems: "center",
    backgroundColor: "white",
    elevation: 2,
  },
  iconView: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "500",
  },
  subTitle: {
    fontSize: 12,
    color: "#827f7f",
  },
});

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";

export default function DayRepeat({ name, selected, onPress }) {
  const styleView = selected
    ? [styles.container, styles.selectedView]
    : styles.container;
  const textStyle = selected
    ? [styles.text, styles.selectedLebel]
    : styles.text;
  return (
    <View style={styleView}>
      <TouchableOpacity onPress={() => onPress(name)}>
        <Text style={textStyle}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    width: Dimensions.get("window").width / 9,
    height: Dimensions.get("window").width / 9,
    borderRadius: 20,
    borderColor: "#3c40bd",
    borderWidth: 1,
  },
  selectedView: {
    backgroundColor: "#3c40bd",
    borderRadius: 20,
  },
  selectedLebel: {
    color: "white",
  },
  text: {
    color: "black",
  },
});

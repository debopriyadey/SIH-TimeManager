import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import AppButton from "./AppButton";

function TimeDuration({ value, onFocus, onPress, placeholder }) {
  return (
    <View style={styles.flex_view}>
      <TextInput
        value={value}
        onFocus={onFocus}
        style={[styles.input, { width: "87%" }]}
        placeholder={placeholder}
        placeholderTextColor={styles.placeholder.color}
      />
      <AppButton
        name="clockcircleo"
        color="black"
        txtStyle={styles.icon}
        onPress={onPress}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    height: 50,
    paddingLeft: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#C0C0C0",
    backgroundColor: "white",
    borderRadius: 5,
  },
  flex_view: {
    width: "100%",
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  placeholder: {
    color: "#666666",
  },
  icon: {
    paddingHorizontal: 10,
  },
});
export default TimeDuration;

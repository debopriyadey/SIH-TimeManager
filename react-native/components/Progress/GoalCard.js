import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProgressBar } from "react-native-paper";

function GoalCard({ name, progress, desc }) {
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Text>{desc}</Text>
      <ProgressBar progress={progress} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 100,
    padding: 10,
    justifyContent: "center",
    elevation: 2,
    margin: 5,
    borderColor: "#C0C0C0",
    backgroundColor: "white",
    borderRadius: 10,
  },
});
export default GoalCard;

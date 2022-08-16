import React from "react";
import { View, StyleSheet, Text, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function TaskCard({ task }) {
  const { startTime, endTime, name, desc } = task;
  return (
    <View style={styles.taskCard}>
      <MaterialIcons name="add-task" size={50} color="#009387" />
      <View style={{ marginLeft: 20 }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }} numberOfLines={2}>
          {name}
        </Text>
        <View style={styles.cardView}>
          {desc ? <Text style={{ fontSize: 15 }}>{desc}</Text> : null}
          <View>
            <Text>
              from:- <Text>{startTime.toLocaleTimeString()}</Text>
            </Text>
            <Text>
              To:- <Text>{endTime.toLocaleTimeString()}</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  taskCard: {
    padding: 10,
    marginTop: 10,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    elevation: 5,
  },
  cardView: {
    marginLeft: 10,
    padding: 10,
  },
});
export default TaskCard;

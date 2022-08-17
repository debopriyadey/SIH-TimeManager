import { isSameDay } from "date-fns";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";

function WeekCalander({ date, weekDays, onChange }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={weekDays}
        bounces={false}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const viewStyle = [styles.weekDay];
          const textStyle = [styles.weekDayText];
          if (isSameDay(item.date, date)) {
            viewStyle.push(styles.selectedLebel);
            textStyle.push(styles.selectedLebelText);
          }
          return (
            <TouchableWithoutFeedback onPress={() => onChange(item.date)}>
              <View style={viewStyle}>
                <Text style={textStyle}>{item.formatted}</Text>
                <Text style={textStyle}>{item.day}</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  weekDay: {
    margin: 7,
    width: 50,
    height: 60,
    backgroundColor: "#5158e3",
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  weekDayText: {
    color: "white",
    fontSize: 15,
  },
  selectedLebel: {
    backgroundColor: "#e8e7e4",
    transform: [{ scale: 1.1 }],
    elevation: 7,
  },
  selectedLebelText: {
    color: "#1532c2",
    fontSize: 17,
  },
});
export default WeekCalander;

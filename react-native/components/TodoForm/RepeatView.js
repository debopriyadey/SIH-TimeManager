import React from "react";
import { View, Text, Switch, FlatList, StyleSheet } from "react-native";
import DayRepeat from "../Common/DayRepeat";

function RepeatView({ todoData, Weekdays, setTodoData }) {
  return (
    <View style={styles.dayView}>
      <View style={styles.switch}>
        <Text style={{ marginLeft: 10 }}>ALL Days?</Text>
        <Switch
          value={todoData.days.length === 7 ? true : false}
          onValueChange={(newValue) => {
            if (newValue === true) {
              const tempDays = [
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
              ];
              setTodoData((prev) => ({
                ...prev,
                days: tempDays,
              }));
            } else {
              const tempDays = [];
              setTodoData((prev) => ({ ...prev, days: tempDays }));
            }
          }}
        />
      </View>
      <View style={styles.repeat}>
        <FlatList
          data={Weekdays}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <DayRepeat
                name={item.name}
                selected={todoData.days.includes(item.name) ? true : false}
                onPress={(name) => {
                  const tempDays = [...todoData.days];
                  if (todoData.days.includes(name)) {
                    const od = tempDays.filter((day) => day !== name);
                    setTodoData((prev) => ({ ...prev, days: od }));
                  } else {
                    tempDays.push(name);
                    setTodoData((prev) => ({
                      ...prev,
                      days: tempDays,
                    }));
                  }
                }}
              />
            );
          }}
          horizontal={true}
        />
      </View>
    </View>
  );
}

export default RepeatView;
const styles = StyleSheet.create({
  dayView: {
    width: "100%",
    paddingHorizontal: 10,
    backgroundColor: "#C0C0C0",
    elevation: 2,
  },
  switch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  repeat: {
    paddingVertical: 5,
  },
});

import React from "react";
import { View, Text, Switch, FlatList, StyleSheet } from "react-native";
import { getDateValue } from "../../utils";
import DayRepeat from "../Common/DayRepeat";

function RepeatView({ todoData, Weekdays, setTodoData }) {
  return (
    <View style={styles.dayView}>
      <View style={styles.switch}>
        <Text style={{ marginLeft: 10 }}>ALL Days?</Text>
        <Switch
          trackColor={{ false: "#C0C0C0", true: "#787cfa" }}
          thumbColor="#3c40bd"
          value={todoData.days.length === 7 ? true : false}
          onValueChange={(newValue) => {
            if (newValue === true) {
              const tempDays = [
                0,
                1,
                2,
                3,
                4,
                5,
                6
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
                selected={todoData.days.includes(getDateValue(item.name)) ? true : false}
                onPress={(name) => {
                  console.log(name)
                  let day = getDateValue(name)

                  const tempDays = [...todoData.days];
                  if (tempDays.includes(day)) {
                    const od = tempDays.filter((d) => d !== day);
                    setTodoData((prev) => ({ ...prev, days: od }));
                  } else {
                    tempDays.push(day);
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
    backgroundColor: "#dedcdc",
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

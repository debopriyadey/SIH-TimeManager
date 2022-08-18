import {
  addDays,
  format,
  getDate,
  getMonth,
  isSameDay,
  isFuture,
} from "date-fns";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import Tasks from "../../model/Tasks";
import ListItem, { Seperator } from "./ListItem";
import WeekCalander from "./WeekCalander";

function Schedule() {
  const [list, setList] = useState(Tasks);
  const [date, setDate] = useState(new Date());
  const [weekDays, setWeekDays] = useState([]);
  useEffect(() => {
    const dates = [];
    for (let index = 0; index < 7; index++) {
      const tempDate = addDays(date, index);
      const dateObj = {
        id: index,
        formatted: format(tempDate, "EEE"),
        date: tempDate,
        day: getDate(tempDate),
      };
      dates.push(dateObj);
    }
    setWeekDays(dates);
  }, []);

  return (
    <View style={styles.background}>
      <View style={{ padding: 10, flexBasis: "25%" }}>
        <View style={styles.monthView}>
          <Text style={styles.monthText}>{format(date, "MMMM yyyy ")}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: "#1532c2", fontSize: 25 }}>+</Text>
          </TouchableOpacity>
        </View>
        <WeekCalander
          date={date}
          weekDays={weekDays}
          onChange={(newDate) => setDate(newDate)}
        />
      </View>
      <View style={styles.taskView}>
        <Text style={{ fontSize: 20, margin: 10 }}>
          Tasks of -{" "}
          {isSameDay(new Date(), date) ? "Today" : format(date, "do MMMM")}
        </Text>

        <FlatList
          nestedScrollEnabled={true}
          data={list.filter((item) => isSameDay(new Date(item.date), date))}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListItem
              item={item}
              status={isFuture(new Date(item.date)) ? "Upcoming" : "passed"}
            />
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    width: "100%",
    overflow: "scroll",
    backgroundColor: "#3c40bd",
    display: "flex",
  },
  monthView: {
    height: "53%",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  monthText: {
    fontSize: 25,
    color: "white",
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  taskView: {
    flexBasis: "75%",
    backgroundColor: "white",
    padding: 10,
    paddingBottom: 5,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
});
export default Schedule;

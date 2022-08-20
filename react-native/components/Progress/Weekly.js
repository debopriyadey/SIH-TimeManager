import { subDays, format, getDate } from "date-fns";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";
import WeekCalander from "../Schedule/WeekCalander";

const Weekly = () => {
  const graphData = [
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 5 },
    { x: 4, y: 4 },
    { x: 5, y: 7 },
    { x: 6, y: 4 },
    { x: 7, y: 6 },
  ];
  const [date, setDate] = useState(new Date());
  const [weekDays, setWeekDays] = useState([]);
  const [data, setData] = useState(graphData);
  useEffect(() => {
    const dates = [];
    for (let index = 0; index < 6; index++) {
      const tempDate = subDays(date, index);
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
  useEffect(() => {
    const today = getDate(new Date());
    const selectedDate = getDate(date);
    const diff = today - selectedDate;
    const tempData = [...graphData];

    const newData = tempData.slice(0, tempData.length - diff);

    setData(newData);
  }, [date]);

  return (
    <View style={styles.backGround}>
      <View
        style={{
          flexBasis: "50%",
          backgroundColor: "#e0dede",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <VictoryChart theme={VictoryTheme.material} minDomain={{ y: 0 }}>
          <VictoryLine
            interpolation="natural"
            style={{
              data: { stroke: "#3c40bd" },
              parent: { border: "1px solid #ccc" },
            }}
            data={data}
            domain={{ x: [1, 7], y: [0, 10] }}
          />
        </VictoryChart>
      </View>

      <View style={{ padding: 4, flexBasis: "20%" }}>
        <WeekCalander
          date={date}
          weekDays={weekDays}
          onChange={(newDate) => setDate(newDate)}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  backGround: {
    flex: 1,
    width: "100%",
    display: "flex",
    overflow: "scroll",
  },
});
export default Weekly;

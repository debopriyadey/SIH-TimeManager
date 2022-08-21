import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import CalendarHeatmap from "react-native-calendar-heatmap";
import GoalCard from "./GoalCard";

function Monthly() {
  const GoalData = [
    {
      id: 1,
      name: "Learn Python",
      desc: "Learn Python basics",
      progress: 0.7,
    },
    {
      id: 2,
      name: "Learn Python",
      desc: "Learn Python basics",
      progress: 0.7,
    },
    {
      id: 3,
      name: "Learn Python",
      desc: "Learn Python basics",
      progress: 0.7,
    },
    {
      id: 4,
      name: "Learn Python",
      desc: "Learn Python basics",
      progress: 0.7,
    },
    {
      id: 5,
      name: "Learn Python",
      desc: "Learn Python basics",
      progress: 0.7,
    },
    {
      id: 6,
      name: "Learn Python",
      desc: "Learn Python basics",
      progress: 0.7,
    },
    {
      id: 7,
      name: "Learn Python",
      desc: "Learn Python basics",
      progress: 0.7,
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Text style={styles.heading}>Your Monthly Report</Text>
        <CalendarHeatmap
          endDate={new Date()}
          numDays={100}
          colorArray={["#eee", "#D44B79", "#6B1928", "#9F3251", "#360000"]}
          values={[
            { date: "2022-08-21", count: 3 },
            { date: "2022-07-21", count: 8 },
            { date: "2022-06-30", count: 1 },
          ]}
        />
        <View style={styles.boxView}>
          <Text>less</Text>
          <View style={[styles.box, { backgroundColor: "#eee" }]} />
          <View style={[styles.box, { backgroundColor: "#D44B79" }]} />
          <View style={[styles.box, { backgroundColor: "#9F3251" }]} />
          <View style={[styles.box, { backgroundColor: "#6B1928" }]} />
          <View style={[styles.box, { backgroundColor: "#360000" }]} />
          <Text>More</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <Text style={{ fontSize: 20, marginLeft: 5, marginVertical: 10 }}>
          Track your goals
        </Text>
        {GoalData.map((goal) => {
          return (
            <GoalCard
              key={goal.id}
              name={goal.name}
              desc={goal.desc}
              progress={goal.progress}
            />
          );
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 5,
    overflow: "scroll",
  },
  mapContainer: {
    // flexBasis: "32%",
    borderColor: "#C0C0C0",
    borderWidth: 2,
    borderRadius: 10,
  },
  heading: {
    fontSize: 20,
    marginLeft: 10,
    marginBottom: 10,
  },
  boxView: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  box: {
    height: 15,
    width: 15,
    margin: 2,
  },
  listContainer: {
    // flexBasis: "68%",
  },
});
export default Monthly;

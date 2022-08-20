import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { VictoryBar, VictoryPie } from "victory-native";

const data = [
  { quarter: 1, earnings: 13 },
  { quarter: 2, earnings: 16 },
  { quarter: 3, earnings: 14 },
  { quarter: 4, earnings: 19 },
  { quarter: 5, earnings: 17 },
  { quarter: 6, earnings: 16 },
  { quarter: 7, earnings: 19 },
  { quarter: 8, earnings: 17 },
  { quarter: 9, earnings: 19 },
];
const pieData = [
  { x: "Completed", y: 25 },
  { x: "InCompleted", y: 30 },
  { x: "Rescheduled", y: 55 },
  { x: "late completion", y: 45 },
  { x: "late started", y: 50 },
];
function Daily() {
  const SIZE = Dimensions.get("window");
  const colours = ["#eb2636", "#065229", "#98999c", "#deb923", "#1f25cf"];
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.BarContainer}>
        <VictoryBar
          data={data}
          x="quarter"
          y="earnings"
          style={{
            data: {
              fill: "#3c40bd",
              width: 20,
            },
          }}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
          height={250}
          width={Dimensions.get("window").width}
        />
      </View>
      <Text style={{ margin: 5, fontSize: 20 }}>Your Daily Progress -</Text>
      <View style={styles.pieChart}>
        <VictoryPie
          data={pieData}
          colorScale={colours}
          labels={({ datum }) => `${datum.y}%`}
          radius={SIZE.width * 0.4 - 10}
          innerRadius={70}
          labelRadius={({ innerRadius }) =>
            (SIZE.width * 0.4 + innerRadius) / 2.5
          }
          style={{ labels: { fill: "white" } }}
          width={SIZE.width * 0.8}
          height={SIZE.width * 0.8}
        />
        <View style={{ position: "absolute", top: "25%", left: "45%" }}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 25 }}
          >
            {pieData.length}
          </Text>
          <Text style={{ textAlign: "center" }}>Datas</Text>
        </View>
        <View>
          {pieData.map((da, i) => {
            return (
              <View
                key={i}
                style={{
                  padding: 10,
                  width: SIZE.width - 30,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderColor: colours[i],
                  borderRadius: 5,
                  marginBottom: 5,
                  borderWidth: 2,
                }}
              >
                <Text>{da.x}</Text>
                <View
                  style={{ height: 20, width: 20, backgroundColor: colours[i] }}
                ></View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  BarContainer: {
    height: 200,
    overflow: "scroll",
    alignItems: "flex-end",
    backgroundColor: "#e0dede",
    borderRadius: 10,
    elevation: 5,
  },

  pieChart: {
    marginTop: 10,
    paddingTop: 20,
    height: 555,
    backgroundColor: "red",
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "#e0dede",
    alignItems: "center",
    // justifyContent: "center",
  },
});

export default Daily;

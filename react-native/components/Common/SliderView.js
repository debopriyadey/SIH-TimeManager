import React from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import styles from "../TodoForm/TodoFormStyle";

function SliderView({ title, value, onValueChange, style }) {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={styles.sliderText}>
        {title} : {value} %
      </Text>
      <Slider
        style={{ width: "100%", height: 40 }}
        maximumValue={100}
        minimumValue={0}
        minimumTrackTintColor="#3c40bd"
        maximumTrackTintColor="#636262"
        thumbTintColor="#3c40bd"
        value={value}
        step={25}
        onValueChange={onValueChange}
      />
    </View>
  );
}

export default SliderView;

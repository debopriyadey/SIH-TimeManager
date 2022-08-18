import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

function PickerView({
  duration,
  placeholder,
  onChangeText,
  selectedTime,
  onValueChange,
  lebels,
  values,
}) {
  return (
    <View style={styles.pickerView}>
      <TextInput
        style={[styles.input, { width: "40%" }]}
        value={duration ? duration.toString() : ""}
        placeholder={placeholder}
        keyboardType="number-pad"
        onChangeText={onChangeText}
        placeholderTextColor={styles.placeholder.color}
      />
      <Picker
        style={styles.picker}
        enabled={duration ? true : false}
        selectedValue={selectedTime}
        onValueChange={onValueChange}
      >
        {lebels.map((lebel, i) => {
          return <Picker.Item label={lebel} value={values[i]} key={i} />;
        })}
      </Picker>
    </View>
  );
}
const styles = StyleSheet.create({
  placeholder: {
    color: "#666666",
  },
  input: {
    width: "60%",
    backgroundColor: "white",
    height: "100%",
    padding: 10,
  },
  pickerView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  picker: {
    width: "57%",
    height: 45,
    backgroundColor: "white",
  },
});
export default PickerView;

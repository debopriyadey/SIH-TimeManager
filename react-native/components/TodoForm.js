import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, TextInput, Checkbox } from "react-native-paper";

function TodoForm() {
  const [show, setShow] = useState(true);
  const [time, setTime] = useState({
    start: null,
    end: null,
  });
  const [checked, setChecked] = React.useState(false);
  const date = new Date().toDateString();
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Today: {date}</Text>
      <TextInput label="Task name" style={styles.input} />
      <TextInput
        label="Task description"
        style={styles.input}
        numberOfLines={5}
      />
      <View style={styles.start_end}>
        <View style={styles.btn}>
          <Button mode="contained">Start Time</Button>
          <Text>{time.start}</Text>
        </View>
        <View style={styles.btn}>
          <Button mode="contained">End Time</Button>
          <Text>{time.end}</Text>
        </View>
      </View>
      <View style={styles.start_end}>
        <Text>Do you want to include it in SMART?</Text>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
          color="blue"
        />
      </View>
      {checked && (
        <View>
          <TextInput
            label="Task description"
            style={styles.input}
            numberOfLines={5}
          />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "80%",
    padding: 20,
  },
  heading: {
    fontSize: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
  },
  start_end: {
    width: "100%",
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    width: "40%",
  },
});
export default TodoForm;

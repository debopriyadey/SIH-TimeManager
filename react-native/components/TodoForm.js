import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Checkbox } from "react-native-paper";
import * as Animatable from "react-native-animatable";

function TodoForm() {
  const [show, setShow] = useState(false);
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
  });
  const [todoData, setTodoData] = useState({
    name: "",
    desc: "",
    tags: "",
    smart_desc: "",
    checked: false,
  });
  const date = new Date().toDateString();

  return (
    <KeyboardAvoidingView style={styles.formWrapper}>
      <Animatable.View style={styles.container} animation="fadeInUpBig">
        <Text style={styles.heading}>Today: {date}</Text>
        <TextInput
          placeholder="Task name"
          style={styles.input}
          onChangeText={(val) =>
            setTodoData((prev) => ({ ...prev, name: val }))
          }
        />
        <TextInput
          placeholder="Task description"
          style={styles.input}
          numberOfLines={5}
          onChangeText={(val) =>
            setTodoData((prev) => ({ ...prev, desc: val }))
          }
        />
        <TextInput
          placeholder="Tags"
          style={styles.input}
          onChangeText={(val) =>
            setTodoData((prev) => ({ ...prev, tags: val }))
          }
        />
        <View style={styles.start_end}>
          <View style={styles.btn}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShow(true)}
            >
              <Text style={{ color: "white" }}>Start Time</Text>
            </TouchableOpacity>
            {/* <Text>{time.start}</Text> */}
            {/* <Text>
            {time.hours}hr:{time.minutes}min
          </Text> */}
          </View>
          <View style={styles.btn}>
            <TouchableOpacity style={styles.button}>
              <Text style={{ color: "white" }}>End Time</Text>
            </TouchableOpacity>
            {/* <Text>{time.end}</Text> */}
          </View>
        </View>
        <View style={styles.check}>
          <Text>Do you want to include it in SMART?</Text>
          <Checkbox
            status={todoData.checked ? "checked" : "unchecked"}
            onPress={() => {
              setTodoData((prev) => ({ ...prev, checked: !todoData.checked }));
            }}
            color="#009387"
          />
        </View>
        {todoData.checked && (
          <View>
            <TextInput
              placeholder="Task description"
              style={styles.input}
              numberOfLines={5}
              onChangeText={(val) =>
                setTodoData((prev) => ({ ...prev, smart_desc: val }))
              }
            />
          </View>
        )}
        <TouchableOpacity style={[styles.button, { marginVertical: 10 }]}>
          <Text style={{ color: "white", fontSize: 20 }}>Add</Text>
        </TouchableOpacity>
      </Animatable.View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  formWrapper: {
    width: "100%",
    backgroundColor: "#edebeb",
  },
  container: {
    width: "100%",
    height: "auto",
    padding: 20,
  },
  heading: {
    fontSize: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    paddingLeft: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#C0C0C0",
    backgroundColor: "white",
    borderRadius: 5,
  },
  start_end: {
    width: "100%",
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  btn: {
    width: "40%",
    color: "white",
  },
  check: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#009387",
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default TodoForm;

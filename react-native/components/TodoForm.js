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
import { AntDesign } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";

function TodoForm() {
  const date = new Date();
  const [mode, setMode] = useState("time");
  const [show, setShow] = useState(false);
  const [todoData, setTodoData] = useState({
    name: "",
    desc: "",
    tags: "",
    smart_desc: "",
    checked: false,
  });
  const [datetext, setText] = useState(date.toDateString());
  const [time, setTime] = useState({
    start: null,
    end: null,
  });
  const [start_end, setStart_End] = useState("start");
  const [newDate, setDate] = useState(date);
  const showMode = (currentMode) => {
    setMode(currentMode);
    setShow(true);
  };
  const handleChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || newDate;
    setShow(false);
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fdate = tempDate.toDateString();
    setText(fdate);
  };
  const handleChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || newDate;
    setShow(false);
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let ftime = tempDate.getHours() + ":" + tempDate.getMinutes();
    if (start_end === "start") {
      setTime((prev) => ({ ...prev, start: ftime }));
    } else {
      setTime((prev) => ({ ...prev, end: ftime }));
    }
  };
  return (
    <KeyboardAvoidingView style={styles.formWrapper}>
      <Animatable.View style={styles.container} animation="fadeInUpBig">
        <View style={[styles.start_end, { justifyContent: "space-between" }]}>
          <Text style={styles.heading}>Date: {datetext} </Text>
          <TouchableOpacity onPress={() => showMode("date")}>
            <AntDesign name="edit" size={20} color="#009387" />
          </TouchableOpacity>
        </View>
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
              onPress={() => {
                showMode("time");
                setStart_End("start");
              }}
            >
              <Text style={{ color: "white" }}>Strat Time</Text>
            </TouchableOpacity>

            {show && (
              <RNDateTimePicker
                value={date}
                mode={mode}
                onChange={mode === "time" ? handleChangeTime : handleChangeDate}
                minimumDate={date}
                is24Hour={true}
              />
            )}
          </View>
          <View style={styles.btn}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                showMode("time");
                setStart_End("end");
              }}
            >
              <Text style={{ color: "white" }}>End Time</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.start_end, { marginVertical: 5 }]}>
          <Text>{time.start}</Text>
          <Text>{time.end}</Text>
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
    marginVertical: 10,
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

import React, { useState } from "react";
import styles from "./TodoFormStyle.js";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Switch,
  ScrollView,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Checkbox } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { AntDesign } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";

function TodoForm() {
  const date = new Date();
  const [mode, setMode] = useState("time");
  const [show, setShow] = useState(false);
  const [todoData, setTodoData] = useState({
    name: "",
    desc: "",
    tags: "",
    smart_desc: "",
    date: date.toDateString(),
    duration: 0,
    startTime: "Start Time",
    checked: false,
    importance: 0,
    urgent: 0,
  });
  const [selectedTime, setSelectedTime] = useState();

  const showMode = (currentMode) => {
    setMode(currentMode);
    setShow(true);
  };
  const handleChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    let tempDate = new Date(currentDate);
    let fdate = tempDate.toDateString();
    setTodoData((prev) => ({ ...prev, date: fdate }));
  };
  const handleChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    let tempDate = new Date(currentDate);
    let ftime = tempDate.toLocaleTimeString();
    setTodoData((prev) => ({ ...prev, startTime: ftime }));
  };
  return (
    <ScrollView style={styles.formWrapper}>
      <KeyboardAvoidingView>
        <Animatable.View style={styles.container} animation="fadeInUpBig">
          <View style={[styles.start_end, { justifyContent: "space-between" }]}>
            <Text style={styles.heading}>Date: {todoData.date} </Text>
            <TouchableOpacity onPress={() => showMode("date")}>
              <AntDesign name="calendar" size={24} color="black" />
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
          <View style={[styles.start_end, styles.input]}>
            <View>
              <TouchableWithoutFeedback onPress={() => showMode("time")}>
                <Text
                  style={
                    todoData.startTime === "Start Time"
                      ? { color: "#C0C0C0" }
                      : { color: "black" }
                  }
                >
                  {todoData.startTime}
                </Text>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.icon}>
              <TouchableOpacity onPress={() => showMode("time")}>
                <AntDesign name="clockcircle" size={24} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.pickerView}>
            <TextInput
              placeholder="Duration"
              style={[styles.input, { width: "40%" }]}
              keyboardType="numeric"
              maxLength={2}
            />
            <Picker
              style={styles.picker}
              selectedValue={selectedTime}
              onValueChange={(value, valueIndex) => setSelectedTime(value)}
            >
              <Picker.Item label="Minutes" value="Minutes" />
              <Picker.Item label="Hours" value="Hours" />
            </Picker>
          </View>
          <View style={[styles.input, styles.switch]}>
            <Text>Do you want the task to repeat? </Text>
            <Switch />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.sliderText}>
              Importance : {todoData.importance} %
            </Text>
            <Slider
              style={{ width: "100%", height: 40 }}
              maximumValue={100}
              minimumValue={0}
              minimumTrackTintColor="#009387"
              maximumTrackTintColor="#636262"
              thumbTintColor="#009387"
              value={todoData.importance}
              step={25}
              onValueChange={(value) =>
                setTodoData((prev) => ({ ...prev, importance: value }))
              }
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.sliderText}>Urgent : {todoData.urgent} %</Text>
            <Slider
              style={{ width: "100%", height: 40 }}
              maximumValue={100}
              minimumValue={0}
              minimumTrackTintColor="#009387"
              maximumTrackTintColor="#636262"
              thumbTintColor="#009387"
              value={todoData.urgent}
              step={20}
              onValueChange={(value) =>
                setTodoData((prev) => ({ ...prev, urgent: value }))
              }
            />
          </View>
          <View style={[styles.start_end, { marginVertical: 5 }]}></View>
          <View style={styles.check}>
            <Text>Do you want to include it in SMART?</Text>
            <Checkbox
              status={todoData.checked ? "checked" : "unchecked"}
              onPress={() => {
                setTodoData((prev) => ({
                  ...prev,
                  checked: !todoData.checked,
                }));
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
          {show && (
            <RNDateTimePicker
              value={date}
              mode={mode}
              onChange={mode === "time" ? handleChangeTime : handleChangeDate}
              minimumDate={date}
              is24Hour={true}
            />
          )}
        </Animatable.View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default TodoForm;

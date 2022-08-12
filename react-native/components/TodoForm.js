import React, { useState, useEffect } from "react";
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
import GoalModal from "./GoalModal.js";

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
    duration: "",
    startTime: "Start Time",
    endTime: "End time",
    checked: false,
    importance: 0,
    urgent: 0,
    repeat: false,
  });
  const [selectedTime, setSelectedTime] = useState();
  const [drt, setDrt] = useState("");
  const [modal, setModal] = useState(false);
  let oldTimeObj = date;
  useEffect(() => {
    if (todoData.duration >= 24 && selectedTime === "Hours") {
      setModal(true);
    } else {
      if (todoData.duration < 24 && selectedTime === "Hours") {
        oldTimeObj.setHours(oldTimeObj.getHours() + Number(todoData.duration));
        setTodoData((prev) => ({
          ...prev,
          endTime: oldTimeObj.toLocaleTimeString(),
        }));
        console.log(todoData);
      } else {
        oldTimeObj.setMinutes(
          oldTimeObj.getMinutes() + Number(todoData.duration)
        );
        setTodoData((prev) => ({
          ...prev,
          endTime: oldTimeObj.toLocaleTimeString(),
        }));
        console.log(todoData);
      }
    }
  }, [todoData.duration, selectedTime, oldTimeObj]);
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
    console.log(tempDate);
    console.log(date);
    if (tempDate.getDate() !== date.getDate()) {
      alert("This this not today");
      setTodoData((prev) => ({ ...prev, startTime: "Start Time" }));
    } else {
      oldTimeObj = tempDate;
      let ftime = tempDate.toLocaleTimeString();
      setTodoData((prev) => ({ ...prev, startTime: ftime }));
    }
  };
  const clearForm = () => {
    setModal(false);
    setTodoData({
      name: "",
      desc: "",
      tags: "",
      smart_desc: "",
      date: date.toDateString(),
      duration: "",
      startTime: "Start Time",
      endTime: "End time",
      checked: false,
      importance: 0,
      urgent: 0,
      repeat: false,
    });
    setSelectedTime("Minutes");
    setDrt("");
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
            value={todoData.name}
            style={styles.input}
            onChangeText={(val) =>
              setTodoData((prev) => ({ ...prev, name: val }))
            }
          />
          <TextInput
            placeholder="Task description"
            value={todoData.desc}
            style={styles.input}
            numberOfLines={5}
            onChangeText={(val) =>
              setTodoData((prev) => ({ ...prev, desc: val }))
            }
          />
          <TextInput
            placeholder="Tags"
            value={todoData.tags}
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
              value={drt}
              style={[styles.input, { width: "40%" }]}
              keyboardType="numeric"
              maxLength={2}
              onChangeText={(val) => {
                setDrt(val);
                setTodoData((prev) => ({ ...prev, duration: val }));
              }}
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
          <GoalModal modal={modal} changeModal={() => clearForm()} />
          <View style={[styles.input, styles.switch]}>
            <Text>Do you want the task to repeat? </Text>
            <Switch
              value={todoData.repeat}
              onValueChange={(newValue) =>
                setTodoData((prev) => ({ ...prev, repeat: newValue }))
              }
              trackColor={{ false: "#C0C0C0", true: "#97e8e1" }}
              thumbColor="#009387"
            />
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

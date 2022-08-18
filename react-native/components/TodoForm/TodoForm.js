import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Switch, ScrollView } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";

import styles from "./TodoFormStyle";
import AppButton from "../Common/AppButton";
import GoalModal from "../Common/GoalModal";
import SliderView from "../Common/SliderView";
import PickerView from "../Common/PickerView";
import TimeDuration from "../Common/TimeDuration";
function TodoForm() {
  let date = new Date();
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("time");
  const [modal, setModal] = useState(false);
  const [overlap, setOverlap] = useState(false);
  const [todoData, setTodoData] = useState({
    name: "",
    desc: "",
    tags: "",
    startTime: null,
    endTime: null,
    date: date,
    duration: 0,
    selectedTime: "Minutes",
    repeat: false,
    importance: 0,
    urgent: 0,
  });

  useEffect(() => {
    if (todoData.duration >= 24 && todoData.selectedTime === "Hours") {
      setModal(true);
    } else {
      let end = new Date(todoData.startTime);
      if (todoData.duration < 24 && todoData.selectedTime === "Hours") {
        end.setHours(end.getHours() + todoData.duration);
      } else {
        end.setMinutes(end.getMinutes() + todoData.duration);
      }
      setTodoData((prev) => ({
        ...prev,
        endTime: end,
      }));
    }
  }, [todoData.duration, todoData.selectedTime]);
  const showMode = (mode) => {
    setShow(true);
    setMode(mode);
  };
  const handleChange = (mode, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    let tempDate = new Date(currentDate);
    if (mode === "time") {
      if (todoData.date.getDate() !== tempDate.getDate()) {
        tempDate.setDate(todoData.date.getDate());
      }
      tempDate.setSeconds(0);
      setTodoData((prev) => ({ ...prev, startTime: tempDate }));
    }
    if (mode === "date") {
      setTodoData((prev) => ({ ...prev, date: tempDate }));
    }
  };
  const handleSubTasks = () => {
    setModal(false);
    setTodoData({
      name: "",
      desc: "",
      tags: "",
      startTime: null,
      endTime: null,
      date: date,
      duration: 0,
      selectedTime: "Minutes",
      repeat: false,
      importance: 0,
      urgent: 0,
    });
  };
  const handlePress = () => {
    if (
      todoData.name &&
      todoData.desc &&
      todoData.tags &&
      todoData.date &&
      todoData.endTime &&
      todoData.startTime &&
      todoData.urgent &&
      todoData.importance
    ) {
      console.log(todoData);
      setTodoData({
        name: "",
        desc: "",
        tags: "",
        startTime: null,
        endTime: null,
        date: date,
        duration: 0,
        selectedTime: "Minutes",
        repeat: false,
        importance: 0,
        urgent: 0,
      });
      alert("Task added");
    } else {
      alert("Fill the required fields");
    }
  };
  return (
    <ScrollView style={styles.formWrapper}>
      <View style={styles.container}>
        <View style={styles.flex_view}>
          <Text style={styles.heading}>
            Date : {todoData.date.toDateString()}
          </Text>
          <AppButton
            color="black"
            name="calendar"
            txtStyle={styles.icon}
            onPress={() => showMode("date")}
          />
        </View>
        <TextInput
          value={todoData.name}
          style={styles.input}
          placeholder="Task Name"
          placeholderTextColor={styles.placeholder.color}
          onChangeText={(val) =>
            setTodoData((prev) => ({ ...prev, name: val }))
          }
        />
        <TextInput
          value={todoData.desc}
          style={styles.input}
          placeholder="Task description"
          placeholderTextColor={styles.placeholder.color}
          onChangeText={(val) =>
            setTodoData((prev) => ({ ...prev, desc: val }))
          }
        />
        <TimeDuration
          value={todoData.startTime ? todoData.startTime.toTimeString() : ""}
          onFocus={() => showMode("time")}
          placeholder="Start Time"
          onPress={() => showMode("Time")}
        />

        <PickerView
          duration={todoData.duration}
          placeholder="Duration"
          selectedTime={todoData.selectedTime}
          onChangeText={(val) =>
            setTodoData((prev) => ({ ...prev, duration: Number(val) }))
          }
          onValueChange={(value, valueIndex) =>
            setTodoData((prev) => ({ ...prev, selectedTime: value }))
          }
          lebels={["Minutes", "Hours"]}
          values={["Minutes", "Hours"]}
        />
        {overlap && (
          <GoalModal
            modal={overlap}
            changeModal={() => setOverlap(false)}
            btn1Text="Reschedule"
            btn2Text="Go to the existing task"
            modalText="There is already a task assigned in this slot kindly delete the task oe reschedule the current task"
          />
        )}
        {modal && (
          <GoalModal
            modal={modal}
            changeModal={() => handleSubTasks()}
            modalText="This is not a SMART Task You may break it into sub tasks or set it
              as a goal."
            btn1Text="Divide in Subtasks"
            btn2Text="Set as a Goal"
            btn3Text="Ignore"
          />
        )}
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
        <SliderView
          title="Importance"
          value={todoData.importance}
          onValueChange={(value) =>
            setTodoData((prev) => ({ ...prev, importance: value }))
          }
        />
        <SliderView
          title="Urgent"
          value={todoData.urgent}
          onValueChange={(value) =>
            setTodoData((prev) => ({ ...prev, urgent: value }))
          }
        />

        <TextInput
          value={todoData.tags}
          style={styles.input}
          placeholder="Tags"
          placeholderTextColor={styles.placeholder.color}
          onChangeText={(val) =>
            setTodoData((prev) => ({ ...prev, tags: val }))
          }
        />
        <AppButton
          onPress={handlePress}
          title="Add"
          btnStyle={styles.button}
          txtStyle={styles.btn_text}
        />
      </View>
      {show && (
        <RNDateTimePicker
          value={date}
          mode={mode}
          onChange={(event, selectedDate) => handleChange(mode, selectedDate)}
          minimumDate={date}
          is24Hour={true}
        />
      )}
    </ScrollView>
  );
}

export default TodoForm;

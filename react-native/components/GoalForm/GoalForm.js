import React, { useState, useEffect } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";

import styles from "./GoalFormStyles";
import AppButton from "../Common/AppButton";
import PickerView from "../Common/PickerView";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";
function GoalForm() {
  const date = new Date();
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [FormVisible, setFormVisible] = useState(false);
  const [goalData, setGoalData] = useState({
    name: "",
    desc: "",
    startDate: date,
    endDate: null,
    duration: 0,
    tasks: [],
    selectedTime: "Weeks",
  });
  const [taskData, setTaskData] = useState({
    id: 0,
    name: "",
    desc: goalData.desc,
    startTime: null,
    endTime: null,
    duration: 0,
    selectedTime: "Minutes",
  });

  useEffect(() => {
    if (goalData.duration > 0) {
      let end = new Date(goalData.startDate);
      if (goalData.selectedTime === "Weeks") {
        end.setDate(end.getDate() + goalData.duration * 7);
      } else if (goalData.selectedTime === "Days") {
        end.setDate(end.getDate() + goalData.duration);
      } else {
        end.setMonth(end.getMonth() + goalData.duration);
      }
      setGoalData((prev) => ({ ...prev, endDate: end }));
    } else {
      setGoalData((prev) => ({ ...prev, endDate: null }));
    }
  }, [goalData.duration, goalData.selectedTime]);

  useEffect(() => {
    let end = new Date(taskData.startTime);
    if (taskData.selectedTime === "Hours") {
      end.setHours(end.getHours() + taskData.duration);
    } else {
      end.setMinutes(end.getMinutes() + taskData.duration);
    }
    setTaskData((prev) => ({
      ...prev,
      endTime: end,
    }));
  }, [taskData.duration, taskData.selectedTime]);

  const handleChange = (mode, selectedDate) => {
    let currentDate = selectedDate || date;
    setShow(false);
    let tempDate = new Date(currentDate);
    if (mode === "date") {
      setGoalData((prev) => ({ ...prev, startDate: tempDate }));
    }
    if (mode === "time") {
      tempDate.setSeconds(0);
      setTaskData((prev) => ({ ...prev, startTime: tempDate }));
    }
  };
  const showMode = (mode) => {
    setShow(true);
    setMode(mode);
  };
  const handlePress = () => {
    if (
      goalData.name &&
      goalData.startDate &&
      goalData.endDate &&
      goalData.selectedTime &&
      goalData.duration
    ) {
      console.log(goalData);
      alert("created Task");
      setGoalData({
        name: "",
        desc: "",
        startDate: date,
        endDate: null,
        duration: 0,
        tasks: "",
        selectedTime: "Days",
      });
    } else {
      alert("Fill all the fields");
    }
  };
  const handleAddTask = () => {
    setTaskData((prev) => ({ ...prev, id: goalData.tasks.length + 1 }));
    let userTask = goalData.tasks;
    userTask.push(taskData);
    console.log(taskData);
    setGoalData((prev) => ({ ...prev, tasks: userTask }));
    setTaskData({
      id: 0,
      name: "",
      desc: goalData.desc,
      startTime: null,
      endTime: null,
      duration: 0,
      selectedTime: "Minutes",
    });
    setFormVisible(false);
  };
  return (
    <ScrollView style={styles.formWrapper}>
      <View style={styles.container}>
        <View style={styles.headingView}>
          <Text style={[styles.heading, { flexBasis: "60%" }]}>
            Add Your Goals here
          </Text>
          <AntDesign
            name="checkcircle"
            size={styles.heading.fontSize}
            color={styles.mainColour.color}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <TextInput
            style={styles.input}
            value={goalData.name}
            placeholder="Whats your Goal"
            placeholderTextColor={styles.placeholder.color}
            onChangeText={(val) =>
              setGoalData((prev) => ({ ...prev, name: val }))
            }
          />
          <TextInput
            style={styles.input}
            value={goalData.desc}
            placeholder="Write something about your goal"
            placeholderTextColor={styles.placeholder.color}
            onChangeText={(val) =>
              setGoalData((prev) => ({ ...prev, desc: val }))
            }
          />
          <View style={styles.TimeView}>
            <Text style={{ marginRight: 15, fontSize: 18 }}>Start Date :</Text>
            <Text style={styles.heading}>
              {goalData.startDate.toDateString()}
            </Text>
            <AppButton
              color="black"
              name="calendar"
              btnStyle={styles.icon}
              onPress={() => showMode("date")}
            />
          </View>
          <PickerView
            duration={goalData.duration}
            placeholder="Duration"
            selectedTime={goalData.selectedTime}
            lebels={["Days", "Weeks", "Months"]}
            values={["Days", "Weeks", "Months"]}
            onChangeText={(val) =>
              setGoalData((prev) => ({ ...prev, duration: Number(val) }))
            }
            onValueChange={(value, valueIndex) =>
              setGoalData((prev) => ({ ...prev, selectedTime: value }))
            }
          />
          {goalData.endDate === null ? null : (
            <View style={styles.TimeView}>
              <Text style={{ marginRight: 15, fontSize: 18 }}>End Date :</Text>
              <Text style={styles.heading}>
                {goalData.endDate.toDateString()}
              </Text>
            </View>
          )}
          {goalData.tasks.length > 0 &&
            goalData.tasks.map((task, i) => {
              return <TaskCard task={task} key={i} />;
            })}

          <View style={styles.addTask}>
            <Text style={{ fontSize: 15 }}>
              Add relevent tasks for your goal{" "}
            </Text>
            <AppButton
              color="#009387"
              name={FormVisible ? "minuscircle" : "pluscircle"}
              txtStyle={styles.addButton}
              onPress={() => {
                if (goalData.tasks.length < 11) {
                  setFormVisible(!FormVisible);
                } else {
                  alert("You can add only 10 tasks ");
                }
              }}
            />
          </View>
          {FormVisible && (
            <TaskForm
              pickerPlaceholder="duration"
              value={
                taskData.startTime === null
                  ? ""
                  : taskData.startTime.toLocaleTimeString()
              }
              onFocus={() => showMode("time")}
              onPress={() => showMode("time")}
              placeholder="Start Time"
              taskData={taskData}
              setTaskData={setTaskData}
              onAddTask={handleAddTask}
            />
          )}
          <AppButton
            title="Create Goal"
            onPress={handlePress}
            btnStyle={styles.button}
            txtStyle={styles.btnTxt}
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
      </View>
    </ScrollView>
  );
}

export default GoalForm;

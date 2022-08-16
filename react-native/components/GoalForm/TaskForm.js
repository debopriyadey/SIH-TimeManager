import React from "react";
import { Text, View, TextInput } from "react-native";
import AppButton from "../Common/AppButton";

import styles from "./GoalFormStyles";
import PickerView from "../Common/PickerView";
import TimeDuration from "../Common/TimeDuration";
function TaskForm({
  value,
  onFocus,
  onPress,
  placeholder,
  pickerPlaceholder,
  taskData,
  setTaskData,
  onAddTask,
}) {
  return (
    <View>
      <Text style={{ fontSize: 18 }}>This is the TaskForm</Text>
      <TextInput
        value={taskData.name}
        placeholder="Name"
        style={styles.input}
        placeholderTextColor={styles.placeholder.color}
        onChangeText={(val) => setTaskData((prev) => ({ ...prev, name: val }))}
      />
      <TimeDuration
        value={value}
        onFocus={onFocus}
        onPress={onPress}
        placeholder={placeholder}
      />
      <PickerView
        placeholder={pickerPlaceholder}
        duration={taskData.duration}
        onChangeText={(val) =>
          setTaskData((prev) => ({ ...prev, duration: Number(val) }))
        }
        selectedTime={taskData.selectedTime}
        onValueChange={(value, valueIndex) =>
          setTaskData((prev) => ({ ...prev, selectedTime: value }))
        }
        lebels={["Minutes", "Hours"]}
        values={["Minutes", "Hours"]}
      />
      <AppButton
        title="Add"
        btnStyle={[styles.button, { width: "50%" }]}
        txtStyle={styles.btnTxt}
        onPress={onAddTask}
      />
    </View>
  );
}

export default TaskForm;

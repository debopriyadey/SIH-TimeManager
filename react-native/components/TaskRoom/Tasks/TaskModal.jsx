import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TextInput, Button, Chip } from "react-native-paper";
import { useSelector } from "react-redux";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import AppButton from "../../Common/AppButton";
import { createTask, fetchTasks } from "../../../socket/socketConnection";

const TaskModal = ({ setShowModal }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState([]);
  // const [users, setUsers] = useState([
  //   { name: "Shrayansh" },
  //   { name: "Bishal" },
  //   { name: "Debopriya" },
  //   { name: "Gourav" },
  //   { name: "Harsh" },
  //   { name: "Ishika" },
  // ]);
  let dateNow = new Date();
  const room = useSelector((state) => state.room);
  const [endTime, setEndTime] = useState(null);
  const [date, setDate] = useState(dateNow);
  const [mode, setMode] = useState("date");
  const [valid, setValid] = useState(false);
  const { users } = room;

  useEffect(() => {
    if(!title || !endTime || !select.length) {
      setValid(false);
    } else {
      setValid(true);
    }
  },[endTime, title, select]);

  const titleChangeHandler = (value) => setTitle(value);
  const showMode = (mode) => {
    setShow(true);
    setMode(mode);
  };
  const handleChange = (mode, selectedDate) => {
    const currentDate = selectedDate || dateNow;
    setShow(false);
    let tempDate = new Date(currentDate);
    if (mode === "time") {
      setEndTime(tempDate.toLocaleTimeString());
    }
    if (mode === "date") {
      setDate(tempDate);
    }
  };
  const createTaskHandler = () => {
    const endDate = new Date(
      date.getFullYear(), 
      date.getMonth(), 
      date.getDate(), 
      endTime.slice(0, 2),
      endTime.slice(3, 5),
      endTime.slice(6)
    );
    console.log(endDate.toString());
    const task = {
      title,
      assignees: select,
      endTime: endDate
    }
    createTask(room.roomId, task);
    fetchTasks(room.roomId);
    setShowModal(false);
  };

  const handleSelect = (user) => {
    if (select.includes(user)) {
      let tempSelect = select;
      const filtered = tempSelect.filter((_user) => _user != user);
      setSelect(filtered);
    } else {
      setSelect((prev) => [...prev, user]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.flex_view}>
        <Text style={styles.heading}>Date : {date.toDateString()}</Text>
        <AppButton
          color="black"
          name="calendar"
          txtStyle={styles.icon}
          onPress={() => showMode("date")}
        />
      </View>
      <View style={styles.title}>
        <TextInput
          label="Title"
          onChangeText={(value) => titleChangeHandler(value)}
        />
      </View>
      <View style={styles.assignTo}>
        <TextInput
          label="Assign To"
          placeholder="Enter the name of the user"
          style={{
            flex: 1,
          }}
          onChangeText={(value) => {
            setSearch(value);
          }}
        />
      </View>
      <View style={styles.chipView}>
        {users
          .filter((user) => {
            return user.name.toLowerCase().includes(search.toLowerCase());
          })
          .map((user) => (
            <Chip
              mode="flat"
              selected={select.includes(user)}
              style={styles.chip}
              key={user._id}
              onPress={() => handleSelect(user)}
            >
              {user.name}
            </Chip>
          ))}
      </View>
      <View style={styles.flex_view}>
        <Text style={styles.heading}>
          End Time : {endTime === null ? "--:--:--" : endTime}
        </Text>
        <AppButton
          color="black"
          name="calendar"
          txtStyle={styles.icon}
          onPress={() => showMode("time")}
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

      <Button
        color="#3D5CFF"
        mode="contained"
        style={styles.createTaskBtn}
        onPress={createTaskHandler}
        disabled={!valid}
      >
        Create Task
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  flex_view: {
    width: "100%",
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    marginBottom: 10,
  },
  assignTo: {
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
  },
  createTaskBtn: {
    borderRadius: 30,

    marginTop: 20,
  },
  chipView: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    width: "30%",
    textAlign: "center",
    backgroundColor: "#bad6ff",
    marginVertical: 2,
    marginHorizontal: 2,
  },
  button: {
    marginTop: 20,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#3D5CFF",
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textColor: "white",
  },
});

export default TaskModal;

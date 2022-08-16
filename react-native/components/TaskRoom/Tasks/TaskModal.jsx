import { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TextInput, Button, Chip } from "react-native-paper";
import { useSelector } from "react-redux";

const TaskModal = () => {
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState([]);
  const [users, setUsers] = useState([
    { name: "Shrayansh" },
    { name: "Bishal" },
    { name: "Debopriya" },
    { name: "Gourav" },
    { name: "Harsh" },
    { name: "Ishika" },
  ]);
  const room = useSelector((state) => state.room);
  // const { users } = room;

  const titleChangeHandler = (value) => setTitle(value);

  const createRoomHandler = () => {
    // send request to backend
  };

  const assignHandler = (value) => {
    setSearch(value);
  };

  // const searchHandler = () => {

  // };

  const handleSelect = (user) => {
    if (select.includes(user)) {
      let tempSelect = select;
      const filtered = tempSelect.filter((_user) => _user != user);
      //tempSelect.splice(index, 1);
      setSelect(filtered);
    } else {
      setSelect((prev) => [...prev, user]);
    }
  };

  return (
    <View style={styles.container}>
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
            console.log(value);
            setSearch(value);
          }}
        />
        {/* <Button
          icon={() => (
            <Image
              source={require("../../../icons/search_blue.png")}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                marginTop: 20,
              }}
            />
          )}
          onPress={searchHandler}
        /> */}
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
              key={user.id}
              onPress={() => handleSelect(user)}
            >
              {user.name}
            </Chip>
          ))}
      </View>
      <Button
        color="#3D5CFF"
        mode="contained"
        style={styles.createTaskBtn}
        onPress={createRoomHandler}
      >
        Create Task
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
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
});

export default TaskModal;

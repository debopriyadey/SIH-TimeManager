import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import TaskList from "./TaskList";
import TaskModal from "./TaskModal";
import { Button, Portal, Modal } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const dummyTasks = [
  {
    id: 1,
    content: "Finish Homework",
    status: "pending",
  },
  {
    id: 2,
    content: "Do a Leetcode question",
    status: "pending",
  },
  {
    id: 3,
    content: "Buy Perfume",
    status: "completed",
  },
];

const Tasks = () => {
  const [lists, setLists] = useState({
    all: [],
    completed: [],
  });
  const [showModal, setShowModal] = useState(false);

  useLayoutEffect(() => {
    const tasks = {
      all: [],
      completed: [],
    };
    dummyTasks.forEach((task) => {
      if (task.status === "pending") tasks.all.push(task);
      else tasks.completed.push(task);
    });
    setLists(tasks);
  }, []);

  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    // height: "50%",
    margin: 10,
    display: "flex",
    justifyContent: "flex-start",
    borderRadius: 20,
    height: hp("50%"),
  };

  return (
    <>
      <Portal>
        <Modal
          visible={showModal}
          onDismiss={() => setShowModal(false)}
          contentContainerStyle={containerStyle}
        >
          <TaskModal />
        </Modal>
      </Portal>
      <View>
        {Object.entries(lists).map(([key, value], idx) => (
          <TaskList key={idx} list={[key, value]} />
        ))}
      </View>
      <TouchableOpacity style={styles.addTaskBtn}>
        <Button
          color="#3D5CFF"
          mode="contained"
          style={styles.btn}
          onPress={() => setShowModal(true)}
        >
          + Add Task
        </Button>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  addTaskBtn: {
    width: "50%",
    backgroundColor: "#FFFFFF",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
    elevation: 6,
    position: "absolute",
    right: 20,
    bottom: 20,
    padding: 10,
  },
  btn: {
    borderRadius: 10,
  },
});

export default Tasks;

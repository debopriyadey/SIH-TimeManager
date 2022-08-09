import React from "react";
import { Modal, Text, View, StyleSheet, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function GoalModal({ modal, changeModal }) {
  return (
    <Modal animationType="slide" transparent={true} visible={modal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Entypo name="circle-with-cross" size={70} color="red" />
          <Text style={styles.modalText}>
            This is not a SMART Task You may break it into sub tasks or set it
            as a goal.
          </Text>
          <Pressable style={styles.button} onPress={changeModal}>
            <Text style={styles.btn_text}>Divide in Subtasks</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text style={styles.btn_text}>Set as a Goal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginTop: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#009387",
  },
  btn_text: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(161, 157, 157,0.2)",
  },
  modalView: {
    width: "60%",
    height: "40%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginTop: 15,
    fontSize: 15,
    textAlign: "center",
  },
});

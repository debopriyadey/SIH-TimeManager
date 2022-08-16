import React from "react";
import { Modal, Text, View, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import AppButton from "./AppButton";

export default function GoalModal({
  modal,
  changeModal,
  modalText,
  btn1Text,
  btn2Text,
  btn3Text,
}) {
  return (
    <Modal animationType="slide" transparent={true} visible={modal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Entypo name="circle-with-cross" size={70} color="red" />
          <Text style={styles.modalText}>{modalText}</Text>
          <AppButton
            title={btn1Text}
            btnStyle={styles.button}
            txtStyle={styles.btn_text}
            onPress={changeModal}
          />
          {btn2Text ? (
            <AppButton
              title={btn2Text}
              btnStyle={styles.button}
              txtStyle={styles.btn_text}
              onPress={changeModal}
            />
          ) : null}
          {btn3Text ? (
            <AppButton
              title={btn3Text}
              btnStyle={styles.button}
              txtStyle={styles.btn_text}
              onPress={changeModal}
            />
          ) : null}
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
    backgroundColor: "#3c40bd",
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
    height: "50%",
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

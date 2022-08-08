import React from "react";
import { View, Text, TextInput, StyleSheet, StatusBar } from "react-native";
import * as Animatable from "react-native-animatable";
import { useTheme, Button, Modal, Portal } from "react-native-paper";

import CreateRoomModal from "../components/TaskRoom/CreateRoomModal";
import JoinTaskRoomModal from "../components/TaskRoom/JoinTaskRoomModal";

const dummyCode = "https://meet.google.com/ruy-exui-wkz";

export default function CreateOrJoinTaskRoom() {
  const [roomData, setRoomData] = React.useState({
    roonName: "",
    isValidRoomName: true,
  });
  const [showCreateRoomModal, setCreateRoomModal] = React.useState(false);
  const [showJoinRoomModal, setJoinRoomModal] = React.useState(false);
  const [roomCode, setRoomCode] = React.useState("");

  const { colors } = useTheme();

  const roomNameChangeHandler = (value) => {
    if (value.trim().length >= 4) {
      setRoomData({
        roomName: value,
        isValidRoomName: true,
      });
    } else {
      setRoomData({
        roonName: value,
        isValidRoomName: false,
      });
    }
  };

  const createRoomHandler = () => {
    // Generate the link or code in the backend
    setRoomCode(dummyCode);
    setCreateRoomModal(true);
  };

  const joinRoomHandler = () => {
    setJoinRoomModal(true);
  };

  const hideModal = () => {
    if (showCreateRoomModal) setCreateRoomModal(false);
    else setJoinRoomModal(false);
  };

  const containerStyle = {
    backgroundColor: "#fff",
    padding: 10,
    height: 200,
    borderRadius: 30,
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Create Or Join A TaskRoom!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <Portal>
          <Modal
            visible={showCreateRoomModal}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <CreateRoomModal roomCode={roomCode} />
          </Modal>
        </Portal>
        <Portal>
          <Modal
            visible={showJoinRoomModal}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <JoinTaskRoomModal />
          </Modal>
        </Portal>
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
            },
          ]}
        >
          TaskRoom Name:
        </Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Enter the Room Name"
            placeholderTextColor="#666666"
            style={[styles.textInput]}
            autoCapitalize="none"
            onChangeText={(value) => roomNameChangeHandler(value)}
          />
        </View>
        {roomData.isValidRoomName ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Room name must be 4 characters long.
            </Text>
          </Animatable.View>
        )}
        <Button
          style={styles.createBtn}
          onPress={createRoomHandler}
          color="#009387"
          mode="contained"
        >
          Create Room
        </Button>
        <Button
          style={styles.joinBtn}
          color="#009387"
          onPress={joinRoomHandler}
        >
          Join Room With Code
        </Button>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: 12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  createBtn: {
    marginTop: 30,
    borderRadius: 90,
  },
  joinBtn: {
    marginTop: 30,
    borderColor: "gray",
    borderRadius: 90,
  },
});
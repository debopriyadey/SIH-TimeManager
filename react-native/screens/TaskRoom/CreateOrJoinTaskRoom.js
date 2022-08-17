import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text, TextInput, StyleSheet, StatusBar } from "react-native";
import * as Animatable from "react-native-animatable";
import { useTheme, Button, Modal, Portal } from "react-native-paper";
import * as api from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { setRoom } from "../../redux/slice/roomSlice";

import CreateRoomModal from "../../components/TaskRoom/CreateRoomModal";
import JoinTaskRoomModal from "../../components/TaskRoom/JoinTaskRoomModal";

const dummyCode = "https://meet.google.com/ruy-exui-wkz";

export default function CreateOrJoinTaskRoom({ navigation }) {
  const [roomData, setRoomData] = React.useState({
    roomName: "",
    isValidRoomName: true,
  });
  const [showCreateRoomModal, setCreateRoomModal] = React.useState(false);
  const [showJoinRoomModal, setJoinRoomModal] = React.useState(false);
  const [roomCode, setRoomCode] = React.useState("");
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const room = useSelector((state) => state.room);

  const roomNameChangeHandler = (value) => {
    if (value.trim().length >= 4) {
      setRoomData({
        roomName: value,
        isValidRoomName: true,
      });
    } else {
      setRoomData({
        roomName: value,
        isValidRoomName: false,
      });
    }
  };

  const createRoomHandler = async () => {
    // Generate the link or code in the backend
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      console.log(userToken);
      const { data: room } = await api.createRoom({
        token: userToken,
        roomName: roomData.roomName,
      });
      dispatch(setRoom(room));
      setCreateRoomModal(true);
    } catch (error) {
      console.log(error);
    }
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
      <StatusBar backgroundColor="#3c40bd" barStyle="light-content" />
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
            <CreateRoomModal roomCode={room.roomCode} />
          </Modal>
        </Portal>
        <Portal>
          <Modal
            visible={showJoinRoomModal}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <JoinTaskRoomModal
              navigation={navigation}
              setJoinRoomModal={setJoinRoomModal}
            />
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
          color="#3c40bd"
          mode="contained"
          disabled={roomData.isValidRoomName ? false : true}
        >
          Create Room
        </Button>
        <Button
          style={styles.joinBtn}
          color="#3c40bd"
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
    backgroundColor: "#3c40bd",
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

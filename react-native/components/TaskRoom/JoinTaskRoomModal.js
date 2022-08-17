import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useSelector } from "react-redux";

import { joinRoom } from "../../socket/socketConnection";

export default function JoinTaskRoomModal({ navigation, setJoinRoomModal }) {
  const [code, setCode] = React.useState("");
  const user = useSelector((state) => state.user);
  const joinRoomHandler = () => {
    // Code for sending request to server and joining the room
    joinRoom(code, user);
    setJoinRoomModal(false);
    navigation.navigate("RoomScreen");
  };
  return (
    <View style={styles.container}>
      <TextInput
        label="Code"
        placeholder="Enter the Joining Code"
        onChangeText={(text) => setCode(text)}
      />
      <Button
        color="#3c40bd"
        mode="contained"
        style={styles.joinBtn}
        onPress={joinRoomHandler}
      >
        Join Room
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  joinBtn: {
    borderRadius: 30,
    marginTop: 20,
  },
});

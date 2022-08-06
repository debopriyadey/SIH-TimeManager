import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";

export default function JoinTaskRoomModal() {
  const [code, setCode] = React.useState("");
  const joinRoomHandler = () => {
    // Code for sending request to server and joining the room
  };
  return (
    <View style={styles.container}>
      <TextInput
        label="Code"
        placeholder="Enter the Joining Code"
        onChangeText={(text) => setCode(text)}
      />
      <Button
        color="#009387"
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

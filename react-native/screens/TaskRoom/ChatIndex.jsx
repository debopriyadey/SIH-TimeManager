import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setRoom } from "../../redux/slice/roomSlice";
import { ScrollView } from "react-native-gesture-handler";

const ChatIndex = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const rooms = user.rooms;

  // Populate user.rooms in the backend after authentication
  // const rooms = [
  //   { id: 1, roomName: "Study", roomCode: "ab" },
  //   { id: 2, roomName: "Code", roomCode: "cd" },
  //   { id: 3, roomName: "Play", roomCode: "ef" },
  //   { id: 4, roomName: "Sleep", roomCode: "gh" },
  // ];

  const openRoom = (room) => {
    console.log("line 20 ChatIndex", room);
    dispatch(
      setRoom({
        ...room,
        roomId: room._id,
      })
    );
    navigation.navigate("RoomScreen");
  };

  const generateBoxShadowStyle = (
    xOffset,
    yOffset,
    shadowColorIos,
    shadowOpacity,
    shadowRadius,
    elevation,
    shadowColorAndroid
  ) => {
    if (Platform.OS === "ios") {
      return {
        shadowColor: shadowColorIos,
        shadowOffset: { width: xOffset, height: yOffset },
        shadowOpacity,
        shadowRadius,
      };
    } else if (Platform.OS === "android") {
      return {
        elevation,
        shadowColor: shadowColorAndroid,
      };
    }
  };

  const shadow = generateBoxShadowStyle(
    -2,
    4,
    "#171717",
    0.2,
    3,
    20,
    "#171717"
  );
  return (
    <ScrollView>
      <View>
        {rooms.map((room) => (
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
              },
            ]}
            onPress={() => openRoom(room)}
            key={room._id}
          >
            <View style={[styles.card, shadow]}>
              <Text>{room.roomName}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  theme: {
    backgroundColor: "#3c40bd",
  },
  container: {
    borderColor: "red",
    borderWidth: 2,
    padding: 20,
    backgroundColor: "#aba9a4",
    marginVertical: 5,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 20,
    margin: 10,
    marginVertical: 10,
  },
});

export default ChatIndex;

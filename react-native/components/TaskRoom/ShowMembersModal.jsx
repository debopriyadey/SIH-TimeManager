import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Pressable,
  Image,
} from "react-native";
import { List } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../redux/slice/roomSlice";
import { deleteUser } from "../../socket/socketConnection";

const face = require("../../assets/face1.png");

const ShowMembersModal = ({ users, roomId }) => {
  const dispatch = useDispatch();
  const room = useSelector((state) => state.room);
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

  const handleClick = (userId) => {
    console.log(userId);
    dispatch(removeUser(userId));
    deleteUser(userId, roomId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {users.map((user) => (
          <View style={[styles.card, shadow]}>
            <View style={[styles.inlineView, { justifyContent: "flex-start" }]}>
              <View>
                <Image
                  source={face}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>
              <View style={{ marginLeft: 20 }}>
                <Text>{user.name}</Text>
              </View>
            </View>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
                  paddingRight: 6,
                },
              ]}
              onPress={() => handleClick(user._id)}
            >
              <List.Icon icon={"delete"} color={"#ff7a70"} />
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    // paddingVertical: 20,
    // paddingHorizontal: 20,
    margin: 10,
    marginVertical: 10,
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    height: hp("9%"),
  },
  inlineView: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    alignSelf: "baseline",
    justifyContent: "space-between",
    alignItems: "center",
    paddingInline: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});

export default ShowMembersModal;

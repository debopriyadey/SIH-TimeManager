import * as React from "react";
import * as Animatable from "react-native-animatable";
import AppBar from "../../components/TaskRoom/AppBar";
import TabBar from "../../components/TaskRoom/TabBar";
import CreateRoomModal from "../../components/TaskRoom/CreateRoomModal";
import { useSelector } from "react-redux";
import { useTheme, Modal, Portal } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StyleSheet, View } from "react-native";
import ShowMembersModal from "../../components/TaskRoom/ShowMembersModal";

const RoomScreen = ({ navigation }) => {
  const [showCode, setShowCode] = React.useState(false);
  const [showPeople, setShowPeople] = React.useState(false);
  const room = useSelector((state) => state.room);
  const { colors } = useTheme();

  const container1Style = {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 30,
    height: hp("30%"),
  };

  const container2Style = {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 30,
    height: hp("80%"),
  };

  return (
    <Animatable.View
      animation="fadeInUpBig"
      style={[
        styles.footer,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <AppBar
        navigation={navigation}
        setShowCode={setShowCode}
        setShowPeople={setShowPeople}
      />
      <TabBar />

      <Portal>
        <Modal
          visible={showCode}
          onDismiss={() => setShowCode(false)}
          contentContainerStyle={container1Style}
        >
          <CreateRoomModal roomCode={room.roomCode} />
        </Modal>
      </Portal>
      <Portal>
        <Modal
          visible={showPeople}
          onDismiss={() => setShowPeople(false)}
          contentContainerStyle={container2Style}
        >
          <ShowMembersModal users={room.users} roomId={room.roomId} />
        </Modal>
      </Portal>
    </Animatable.View>
  );
};

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

export default RoomScreen;

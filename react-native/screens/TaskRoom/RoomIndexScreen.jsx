import { StyleSheet, View, Text, Pressable } from "react-native";
import { Appbar } from "react-native-paper";
import { Tabs, TabScreen } from "react-native-paper-tabs";
import CreateOrJoinTaskRoom from "./CreateOrJoinTaskRoom";
import ChatIndex from "./ChatIndex";

const RoomIndexScreen = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Tabs style={styles.theme} theme={{ colors: { text: "#3D5CFF" } }}>
      <TabScreen label="Chats" icon="message">
        <ChatIndex />
      </TabScreen>
      <TabScreen
        label="Create Or Join Task Room"
        icon="checkbox-marked-circle-plus-outline"
      >
        <CreateOrJoinTaskRoom />
      </TabScreen>
    </Tabs>
  );
};

const styles = StyleSheet.create({
  theme: {
    backgroundColor: "#3c40bd",
  },
});

export default RoomIndexScreen;

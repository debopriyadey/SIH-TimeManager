import { StyleSheet } from "react-native";
import { Tabs, TabScreen } from "react-native-paper-tabs";
import Chat from "./Chat";
import { useEffect } from "react";
import Tasks from "./Tasks";

function TabBar() {
  useEffect(() => {
    renderChat();
  }, []);

  function renderChat() {
    return <Chat />;
  }

  return (
    <Tabs style={styles.theme} theme={{ colors: { text: "#3D5CFF" } }}>
      <TabScreen label="Chats" icon="message">
        {renderChat()}
      </TabScreen>
      <TabScreen label="Tasks" icon="checkbox-marked-circle-plus-outline">
        <Tasks />
      </TabScreen>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  theme: {
    backgroundColor: "#3D5CFF",
    color: "#3D5CFF",
  },
});

export default TabBar;

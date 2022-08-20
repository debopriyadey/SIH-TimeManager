import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import notifications from "../../model/Notifications";
import NotificationCard from "./NotificationCard";
import DeleteComp from "./../Common/DeleteComp";

function AppNotifications({ navigation }) {
  const [messages, setMessages] = useState(notifications);
  const handleDelete = (message) => {
    setMessages(messages.filter((m) => m.id !== message.id));
  };
  const handleScreen = (item) => {
    if (item.tags == "Task") {
      navigation.navigate("Schedule");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Home")}>
          <Ionicons name="arrow-back" size={35} color="black" />
        </TouchableWithoutFeedback>
        <Text style={styles.heading}>Notifications</Text>
      </View>
      <View style={styles.notification}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NotificationCard
              title={item.heading}
              subTitle={item.desc}
              image={item.tags}
              manageScreen={() => handleScreen(item)}
              renderRightActions={() => (
                <DeleteComp onPress={() => handleDelete(item)} />
              )}
            />
          )}
        />
      </View>
    </View>
  );
}

export default AppNotifications;
const styles = StyleSheet.create({
  container: {
    padding: 5,
    overflow: "scroll",
  },
  headerView: {
    paddingHorizontal: 10,
    flexBasis: "9%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#C0C0C0",
    borderBottomWidth: 1,
  },
  heading: {
    fontSize: 25,
    marginLeft: 15,
  },
  notification: {
    flexBasis: "91%",
  },
});

import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import notifications from "../../model/Notifications";
import NotificationCard from "./NotificationCard";
import DeleteComp from "./../Common/DeleteComp";

function AppNotifications({ navigation }) {
  const [messages, setMessages] = useState(notifications);
  const [token, setToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }
  const handleDelete = (message) => {
    setMessages(messages.filter((m) => m.id !== message.id));
  };
  const handleScreen = (item) => {
    if (item.tags == "Task") {
      navigation.navigate("Schedule");
    }
  };

  useEffect(() => {
    console.log("component did mount");
    registerForPushNotificationsAsync()
      .then((data) => {
        console.log(data);
        setToken(data);
      })
      .catch((err) => console.log(err));
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        console.log(notification);
      });
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      // Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
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

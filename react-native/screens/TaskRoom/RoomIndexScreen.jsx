import { StyleSheet, View, Text, Pressable } from "react-native";
import { Appbar } from "react-native-paper";
import { Tabs, TabScreen } from "react-native-paper-tabs";
import CreateOrJoinTaskRoom from "./CreateOrJoinTaskRoom";
import ChatIndex from "./ChatIndex";
import { useEffect, useState } from "react";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { getRooms } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { setRooms } from "../../redux/slice/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RoomIndexScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const goBack = () => {
    navigation.goBack();
  };
  const user = useSelector(state => state.user);

  useEffect(() => {
    fetchRooms();
    setLoading(false);
  }, []);

  const fetchRooms = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const { data: rooms } = await getRooms(user._id, token);
      dispatch(setRooms(rooms));
    } catch (error) {
      console.log(error);
    }
  }

  if (loading)
    return <ActivityIndicator animating={true} />

  return (
    <Tabs style={styles.theme} theme={{ colors: { text: "#3D5CFF" } }}>
      <TabScreen label="Task Rooms" icon="message">
        <ChatIndex navigation={navigation} />
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

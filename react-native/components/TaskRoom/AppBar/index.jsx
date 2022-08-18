import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Appbar } from "react-native-paper";
import TopMenu from "./TopMenu";
import { useSelector } from "react-redux";

const AppBar = ({ navigation, setShowCode }) => {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const room = useSelector(state => state.room);

  const _goBack = () => navigation.navigate("Space");

  const _handleShowCode = () => setShowCode(prev => !prev);

  const _handleMore = () => setVisible(true);

  return (
    <View>
      <Appbar.Header style={styles.theme}>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title={room.roomName} />
        <Appbar.Action icon="qrcode" onPress={_handleShowCode} />
        <TopMenu menuVisibility={[menuVisible, setMenuVisible]} />
      </Appbar.Header>
    </View>
  );
};

const styles = StyleSheet.create({
  theme: {
    backgroundColor: "#3D5CFF",
  },
});

export default AppBar;

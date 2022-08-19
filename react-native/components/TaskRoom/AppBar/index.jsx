import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Appbar } from "react-native-paper";
import TopMenu from "./TopMenu";

const AppBar = () => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  const _goBack = () => console.log("Went back");

  const _handleSearch = () => console.log("Searching");

  const _handleMore = () => setVisible(true);

  return (
    <View>
      <Appbar.Header style={styles.theme}>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Task Space" />
        <Appbar.Action icon="account-circle" onPress={_handleSearch} />
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

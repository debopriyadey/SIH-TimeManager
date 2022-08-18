import * as React from "react";
import { Button, Menu, Appbar } from "react-native-paper";

const TopMenu = ({ menuVisibility }) => {
  const [visible, setvisible] = menuVisibility;

  return (
    <Menu
      visible={visible}
      onDismiss={() => setvisible(false)}
      anchor={
        <Appbar.Action
          icon="account-group"
          color="white"
          onPress={() => setvisible(true)}
        />
      }
    >
      <Menu.Item
        title="Action 1"
        onPress={() => console.info("action triggered")}
      />
      <Menu.Item
        title="Action 2"
        onPress={() => console.info("action triggered")}
      />
      <Menu.Item
        title="Action 3"
        onPress={() => console.info("action triggered")}
      />
    </Menu>
  );
};

export default TopMenu;

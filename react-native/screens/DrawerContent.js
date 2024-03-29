import React from "react";
import { View, StyleSheet, Alert, Image } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  Button,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch, useSelector } from "react-redux";
import { saveUserInfo, signout } from "../redux/slice/userSlice";
import * as api from "../api";
import { saveSuperUserInfo } from "../redux/slice/superUser";
import { USER_TYPE } from "../constants";
export function DrawerContent(props) {
  
  const dispatch = useDispatch();
  const superUser = useSelector((state) => state.superUser)
  console.log(superUser)
  const user = useSelector((state) => state.user);
  const paperTheme = useTheme();
  const handleSignout = async () => {
    try {
      const data = { token: user.token };
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("superUserToken")
      await api.signout(data);
      // props.navigation.navigate("signin")
      dispatch(signout());
    } catch (error) {
      console.log("got error while signout!.", error.response);
      Alert.alert(
        "Wrong Input!",
        error.response?.data?.error || "something went wrong.",
        [{ text: "Okay" }]
      );
    }
  };

  const handleRevert = () => {
    // super to user 
    dispatch(saveUserInfo(superUser))
    dispatch(saveSuperUserInfo({}))
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Image
                source={require('../assets/Avatar.png')}
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 50,
                }}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>{user.name}</Title>
                <Caption style={styles.caption}>@{user.username}</Caption>
              </View>
            </View>

            {/* <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  80
                </Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  100
                </Paragraph>
                <Caption style={styles.caption}>Followers</Caption>
              </View>
            </View> */}
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Image
                  source={require('../icons/home_blue.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                  }}
                />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Image
                  source={require('../icons/profile_blue.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                  }}
                />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
            />
            {
              user.type === USER_TYPE.NORMAL ? (
                <DrawerItem
                  icon={({ color, size }) => (
                    <Image
                      source={require('../icons/child_blue.png')}
                      resizeMode="contain"
                      style={{
                        width: 25,
                        height: 25,
                      }}
                    />
                  )}
                  label="Child"
                  onPress={() => {
                    props.navigation.navigate("ParentControl");
                  }}
                /> ) : null
            }
            <DrawerItem
              icon={({ color, size }) => (
                <Image
                  source={require('../icons/setting_blue.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                  }}
                />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate("SettingsScreen");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Image
                  source={require('../icons/support_blue.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                  }}
                />
              )}
              label="Support"
              onPress={() => {
                props.navigation.navigate("SupportScreen");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Image
                  source={require('../icons/createroom_blue.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                  }}
                />
              )}
              label="Create Room"
              onPress={() => {
                props.navigation.navigate("CreateOrJoinTaskRoom");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Image
                  source={require('../icons/room_blue.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                  }}
                />
              )}
              label="Room Screen"
              onPress={() => {
                props.navigation.navigate("RoomScreen");
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}
            >
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      {
        superUser.username ? (
          <Drawer.Section style={[styles.bottomDrawerSection, {marginBottom: 5}]}>
            <DrawerItem
              icon={({ color, size }) => (
                <Image
                  source={require('../icons/switch.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                  }}
                />
              )}
              label="Switch to Parent"
              onPress={handleRevert}
            />
          </Drawer.Section>
        ) : null
      }

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Image
              source={require('../icons/signout_blue.png')}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
              }}
            />
          )}
          label="Sign Out"
          onPress={handleSignout}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 10,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
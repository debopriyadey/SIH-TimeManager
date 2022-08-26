import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "./screens/OnboardingScreen";
import HomeScreen from "./screens/HomeScreen";
import {
  Provider as StoreProvider,
  useDispatch,
  useSelector,
} from "react-redux";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";

import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { DrawerContent } from "./screens/DrawerContent";
import MainTabScreen from "./screens/MainTabScreen";
import SupportScreen from "./screens/SupportScreen";
import SettingsScreen from "./screens/SettingsScreen";
import BookmarkScreen from "./screens/BookmarkScreen";
import ParentControl from "./screens/ParentControl";
import SessionScreen from "./screens/SessionScreen";
import SearchScreen from "./screens/SearchScreen";
import Notifications from "./screens/Notifications";
import AccountScreen from "./screens/AccountScreen";
import Pomodoro from "./screens/Pomodoro";
import TodoForm from "./components/TodoForm/TodoForm";
import GoalForm from "./components/GoalForm/GoalForm";
import Schedule from "./components/Schedule/Schedule";
import Progress from "./components/Progress/Progress";
import AppNotifications from "./components/Notifications/AppNotifications";
import Loading from "./screens/Loading";
import Focus from "./screens/Focus";
import TaskBucket from "./screens/TaskBucket";
import RootStackScreen from "./screens/RootStackScreen";
import CreateOrJoinTaskRoom from "./screens/TaskRoom/CreateOrJoinTaskRoom";
import RoomScreen from "./screens/TaskRoom/RoomScreen";
import store from "./redux/store";
import * as api from "./api";

import { mapping, light as lightTheme } from "@eva-design/eva";
import { ApplicationProvider, Layout } from "react-native-ui-kitten";

import DetailsScreen from "./screens/DetailsScreen";
import { saveUserInfo } from "./redux/slice/userSlice";
import { connectWithSocketServer } from "./socket/socketConnection";
import { Text } from "react-native";
import { saveSuperUserInfo } from "./redux/slice/superUser";
import ProfileScreen from "./screens/ProfileScreen";
import RoutineScreen from "./screens/RoutineSceen";

const Drawer = createDrawerNavigator();
const App = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: "#ffffff",
      text: "#333333",
      primary: "#3498db",
      secondary: "#f1c40f",
      tertiary: "#a1b2c3",
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: "#333333",
      text: "#ffffff",
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  useEffect(() => {
    console.disableYellowBox = true;
 
  }, []);
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Application />
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
};

const Application = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);

  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user);
  const superUser = useSelector((state) => state.superUser);


  useEffect(() => {
    async function setData() {
      let userToken = null;
      let superUserToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        superUserToken = await AsyncStorage.getItem("superUserToken");
        console.log("Got superUser and user ", superUserToken, userToken);
        if (superUserToken) {
          console.log("requesting super user info", superUserToken);
          const response = await api.getUserInfo(superUserToken);
          console.log("got loggedIn superUserInfo!", response.data);
          dispatch(saveSuperUserInfo(response.data));
        }
        if (userToken) {
          const response = await api.getUserInfo(userToken);
          console.log("got loggedIn userInfo!", response.data);
          dispatch(saveUserInfo(response.data));
          connectWithSocketServer(userToken);
        } else setIsLoading(false);
      } catch (e) {
        console.log(e.response?.data?.message || e.message);
        setIsLoading(false);
      }
    }

    setData();
  }, []);

  useEffect(() => {
    if (token) {
      setIsLoading(false);
    }
  }, [token]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : token ? (
        <Drawer.Navigator
          screenOptions={{ headerShown: false, drawerPosition: "right" }}
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen name="Home" component={MainTabScreen} />
          <Drawer.Screen name="ParentControl" component={ParentControl} />
          <Drawer.Screen name="Profile" component={AccountScreen} />
          <Drawer.Screen name="SessionScreen" component={SessionScreen} />
          <Drawer.Screen name="SearchScreen" component={SearchScreen} />
          <Drawer.Screen name="Notifications" component={Notifications} />
          <Drawer.Screen name="Pomodoro" component={Pomodoro} />
          <Drawer.Screen name="TaskBucket" component={TaskBucket} />
          <Drawer.Screen name="RoutineScreen" component={RoutineScreen} />
          <Drawer.Screen name="TodoForm" component={TodoForm} />
          <Drawer.Screen name="GoalForm" component={GoalForm} />
          <Drawer.Screen name="Schedule" component={Schedule} />
          <Drawer.Screen name="Progress" component={Progress} />
          <Drawer.Screen name="AppNotifications" component={AppNotifications} />
          <Drawer.Screen name="Focus" component={Focus} />
          <Drawer.Screen name="Details" component={DetailsScreen} />
          <Drawer.Screen name="SupportScreen" component={SupportScreen} />
          <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
          <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
          <Drawer.Screen
            name="CreateOrJoinTaskRoom"
            component={CreateOrJoinTaskRoom}
          />
          <Drawer.Screen name="RoomScreen" component={RoomScreen} />
        </Drawer.Navigator>
      ) : (
        <RootStackScreen />
      )}
    </>
  );
};

export default App;

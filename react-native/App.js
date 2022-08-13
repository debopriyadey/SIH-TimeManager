import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import { Provider as StoreProvider, useDispatch, useSelector } from "react-redux";
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContent } from './screens/DrawerContent';
import MainTabScreen from './screens/MainTabScreen';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/SettingsScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import ParentControl from './screens/ParentControl';
import SessionScreen from './screens/SessionScreen';
import RootStackScreen from './screens/RootStackScreen';
import store from "./redux/store";
import * as api from './api'
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout } from 'react-native-ui-kitten';

import DetailsScreen from './screens/DetailsScreen';
import { saveUserInfo } from './redux/slice/userSlice';

const Drawer = createDrawerNavigator();
const App = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);


  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;




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

  const token = useSelector((state) => state.user.token)

  useEffect(() => {
    async function setData() {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        console.log("Got userToken", userToken)
        if (userToken) {
          const data = { token: userToken }
          const response = await api.getUserInfo(data)
          console.log("got loggedIn userInfo!", response.data)
          dispatch(saveUserInfo(response.data));
        }
      } catch (e) {
        console.log(e.message);
      }
    }

    setData()
  }, [])
  return (
    <>
      {token ? (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          <Drawer.Screen name="ParentControl" component={ParentControl} />
          <Drawer.Screen name="SessionScreen" component={SessionScreen} />
          <Drawer.Screen name="Details" component={DetailsScreen} />
          <Drawer.Screen name="Home" component={MainTabScreen} />
          <Drawer.Screen name="SupportScreen" component={SupportScreen} />
          <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
          <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
        </Drawer.Navigator>
      )
        :
        <RootStackScreen />
      }
    </>
  )
}

export default App;

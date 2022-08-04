import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();

const App = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);

  useEffect(() => {
    async function setData () {
      const appData = await AsyncStorage.getItem('isAppFirstLaunched');
      if (appData === null) {
        await AsyncStorage.setItem('isAppFirstLaunched', 'true');
        setIsAppFirstLaunched(true);
      } else {
        await AsyncStorage.setItem('isAppFirstLaunched', 'false');
        setIsAppFirstLaunched(false);
      }
    }
  
    setData()
  }, [])

  // React.useEffect(async () => {
  //   const appData = await AsyncStorage.getItem('isAppFirstLaunched');
  //   if (appData == null) {
  //     setIsAppFirstLaunched(true);
  //     AsyncStorage.setItem('isAppFirstLaunched', 'false');
  //   } else {
  //     setIsAppFirstLaunched(false);
  //   }

  //   // AsyncStorage.removeItem('isAppFirstLaunched');
  // }, []);
  
  return (
    isAppFirstLaunched != null && (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {isAppFirstLaunched && (
            <Stack.Screen
              name="OnboardingScreen"
              component={OnboardingScreen}
            />
          )}
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
};

export default App;

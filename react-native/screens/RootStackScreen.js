import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import OnboardingScreen from './OnboardingScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import DetailsScreen from './DetailsScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator screenOptions = {{headerMode:'false'}}>
        <RootStack.Screen name="OnboardingScreen" component={OnboardingScreen}/>
        <RootStack.Screen name="Details" component={DetailsScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
    </RootStack.Navigator>
);

export default RootStackScreen;
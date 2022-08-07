import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Pomodoro from './Pomodoro';

const DetailsScreen = ({navigation}) => {
    return (
      <Pomodoro />
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});

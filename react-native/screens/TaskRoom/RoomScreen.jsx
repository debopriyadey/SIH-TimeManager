import * as React from 'react';
import { View } from 'react-native-animatable';
import AppBar from '../../components/TaskRoom/AppBar';
import TabBar from '../../components/TaskRoom/TabBar';

const MyComponent = () => {

  return (
    <View>
      <AppBar />
      <TabBar />
    </View>
  );
};

export default MyComponent;
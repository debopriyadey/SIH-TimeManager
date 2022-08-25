import { Tabs, TabScreen } from 'react-native-paper-tabs';
import { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

// You can import from local files
// or any pure javascript modules available in npm
import { Avatar, Button, Card } from 'react-native-paper';

function TaskList() {
  return (
    // <SafeAreaView style={styles.container}>
    //   <ScrollView style={styles.scrollView}>
    <Tabs>
      <TabScreen label="Previous">
        
      </TabScreen>
      <TabScreen label="Upcomming">
       
      </TabScreen>
    </Tabs>
    //   </ScrollView>
    // </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#F5F7FF',
  },
  scrollView: { marginHorizontal: 5 },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  helperText: {
    fontSize: 12,
  },
  inlineView: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'baseline',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingInline: 10,
  },
  resCard: {
    marginVertical: 5,
  },
});

export default TaskList;

import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { USER_TYPE } from '../constants';


// or any pure javascript modules available in npm
import { Avatar, Button, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';

export default function AccountScreen() {
  const [text, setText] = React.useState('');
  const updateAccPermission = useSelector((state) => state.user?.restricted?.updateTask) 
  const userType = useSelector((state) => state.user?.type)
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.inlineView}>
          <Text style={styles.paragraph}>Account</Text>
        </View>
        <View
          style={[
            styles.inlineView,
            { justifyContent: 'center', marginTop: 20 },
          ]}>
          <Avatar.Icon size={100} icon="file" />
        </View>

        <TextInput
          style={styles.textInput}
          label="Name"
          type="text"
          mode="outlined"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <TextInput
          style={styles.textInput}
          label="Email"
          type="email"
          mode="outlined"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <Button mode="contained" style={styles.textInput} disabled={ userType === USER_TYPE.CHILD && !updateAccPermission}>Save</Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  scrollView: {
    marginHorizontal: 5,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
  },
  inlineView: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'baseline',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingInline: 10,
  },
  textInput: {
    width: '100%',
    marginVertical: 5,
  },
});

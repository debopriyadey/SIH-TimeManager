import * as React from 'react';
import { Text, View, StyleSheet, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

// You can import from local files

// or any pure javascript modules available in npm
import {
  Avatar,
  Button,
  Card,
  Badge,
  Modal,
  Portal,
  Provider,
  IconButton,
  MD3Colors,
  TextInput,
} from 'react-native-paper';

export default function ParentControl() {
  const [visible, setVisible] = React.useState(false);
  const [inputFocused, setInputFocused] = React.useState(false);
  const [text, setText] = React.useState('');

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [childData, setChildData] = React.useState([
    {
      username: 'Child 1',
      password: 'pass',
      profileImg: '',
      logedin: true,
      restricted: {
        updateAcc: false,
        updateTask: false,
        usePomodoro: false,
        connectCounsel: false
      }
    },
    {
      username: 'Child 2',
      password: 'word',
      profileImg: '',
      logedin: false,
      restricted: {
        updateAcc: false,
        updateTask: false,
        usePomodoro: false,
        connectCounsel: false
      }
    }
  ])

  const [addChild, setAddChild] = React.useState({
    username: '',
    password: '',
    restricted: {
      updateAcc: false,
      updateTask: false,
      usePomodoro: false,
      connectCounsel: false
    }
  })



  return (
    <SafeAreaView style={styles.container}>
      <Provider style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Portal style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.containerStyle}>
            <Text style={styles.heading}>Child 1.</Text>
            <Text style={styles.helperText}>logged in</Text>
            <View>
              <TextInput
                mode="outlined"
                label="Username"
                value={text}
                onChangeText={(text) => setText(text)}
              />
              <TextInput
                mode="outlined"
                label="Password"
                value={text}
                onChangeText={(text) => setText(text)}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.subHeading}>Control acess</Text>
              <View style={{ padding: 10 }}>
                <View style={styles.inlineView}>
                  <Text>Update Account</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
                <View style={styles.inlineView}>
                  <Text>Connect Counsel</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
                <View style={styles.inlineView}>
                  <Text>Update Task Time </Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
                <View style={styles.inlineView}>
                  <Text>Use Pomodoro </Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              </View>
            </View>
            <Button mode="contained" onPress={hideModal}>
              Update
            </Button>
          </Modal>
        </Portal>

        <View style={{ flex: 1, flexDirection: 'column' }}>
          {childData.map((child) => {
            <Card style={styles.resCard}>
              <View style={[styles.inlineView, { justifyContent: 'space-around' }]}>
                <View
                  style={{
                    backgroundColor: 'skyblue',
                    margin: 3,
                    padding: 7,
                    borderRadius: 10,
                    flex: 0.3,
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Avatar.Icon size={80} icon="search" />
                </View>
                <View style={{ flex: 0.8, padding: 5 }}>
                  <View style={styles.inlineView}>
                    <Text style={styles.heading}>{child.username}</Text>
                    {child.logedin ? <Badge style={{ backgroundColor: '#228B22' }}></Badge> : <Badge style={{ backgroundColor: '#800000' }}></Badge>}
                  </View>
                  <View style={{ marginVertical: 10 }}></View>
                  <View
                    style={[styles.inlineView, { justifyContent: 'flex-start' }]}>
                    <Button mode="contained" style={styles.btn}>
                      Details
                    </Button>
                    <Button mode="contained" style={styles.btn}>
                      Switch
                    </Button>
                  </View>
                </View>
              </View>
            </Card>
          })}

          <Card style={styles.resCard}>
            <View style={[styles.inlineView, { justifyContent: 'space-around' }]}>
              <View
                style={{
                  backgroundColor: 'skyblue',
                  margin: 3,
                  padding: 7,
                  borderRadius: 10,
                  flex: 0.3,
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Avatar.Icon size={80} icon="search" />
              </View>
              <View style={{ flex: 0.8, padding: 5 }}>
                <View style={styles.inlineView}>
                  <Text style={styles.heading}>Child 2</Text>
                  <Badge style={{ backgroundColor: '#800000' }}></Badge>
                </View>
                <View style={{ marginVertical: 10 }}></View>
                <View
                  style={[styles.inlineView, { justifyContent: 'flex-start' }]}>
                  <Button mode="contained" style={styles.btn}>
                    Details
                  </Button>
                  <Button mode="contained" style={styles.btn}>
                    Switch
                  </Button>
                </View>
              </View>
            </View>
          </Card>
        </View>

        <View
          style={[
            styles.inlineView,
            { justifyContent: 'flex-end', marginTop: 20 },
          ]}>
          {/* <Image
            source={require('../assets/addBtn.png')}
            resizeMode="contain"
            style={{
              width: 40,
              height: 40,
            }}
          /> */}
          <Button onPress={showModal}>
            add
          </Button>
        </View>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    margin: 10,
  },
  scrollView: {
    marginHorizontal: 5,
    backgroundColor: '#1fe3c1'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 20,
  },
  helperText: {
    fontSize: 12,
  },
  inlineView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingInline: 10,
  },
  btn: {
    width: 100,
    margin: 8,
  },
  resCard: {
    marginVertical: 5,
  },
});

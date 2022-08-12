import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.inlineView}>
          <Text style={styles.paragraph}>Child</Text>
        </View>
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
                <Text style={styles.heading}>Child 1</Text>
                <Badge style={{ backgroundColor: '#228B22' }}></Badge>
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
        <View
          style={[
            styles.inlineView,
            { justifyContent: 'flex-end', marginTop: 20 },
          ]}>
          <Button onPress={showModal}>
            <Image
              source={require('./assets/addBtn.png')}
              resizeMode="contain"
              style={{
                width: 40,
                height: 40,
              }}
            />
          </Button>
        </View>
        <Provider
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Portal
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
              <View style={{marginTop: 10}}>
                <Text style={styles.subHeading}>Control acess</Text>
                <View style={{padding: 10}}>
                  <Text>Can Update Task Time </Text>
                  <Text>Update Task Time </Text>
                  <Text>Use Pomodoro </Text>
                  <Text>Select Counsell </Text>
                </View>
              </View>
              <Button mode="contained" onPress={hideModal}>
                Update
              </Button>
            </Modal>
          </Portal>
        </Provider>
      </ScrollView>
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
    flex: 1,
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

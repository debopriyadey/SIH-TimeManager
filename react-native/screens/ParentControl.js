import * as React from 'react';
import { Text, View, StyleSheet, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';
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
import * as api from '../api';
import { debounce } from '../extras';
import { useSelector } from 'react-redux';

export default function ParentControl() {
  const token = useSelector((state) => state.user?.token)
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);



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
    name: '',
    username: '',
    password: '',
    usernameError: '',
    forSubmitError: '',
    hidePassword: false,
    isLoading: false,
    restricted: {
      updateAcc: false,
      updateTask: false,
      usePomodoro: false,
      connectCounsel: false
    }
  })

  const isUsernameExist = debounce(async (username) => {
    try {
      await api.isUsernameExist(username);
    } catch (error) {
      setAddChild((child) => ({
        ...child,
        usernameError: error.response?.data?.message || error.message
      }))
    }

  }, 200)


  const handleUsernameChange = (val) => {
    let username = val.trim();
    setAddChild((child) => ({
      ...child,
      username,
      usernameError: '',
      forSubmitError: ''
    }));
    if (username.trim().length >= 4) {
      isUsernameExist(username);
    } else {
      setAddChild((addChild) => ({
        ...addChild,
        usernameError: "Username must be at least 4 characters",
      }));
    }
  }

  const handleAddChild = async () => {
    try {
      setAddChild((addChild) => ({
        ...addChild,
        isLoading: true
      }))
      const data = {
        username: addChild.username,
        name: addChild.name,
        password: addChild.password,
        restricted: addChild.restricted
      }
      const response  = await api.addChild(data, token);
      console.log("created child ", response.data)
      setChildData((childData) => [...childData, response.data]);
      setAddChild({
        username: '',
        password: '',
        usernameError: '',
        forSubmitError: '',
        hidePassword: false,
        isLoading: false,
        restricted: {
          updateAcc: false,
          updateTask: false,
          usePomodoro: false,
          connectCounsel: false
        }
      })
    
      hideModal()
    } catch (error) {
      setAddChild((addChild) => ({
        ...addChild,
        forSubmitError: error.response?.data?.message || error.message
      }))
    }

  }

  React.useEffect(() => {
    console.log("Render ", token)
    const fetchData = async(token) => {``
      try {
        console.log(("Here is it."));
        const {data} =  await api.getChilds(token);
      console.log(typeof(data), data);
      setChildData(data)
      } catch (error) {
        console.log(error)
      }
  } 
  fetchData(token)
  }, [token]);

 

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
                label="Name"
                style={styles.inputStyle}
                value={addChild.name}
                onChangeText={(val) => {
                  setAddChild((addChild) => ({
                    ...addChild,
                    name: val,
                    forSubmitError: ''
                  }))
                }}
              />
              <TextInput
                mode="outlined"
                label="Username"
                style={styles.inputStyle}
                value={addChild.username}
                onChangeText={handleUsernameChange}
              />
              {addChild.usernameError ?
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>{addChild.usernameError}</Text>
                </Animatable.View> : null
              }
              <TextInput
                mode="outlined"
                label="Password"
                style={styles.inputStyle}
                secureTextEntry={addChild.hidePassword}
                value={addChild.password}
                right={<Image
                  source={require('../icons/search_blue.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                  }}
                />}
                onChangeText={(text) =>
                  setAddChild((child) => ({
                    ...child,
                    password: text,
                    forSubmitError: ''
                  }))
                }
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.subHeading}>Control acess</Text>
              <View style={{ padding: 10 }}>
                <View style={styles.inlineView}>
                  <Text>Update Account</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={addChild.restricted.updateAcc ? "#3D5CFF" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setAddChild((child) => ({
                      ...child,
                      restricted: {
                        ...child.restricted,
                        updateAcc: !child.restricted.updateAcc,
                        forSubmitError: ''
                      }
                    }))}
                    value={addChild.restricted.updateAcc}
                  />
                </View>
                <View style={styles.inlineView}>
                  <Text>Connect Counsel</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={addChild.restricted.connectCounsel ? "#3D5CFF" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setAddChild((child) => ({
                      ...child,
                      restricted: {
                        ...child.restricted,
                        connectCounsel: !child.restricted.connectCounsel,
                        forSubmitError: ''
                      }
                    }))}
                    value={addChild.restricted.connectCounsel}
                  />
                </View>
                <View style={styles.inlineView}>
                  <Text>Update Task Time </Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={addChild.restricted.updateTask ? "#3D5CFF" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setAddChild((child) => ({
                      ...child,
                      restricted: {
                        ...child.restricted,
                        updateTask: !child.restricted.updateTask,
                        forSubmitError: ''
                      }
                    }))}
                    value={addChild.restricted.updateTask}
                  />
                </View>
                <View style={styles.inlineView}>
                  <Text>Use Pomodoro </Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={addChild.restricted.usePomodoro ? "#3D5CFF" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setAddChild((child) => ({
                      ...child,
                      restricted: {
                        ...child.restricted,
                        usePomodoro: !child.restricted.usePomodoro,
                        forSubmitError: ''
                      }
                    }))}
                    value={addChild.restricted.usePomodoro}
                  />
                </View>
              </View>
            </View>
            {addChild.forSubmitError ?
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>{addChild.forSubmitError}</Text>
              </Animatable.View> : null
            }
            <Button mode="contained" onPress={handleAddChild} disabled={addChild.usernameError || !addChild.password || !addChild.username}>
              Add
            </Button>
          </Modal>
        </Portal>

        <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
          {childData.map((child) => (
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
                    <Text style={styles.btnText}>Detail</Text>
                    </Button>
                    <Button mode="contained" style={styles.btn}>
                     <Text  style={styles.btnText}>Switch</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </Card>
          ))}


        </ScrollView>

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
          <Button onPress={showModal}  style={styles.addBtn} color='#ffffff'>
            <Text>
            add
            </Text>
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
  addBtn: {
    backgroundColor: '#3d5cff',
  },
  helperText: {
    fontSize: 12,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  inputStyle: {
    marginTop: 15
  },
  errorMsgHide: {
    opacity: 0,
    color: '#FF0000',
    fontSize: 14,
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
    margin: 4,
    backgroundColor:  '#3d5cff'
  },
 btnText: {
  fontSize: 12
 },
  resCard: {
    marginVertical: 5,
  },
});

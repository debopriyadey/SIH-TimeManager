import * as React from "react";
import { Text, View, StyleSheet, Image, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

import * as Animatable from "react-native-animatable";
import {
  Avatar,
  Button,
  Card,
  Badge,
  Modal,
  Portal,
  Provider,
  TextInput,
  IconButton,
  MD3Colors,
} from "react-native-paper";
import * as api from "../api";
import { debounce } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { saveSuperUserInfo } from "../redux/slice/superUser";
import { saveUserInfo } from "../redux/slice/userSlice";
import SplashScreen from "./Loading";

export default function ParentControl({ navigation }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [isLoading, setIsLoading] = React.useState(true);

  const [childData, setChildData] = React.useState([]);
  const animation = React.useRef(null);

  const [addChild, setAddChild] = React.useState({
    _id: "",
    isNewChild: true,
    name: "",
    username: "",
    password: "",
    usernameError: "",
    formSubmitError: "",
    hidePassword: false,
    isLoading: false,
    restricted: {
      updateAcc: false,
      updateTask: false,
      usePomodoro: false,
      connectCounsel: false,
    },
  });

  const isUsernameExist = debounce(async (username) => {
    try {
      await api.isUsernameExist(username);
    } catch (error) {
      setAddChild((child) => ({
        ...child,
        usernameError: error.response?.data?.message || error.message,
      }));
    }
  }, 200);

  const handleUsernameChange = (val) => {
    let username = val.trim();
    setAddChild((child) => ({
      ...child,
      username,
      usernameError: "",
      formSubmitError: "",
    }));
    if (username.trim().length >= 4) {
      isUsernameExist(username);
    } else {
      setAddChild((addChild) => ({
        ...addChild,
        usernameError: "Username must be at least 4 characters",
      }));
    }
  };

  const handleNewChild = () => {
    setAddChild({
      _id: "",
      username: "",
      password: "",
      usernameError: "",
      formSubmitError: "",
      hidePassword: false,
      isLoading: false,
      isNewChild: true,
      restricted: {
        updateAcc: false,
        updateTask: false,
        usePomodoro: false,
        connectCounsel: false,
      },
    });
    showModal();
  };

  const handleAddChild = async () => {
    try {
      setAddChild((addChild) => ({
        ...addChild,
        isLoading: true,
      }));
      const data = {
        user: user,
        username: addChild.username,
        name: addChild.name,
        password: addChild.password,
        restricted: addChild.restricted,
        isNewChild: true,

      };
      console.log("token of user is ", user.token)
      const response = await api.addChild(data, user.token);
      console.log("created child ", response.data);
      setChildData((childData) => [...childData, response.data]);
      setAddChild({ ...addChild, isLoading: false });

      hideModal();
    } catch (error) {
      console.log("got error while creating child ", error.message)
      setAddChild((addChild) => ({
        ...addChild,
        isLoading: false,
        formSubmitError: error.response?.data?.message || error.message,
      }));
    }
  };

  const handleSwitch = async (child) => {
    console.log(child);
    const data = {
      email: child.username,
      password: "",
    };
    const { data: response } = await api.signin(data, user.token);
    console.log("Hey request fullfilled! ", response);
    dispatch(saveSuperUserInfo(user));
    await AsyncStorage.setItem("superUserToken", user.token);
    await AsyncStorage.setItem("userToken", response.token);
    dispatch(saveUserInfo(response));
    navigation.navigate("Home");
  };

  const handleDetails = (child) => {
    setAddChild({ ...child, isNewChild: false, password: "" });
    showModal();
  };


  const handleUpdateChild = async () => {
    try {
      setAddChild((addChild) => ({
        ...addChild,
        isLoading: true,
      }));
      const data = {
        _id: addChild._id,
        username: addChild.username,
        name: addChild.name,
        password: addChild.password,
        restricted: addChild.restricted,
      };
      const response = await api.updateChild(data, user.token);
      console.log("created child ", response.data);
      let temp = [...childData];
      let prevIndex = temp.findIndex((x) => x._id === response.data._id);
      if (prevIndex >= 0) {
        temp[prevIndex] = response.data;
        console.log(temp);
        setChildData(temp);
      }
      // setChildData((childData) => {
      //   const newChilds = childData.map((child) => {
      //     console.log(child._id, response._id)
      //     if(child._id === response.data._id) {
      //       console.log("Got update.. ")
      //       return  response.data;
      //     }
      //     return child
      //   })
      //   return newChilds
      // });
      setAddChild({ ...addChild, isLoading: false });

      hideModal();
    } catch (error) {
      setAddChild((addChild) => ({
        ...addChild,
        isLoading: false,
        formSubmitError: error.response?.data?.message || error.message,
      }));
    }
  };

  React.useEffect(() => {
    console.log("Render ", user.token);
    const fetchData = async (token) => {
      try {
        console.log("Here is it.");
        const { data } = await api.getChilds(token);
        setIsLoading(false);
        console.log(typeof data, data);
        setChildData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(user.token);
  }, [user.token]);

  return (
    <>
      {
        isLoading ? (
          <View style={{ flex: 1, alignItems: 'center', }}>
            <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../assets/clocktime.json")}
      />
          </View>
        ) : (
          <SafeAreaView style={styles.container}>
            <Provider
              style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
              <Portal
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
              >
                <Modal
                  visible={visible}
                  onDismiss={hideModal}
                  contentContainerStyle={styles.containerStyle}
                >
                  <Text style={styles.heading}>
                    {addChild.isNewChild ? "New Child" : addChild.username}
                  </Text>
                  {addChild.isNewChild ? (
                    <Text style={styles.helperText}>logged in</Text>
                  ) : null}
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
                          formSubmitError: "",
                        }));
                      }}
                    />
                    <TextInput
                      mode="outlined"
                      label="Username"
                      style={styles.inputStyle}
                      value={addChild.username}
                      onChangeText={handleUsernameChange}
                      disabled={!addChild.isNewChild}
                    />
                    {addChild.usernameError ? (
                      <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>{addChild.usernameError}</Text>
                      </Animatable.View>
                    ) : null}
                    <TextInput
                      mode="outlined"
                      label="Password"
                      style={styles.inputStyle}
                      secureTextEntry={addChild.hidePassword}
                      value={addChild.password}
                      right={
                        <Image
                          source={require("../icons/search_blue.png")}
                          resizeMode="contain"
                          style={{
                            width: 25,
                            height: 25,
                          }}
                        />
                      }
                      onChangeText={(text) =>
                        setAddChild((child) => ({
                          ...child,
                          password: text,
                          formSubmitError: "",
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
                          thumbColor={
                            addChild.restricted.updateAcc ? "#3c40bd" : "#f4f3f4"
                          }
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={() =>
                            setAddChild((child) => ({
                              ...child,
                              formSubmitError: "",
                              restricted: {
                                ...child.restricted,
                                updateAcc: !child.restricted.updateAcc,
                              },
                            }))
                          }
                          value={addChild.restricted.updateAcc}
                        />
                      </View>
                      <View style={styles.inlineView}>
                        <Text>Connect Counsel</Text>
                        <Switch
                          trackColor={{ false: "#767577", true: "#81b0ff" }}
                          thumbColor={
                            addChild.restricted.connectCounsel ? "#3c40bd" : "#f4f3f4"
                          }
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={() =>
                            setAddChild((child) => ({
                              ...child,
                              formSubmitError: "",
                              restricted: {
                                ...child.restricted,
                                connectCounsel: !child.restricted.connectCounsel,
                              },
                            }))
                          }
                          value={addChild.restricted.connectCounsel}
                        />
                      </View>
                      <View style={styles.inlineView}>
                        <Text>Update Task Time </Text>
                        <Switch
                          trackColor={{ false: "#767577", true: "#81b0ff" }}
                          thumbColor={
                            addChild.restricted.updateTask ? "#3c40bd" : "#f4f3f4"
                          }
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={() =>
                            setAddChild((child) => ({
                              ...child,
                              formSubmitError: "",
                              restricted: {
                                ...child.restricted,
                                updateTask: !child.restricted.updateTask,
                              },
                            }))
                          }
                          value={addChild.restricted.updateTask}
                        />
                      </View>
                      <View style={styles.inlineView}>
                        <Text>Use Pomodoro </Text>
                        <Switch
                          trackColor={{ false: "#767577", true: "#81b0ff" }}
                          thumbColor={
                            addChild.restricted.usePomodoro ? "#3c40bd" : "#f4f3f4"
                          }
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={() =>
                            setAddChild((child) => ({
                              ...child,
                              formSubmitError: "",
                              restricted: {
                                ...child.restricted,
                                usePomodoro: !child.restricted.usePomodoro,
                              },
                            }))
                          }
                          value={addChild.restricted.usePomodoro}
                        />
                      </View>
                    </View>
                  </View>
                  {addChild.formSubmitError ? (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text style={styles.errorMsg}>{addChild.formSubmitError}</Text>
                    </Animatable.View>
                  ) : null}
                  <Button
                    mode="contained"
                    onPress={addChild.isNewChild ? handleAddChild : handleUpdateChild}
                    disabled={
                      addChild.usernameError ||
                      !addChild.password ||
                      !addChild.username
                    }
                  >
                    {addChild.isNewChild ? "Add" : "Update Account"}
                  </Button>
                </Modal>
              </Portal>

              <ScrollView style={{ flex: 1, flexDirection: "column" }}>
                {childData.length ? (
                  childData.map((child) => (
                    <Card style={styles.resCard}>
                      <View
                        style={[
                          styles.inlineView,
                          { justifyContent: "space-around" },
                        ]}
                      >
                        <View
                          style={{
                            backgroundColor: "skyblue",
                            margin: 3,
                            padding: 7,
                            borderRadius: 10,
                            flex: 0.3,
                            textAlign: "center",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Avatar.Icon size={80} icon="search" />
                        </View>
                        <View style={{ flex: 0.8, padding: 5 }}>
                          <View style={styles.inlineView}>
                            <Text style={styles.heading}>{child.username}</Text>
                            {child.logedin ? (
                              <Badge style={{ backgroundColor: "#228B22" }}></Badge>
                            ) : (
                              <Badge style={{ backgroundColor: "#800000" }}></Badge>
                            )}
                          </View>
                          <View style={{ marginVertical: 10 }}></View>
                          <View
                            style={[
                              styles.inlineView,
                              { justifyContent: "flex-start" },
                            ]}
                          >
                            <Button
                              mode="contained"
                              style={styles.btn}
                              onPress={() => handleDetails(child)}
                            >
                              <Text style={styles.btnText}>Detail</Text>
                            </Button>
                            <Button
                              mode="contained"
                              style={styles.btn}
                              onPress={() => handleSwitch(child)}
                            >
                              <Text style={styles.btnText}>Switch</Text>
                            </Button>
                          </View>
                        </View>
                      </View>
                    </Card>
                  ))
                ) : (
                  <Text>
                    You don't have any child account.Click on ADD to create child
                    account
                  </Text>
                )}
              </ScrollView>

              <View
                style={[
                  styles.inlineView,
                  { justifyContent: "flex-end", marginTop: 20 },
                ]}
              >
                {/* <Image
            source={require('../assets/addBtn.png')}
            resizeMode="contain"
            style={{
              width: 40,
              height: 40,
            }}
          /> */}
                <Button
                  onPress={handleNewChild}
                  style={styles.addBtn}
                  color="#ffffff"
                >
                  <Text>add</Text>
                </Button>
              </View>
            </Provider>
          </SafeAreaView>
        )
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    margin: 10,
  },
  scrollView: {
    marginHorizontal: 5,
    backgroundColor: "#1fe3c1",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: 20,
  },
  addBtn: {
    backgroundColor: "#3d5cff",
  },
  helperText: {
    fontSize: 12,
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  inputStyle: {
    marginTop: 15,
  },
  errorMsgHide: {
    opacity: 0,
    color: "#FF0000",
    fontSize: 14,
  },
  inlineView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingInline: 10,
  },
  btn: {
    width: 100,
    margin: 4,
    backgroundColor: "#3d5cff",
  },
  btnText: {
    fontSize: 12,
  },
  resCard: {
    marginVertical: 5,
  },
});

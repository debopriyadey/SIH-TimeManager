import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "react-native-paper";
import { signin } from "../redux/slice/userSlice";
import * as api from "../api";
import { useDispatch, useSelector } from "react-redux";

const SignInScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
    hidePassword: true,
    isLoading: false,
  });

  const { colors } = useTheme();
  const dispatch = useDispatch();

  const handleEmailChange = (val) => {
    setData((data) => ({
      ...data,
      email: val,
    }));
  };

  const handlePasswordChange = (val) => {
    setData((data) => ({
      ...data,
      password: val,
    }));
  };

  const handlePasswordToggle = () => {
    setData((data) => ({
      ...data,
      hidePassword: !data.hidePassword,
    }));
  };

  // const handleValidUser = (val) => {
  //     if (val.trim().length >= 4) {
  //         setData({
  //             ...data,
  //             isValidUser: true
  //         });
  //     } else {
  //         setData({
  //             ...data,
  //             isValidUser: false
  //         });
  //     }
  // }

  const loginHandle = async () => {
    const payload = data;

    try {
      const { data } = await api.signin(payload);
      console.log("got response for signin!", data);
      await AsyncStorage.setItem("userToken", data.token);
      dispatch(signin(data));
    } catch (error) {
      console.log("got error in signin!", error.response?.data);
      Alert.alert(
        "Wrong Input!",
        error.response?.data?.message || "something went wrong.",
        [{ text: "Okay" }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#3c40bd" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
            },
          ]}
        >
          Email/username
        </Text>
        <View style={styles.action}>
          {/* <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                /> */}
          <TextInput
            placeholder="Your Email/username"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => handleEmailChange(val)}
          />
        </View>

        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              marginTop: 35,
            },
          ]}
        >
          Password
        </Text>
        <View style={styles.action}>
          {/* <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                /> */}
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={handlePasswordToggle}>
            {data.secureTextEntry ? <Text> eye-off</Text> : <Text> eye</Text>}
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={{ color: "#3c40bd", marginTop: 15 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={loginHandle}
            disabled={data.isLoading || !data.email || !data.password}
          >
            <LinearGradient
              colors={["#3c40bd", "#3c40bd"]}
              style={styles.signIn}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Sign In
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("SignUpScreen")}
            style={[
              styles.signIn,
              {
                borderColor: "#3c40bd",
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#3c40bd",
                },
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3c40bd",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

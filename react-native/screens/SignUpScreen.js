import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import * as api from "../api";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { debounce, isValidEmail } from "../extras";
//  import FontAwesome from '../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf';
// import Feather from '../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Feather.ttf';

const SignInScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
    usernameError: "",
    confirmPasswordError: "",
    passwordError: "",
    emailError: "",
    hidePassword: true,
    hideConfirmPassword: true,
    isLoading: false,
  });

  const handleEmailChange = (value) => {
    const email = value.trim();
    setData((data) => ({
      ...data,
      email,
      emailError:
        email.length === 0
          ? "Email is required"
          : isValidEmail(email)
          ? ""
          : "Please add valid email",
    }));
  };

  const isUsernameExist = debounce(async (username) => {
    try {
      const { data } = await api.isUsernameExist(username);
      console.log(data);
    } catch (error) {
      setData((data) => ({
        ...data,
        usernameError: error.response?.data?.message || error.message,
      }));
    }
  }, 200);

  const handleUsernameChange = (val) => {
    let username = val.trim();
    setData((data) => ({
      ...data,
      username,
      usernameError: "",
    }));
    if (username.trim().length >= 4) {
      isUsernameExist(username);
    } else {
      setData((data) => ({
        ...data,
        usernameError: "Username must be at least 4 characters",
      }));
    }
  };

  const handlePasswordChange = (val) => {
    setData((data) => ({
      ...data,
      password: val,
      passwordError:
        val.length === 0
          ? "Password is required"
          : val.length < 4
          ? "Password must be at least 4 characters long"
          : "",
    }));
  };

  const handleConfirmPasswordChange = (val) => {
    setData((data) => ({
      ...data,
      confirmPassword: val,
      confirmPasswordError:
        val !== data.password ? "Password does not match" : "",
    }));
  };

  const handlePasswordToggle = () => {
    setData((data) => ({
      ...data,
      hidePassword: !data.hidePassword,
    }));
  };

  const handleConfirmPasswordToggle = () => {
    setData((data) => ({
      ...data,
      hidePassword: !data.hidePassword,
    }));
  };

  const registerHandler = async () => {
    try {
      setData((data) => ({
        ...data,
        isLoading: true,
      }));
      const { password, username, name, email } = data;
      const payload = {
        name,
        username,
        password,
        email,
      };
      await api.signup(payload);
      setData((data) => ({
        ...data,
        isLoading: false,
      }));
      navigation.navigate("SignInScreen");
    } catch (error) {
      console.log("error while signup ..", error.message);
      Alert.alert(
        "Wrong Input!",
        error.response?.data?.message ||
          error.message ||
          "something went wrong.",
        [{ text: "Okay" }]
      );
      setData((data) => ({
        ...data,
        isLoading: false,
      }));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#3c40bd" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>Name</Text>
          <View style={styles.action}>
            {/* <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                /> */}
            <TextInput
              placeholder="Your Name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setData({ ...data, name: val })}
            />
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 25,
              },
            ]}
          >
            Username
          </Text>
          <View style={styles.action}>
            {/* <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                /> */}
            <TextInput
              placeholder="Your Username"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleUsernameChange(val)}
            />
          </View>
          {data.usernameError ? (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{data.usernameError}</Text>
            </Animatable.View>
          ) : null}
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 25,
              },
            ]}
          >
            Email
          </Text>
          <View style={styles.action}>
            {/* <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                /> */}
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleEmailChange(val)}
            />
          </View>

          {data.emailError ? (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{data.emailError}</Text>
            </Animatable.View>
          ) : null}

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 25,
              },
            ]}
          >
            Password
          </Text>
          <View style={styles.action}>
            {/* <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                /> */}
            <TextInput
              placeholder="Your Password"
              secureTextEntry={data.hidePassword}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={handlePasswordToggle}>
              {data.hidePassword ? <Text> eye</Text> : <Text> eye-off</Text>}
            </TouchableOpacity>
          </View>
          {data.passwordError ? (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{data.passwordError}</Text>
            </Animatable.View>
          ) : null}
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 25,
              },
            ]}
          >
            Confirm Password
          </Text>
          <View style={styles.action}>
            {/* <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                /> */}
            <TextInput
              placeholder="Confirm Your Password"
              secureTextEntry={data.hideConfirmPassword}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={handleConfirmPasswordToggle}>
              {data.hideConfirmPassword ? (
                <Text> eye</Text>
              ) : (
                <Text> eye-off</Text>
              )}
            </TouchableOpacity>
          </View>
          {data.confirmPasswordError ? (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{data.confirmPasswordError}</Text>
            </Animatable.View>
          ) : null}
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Terms of service
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Privacy policy
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={registerHandler}
              disabled={
                data.isLoading ||
                data.emailError ||
                data.passwordError ||
                data.confirmPasswordError ||
                data.usernameError ||
                !data.email ||
                !data.password ||
                !data.confirmPassword ||
                !data.username
              }
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
                  Sign Up
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
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
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
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
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
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
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
});

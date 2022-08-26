import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  TextInput,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "react-native-paper";
import { signin } from "../redux/slice/userSlice";
import * as api from "../api";
import { useDispatch, useSelector } from "react-redux";
import { Audio } from "expo-av";

const Focus = ({ navigation }) => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const [musicList, setMusicList] = React.useState([
    {
      title: "Motivation",
      locked: false,
      sound: require("../assets/wind.mp3"),
      image: require("../icons/abs1.png"),
      playing: false,
    },
    {
      title: "Concentration",
      locked: false,
      sound: require("../assets/jhoom.mp3"),
      image: require("../icons/abs2.png"),
      playing: false,
    },
    {
      title: "Relax",
      locked: true,
      sound: require("../assets/jhoom.mp3"),
      image: require("../icons/abs3.png"),
      playing: false,
    },
  ]);

  const [currMusic, setCurrMusic] = React.useState({
    title: "",
  });

  const [sound, setSound] = React.useState();

  async function playSound(music, index) {
    console.log("Loading Sound");
    setCurrMusic(music);
    let tempMusic = musicList;
    let prevIndex = tempMusic.findIndex((x) => x.playing === true);
    if (prevIndex >= 0) {
      tempMusic[prevIndex].playing = false;
    }
    tempMusic[index].playing = true;
    setMusicList(tempMusic);
    const { sound } = await Audio.Sound.createAsync(music.sound);
    setSound(sound);
    console.log("Playing Sound");
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function pauseSound(index) {
    let tempMusic = musicList;
    tempMusic[index].playing = false;
    setMusicList(tempMusic);
    setCurrMusic({});
    console.log("Pause Sound");
    sound.unloadAsync();
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#3c40bd" barStyle="light-content" />
      <View style={[styles.inlineView, { marginTop: -30 }]}>
        <Text style={styles.paragraph}>Focus Mode</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.openDrawer()}
        >
          <Image
            source={require("../icons/moreGrid.png")}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <View>
          <Text style={styles.music_title}>{currMusic.title}</Text>
          <Text style={[styles.focus_time, { textAlign: "center" }]}>
            00:00:00
          </Text>
        </View>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: "#FFF",
          },
        ]}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
          Choose Your Music
        </Text>
        <Text>Total Focus Time: 2 hours </Text>
        <View style={{ marginTop: 30 }}>
          {musicList.map((music, index) => (
            <View style={styles.action}>
              <Image
                source={music.image}
                resizeMode="contain"
                style={{
                  width: 40,
                  height: 40,
                  margin: 5,
                }}
              />
              <Text style={styles.textInput}>{music.title}</Text>
              {music.locked ? (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={(e) => {
                    setCurrMusic(music);
                    playSound();
                  }}
                >
                  <Image
                    source={require("../icons/locked.png")}
                    resizeMode="contain"
                    style={{
                      width: 40,
                      height: 40,
                      margin: 5,
                    }}
                  />
                </TouchableOpacity>
              ) : !music.playing ? (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={(e) => {
                    playSound(music, index);
                  }}
                >
                  <Image
                    source={require("../icons/play.png")}
                    resizeMode="contain"
                    style={{
                      width: 40,
                      height: 40,
                      margin: 5,
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={(e) => {
                    pauseSound(index);
                  }}
                >
                  <Image
                    source={require("../icons/pause.png")}
                    resizeMode="contain"
                    style={{
                      width: 40,
                      height: 40,
                      margin: 5,
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </Animatable.View>
    </View>
  );
};

export default Focus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3c40bd",
  },
  inlineView: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    alignSelf: "baseline",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  paragraph: {
    margin: 0,
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 2,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#1F1F1F",
    fontSize: 20,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  music_title: {
    fontSize: 42,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  focus_time: {
    fontSize: 25,
    fontWeight: "400",
    color: "#FFFFFF",
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
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    fontSize: 30,
    fontWeight: "bold",
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

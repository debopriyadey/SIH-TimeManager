import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ImageBackground } from 'react-native';
import { Card, Title, Avatar, Button, Paragraph } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import meetup from '../assets/Meetup.svg'

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
const image = { uri: "https://reactjs.org/logo-og.png" };

const HomeScreen = ({ navigation }) => {

  const { colors } = useTheme();

  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
        <View style={styles.header}>
          <Avatar.Image size={50} />
          <Text>
            <View  >
              <Text style={styles.textStyle}>Hi </Text>
            </View>
          </Text>
        </View>
        <View style={styles.quickContainer}>
          <Card style={styles.quickCard}>
            {/* <Card.Cover>
              <Image
                source={require('../assets/pomodoroImg.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </Card.Cover> */}
            <Image
              source={require('../assets/pomodoroImg.png')}
              resizeMode="contain"
              style={{
                width: 200,
                height: 200,
              }}
            />
            <Card.Title title="Pomodoro" subtitle="Card Subtitle" />
          </Card>
          <Card style={{ margin: '5%', width: '40%', backgroundColor: "skyblue" }}>
            <Card.Title title="Focus Mode" subtitle="Card Subtitle" />
          </Card>
          <Card style={{ margin: '5%', width: '40%', backgroundColor: "skyblue" }}>
            <Card.Title title="Progress Report" subtitle="Card Subtitle" />
          </Card>
          <Card style={{ margin: '5%', width: '40%', backgroundColor: "skyblue" }}>
            <Card.Title title="Motivation" subtitle="Card Subtitle" />
          </Card>
        </View>
        <Card style={styles.sessionCard}>
          <ImageBackground source={meetup} resizeMode="cover" style={styles.image}>
            <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
          </ImageBackground>
        </Card>
        <View style={styles.container}>
          <ImageBackground source={meetup} resizeMode="cover" style={styles.image}>
            <Text style={styles.text}>Inside</Text>
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>

    //   <View style={styles.container}>
    //   <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
    //   <Text style={{color: colors.text}}>Home Screen</Text>
    // <Button
    //   title="Go to details screen"
    //   onPress={() => navigation.navigate("Details")}
    // />
    // </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 5,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'baseline',
    backgroundColor: '#385cff',
  },
  quickContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'baseline',
    backgroundColor: '#385cff',
    margin: 20,
    padding: 20,
    borderRadius: 20,
  },
  quickCard: {
    margin: '5%',
    width: '40%',
    backgroundColor: "powderblue",
    alignItems: 'center',
    textAlign: 'center',
  },
  sessionCard: {
    
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

});

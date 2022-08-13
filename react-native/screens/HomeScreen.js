import * as React from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

// You can import from local files

// or any pure javascript modules available in npm
import {
  Searchbar,
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  ProgressBar,
  Badge,
} from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={[styles.inlineView, { backgroundColor: '#3D5CFF', padding: 10, height: 200 }]}>
          <View style={[styles.inlineView, { justifyContent: 'flex-start' }]}>
            <Image
              source={require('../assets/Avatar.png')}
              resizeMode="contain"
              style={{
                width: 50,
                height: 50,
              }}
            />
            <View>
              <Text style={styles.heading}>Hi Krishna</Text>
              <Text style={styles.paragraph}>Lets start working</Text>
            </View>
          </View>
          <TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate("SearchScreen")}>
            <Image
              source={require('../icons/search.png')}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.taskCardCont, { marginTop: -100, zIndex: 2 }]}>
          <Card style={styles.resCard}>
            <Card.Content>
              <View style={styles.inlineView}>
                <Text style={styles.helperText}>My Streak</Text>
                <Text style={styles.badge}>300</Text>
              </View>
              <Title>🔥 2 day streak</Title>
              <ProgressBar progress={0.5} />
            </Card.Content>
            <View style={{ marginVertical: 15 }}></View>
            <Card.Content>
              <View style={styles.inlineView}>
                <Text style={styles.helperText}>Task Completed</Text>
              </View>
              <View style={styles.inlineView}>
                <Title>10</Title>
                <Text style={styles.helperText}>/ 15 tasks</Text>
              </View>
              <ProgressBar progress={0.7} />
            </Card.Content>
          </Card>
        </View>
        <View style={styles.taskCardCont}>
          <Card style={styles.resCard}>
            <Card.Content>
              <View style={styles.inlineView}>
                <Text style={styles.helperText}>Upcomming Task</Text>
                <Text style={styles.helperText}>View Schedule</Text>
              </View>
              <View style={{ marginVertical: 10 }}></View>
              <View style={styles.inlineView}>
                <Title>Card title</Title>
                <Text style={styles.helperText}>12:00 pm</Text>
              </View>
              <Paragraph>
                task desc to make good desccription for.....
              </Paragraph>
            </Card.Content>
          </Card>
        </View>
        <View style={[styles.inlineView, { justifyContent: 'space-around' }]}>
          <TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate("CreateTask")}>
            <Image
              source={require('../assets/createTask.png')}
              resizeMode="contain"
              style={{
                width: 180,
                height: 120,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate("CreateGoal")}>
            <Image
              source={require('../assets/createGoal.png')}
              resizeMode="contain"
              style={{
                width: 180,
                height: 120,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.quickContainer}>
          <TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate("Pomodoro")} style={styles.quickCard}>
            <Image
              source={require('../assets/pomodoro.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate("Focus")} style={styles.quickCard}>
            <Image
              source={require('../assets/focus.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate("Progress")} style={styles.quickCard}>
            <Image
              source={require('../assets/progress.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate("Goals")} style={styles.quickCard}>
            <Image
              source={require('../assets/goals.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <ImageBackground
          source={require('../assets/meetup.png')}
          resizeMode="cover"
          style={[styles.image, { padding: 15 }]}>
          <Text style={{ fontSize: 30, color: '#440687', marginBottom: 10, fontWeight: 'bold' }}>Counsell Session</Text>
          <Text style={[styles.helperText, { color: '#440687' }]}>Connect with Counsellers</Text>
          <Text style={[styles.helperText, { color: '#440687', marginBottom: 25 }]}>for one on one Sessions</Text>
          <Button
            mode="contained"
            style={{ width: 230 }}
            onPress={() => navigation.navigate("SessionScreen")}>
            Connect Now!
          </Button>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5F7FF',
  },
  scrollView: { marginHorizontal: 0 },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    padding: 8
  },
  paragraph: {
    color: '#ffffff',
    padding: 8,
    marginTop: -20
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    height: 180,
    margin: 10,
    borderRadius: 50
  },
  text: {
    color: 'white',
    fontSize: 22,
    margin: 24,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  textHelper: {
    color: 'white',
    fontSize: 15,
    marginTop: -24,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  helperText: {
    fontSize: 15,
  },
  badge: {
    fontSize: 15,
    padding: 5,
    backgroundColor: '#F5F7FF',
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
  taskCardCont: {
    margin: 8,
  },
  resCard: {
    padding: 10,
    marginVertical: 5,
  },
  quickContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'baseline',
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    borderRadius: 20,
  },
  quickCard: {
    margin: '5%',
    width: '40%',
  },
});

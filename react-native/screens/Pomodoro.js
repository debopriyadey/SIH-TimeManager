import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ImageBackground } from 'react-native';
import { Card, Title, Avatar, Button, Paragraph } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import meetup from '../assets/Meetup.svg'


const Pomodoro = ({ navigation }) => {

  const { colors } = useTheme();

  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
     
        <View style={styles.quickContainer}>
          <Card style={styles.quickCard}>
            
            <TextInput placeholder="Pomodoro timer" />
           
          </Card> 
          <Card style={styles.quickCard}>
            
            <TextInput  placeholder="Pomodoro timer" />
           
          </Card>
           <Card style={styles.quickCard}>
            
            <TextInput placeholder="Pomodoro timer" />
           
          </Card>
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

export default Pomodoro;

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

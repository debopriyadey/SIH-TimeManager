import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Card, Title, Avatar, Button, Paragraph } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

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
        <Card>
          <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
          <Card.Content>
            <Title>Card title</Title>
            <Paragraph>Card content</Paragraph>
          </Card.Content>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>
        <Card>
          <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
          <Card.Content>
            <Title>Card title</Title>
            <Paragraph>Card content</Paragraph>
          </Card.Content>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>
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
  textStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

});

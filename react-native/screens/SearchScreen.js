import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

// You can import from local files
// or any pure javascript modules available in npm
import { Searchbar, Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export default function SearchScreen({navigation}) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.inlineView}>
          <Text style={styles.paragraph}>Search Here</Text>
        <TouchableOpacity activeOpacity={.5} onPress={() => navigation.openDrawer()}>
        <Image
            source={require('../icons/more_blue.png')}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          />
          </TouchableOpacity>
        </View>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          icon={  
          () => <Image
          source={require('../icons/search_blue.png')}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
          }}
        />
     }
        />
        <View style={[styles.inlineView, { justifyContent: 'space-around', marginTop: 20 }]}>
          <Image
            source={require('../assets/groupsImg.png')}
            resizeMode="contain"
            style={{
              width: 150,
              height: 100,
            }}
          />
          <Image
            source={require('../assets/taskImg.png')}
            resizeMode="contain"
            style={{
              width: 150,
              height: 100,
            }}
          />
        </View>
        <Text style={styles.heading}>Select Your Sort</Text>
        <View style={[styles.inlineView, { justifyContent: 'flex-start' }]}>
          <Button
            style={{ margin: 5 }}
            mode="outlined"
            onPress={() => console.log('Pressed')}>
            All
          </Button>
          <Button
            style={{ margin: 5 }}
            mode="outlined"
            onPress={() => console.log('Pressed')}>
            Recent
          </Button>
          <Button
            style={{ margin: 5 }}
            mode="outlined"
            onPress={() => console.log('Pressed')}>
            Priority
          </Button>
        </View> 
        <View style={styles.resCardCont}>
        <Card style={styles.resCard}>
          <Card.Content>
            <Title>Card title</Title>
            <Paragraph>Card content</Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.resCard}>
          <Card.Content>
            <Title>Card title</Title>
            <Paragraph>Card content</Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.resCard}>
          <Card.Content>
            <Title>Card title</Title>
            <Paragraph>Card content</Paragraph>
          </Card.Content>
        </Card>
        </View>
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
  scrollView: {
    marginHorizontal: 5,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 22,
    padding: 10,
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
  resCardCont: {
    margin: 8,
  },
  resCard: {
    marginVertical: 5,
  }
});

import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { debounce } from '../utils'
import * as api from '../api'

// You can import from local files
// or any pure javascript modules available in npm
import { Searchbar, Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [type, setType] = React.useState('')
  const [data, setData] = React.useState([])

  const getSearchResult = debounce(async (val) => {
    try {
      if (type == 'group') {
        const { data } = await api.getTaskSuggestion(val);
        setData(data);
        console.log('group')
      }
      if (type == 'task') {
        const { data } = await api.getTaskSuggestion(val);
        setData(data);
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
  }, 200);

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    getSearchResult(val);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={[styles.inlineView, { marginBottom: 10 }]}>
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
          onChangeText={handleSearchChange}
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
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setType('group')}
          >
            <Image
              source={require('../assets/groupsImg.png')}
              resizeMode="cover"
              style={{
                width: wp('45%'),
                height: hp('16%'),
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setType('task')}
          >
            <Image
              source={require('../assets/taskImg.png')}
              resizeMode="cover"
              style={{
                width: wp('45%'),
                height: hp('16%'),
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.resCardCont}>
          {data.map((res) => (
            <Card style={styles.resCard}>
              <Card.Content>
                <Title>{res.title}</Title>
                <Paragraph>{res.description}</Paragraph>
              </Card.Content>
            </Card>
          ))}
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
    margin: 0,
    fontSize: 24,
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

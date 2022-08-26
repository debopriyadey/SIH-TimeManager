import { Tabs, TabScreen } from 'react-native-paper-tabs';
import { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

// You can import from local files
// or any pure javascript modules available in npm
import { Avatar, Button, Card } from 'react-native-paper';

function TabBar() {
  return (
    // <SafeAreaView style={styles.container}>
    //   <ScrollView style={styles.scrollView}>
    <Tabs>
      <TabScreen label="Previous">
        <Card style={styles.resCard}>
          <View>
            <View
              style={[
                styles.inlineView,
                { justifyContent: 'space-around' },
              ]}>
              <View
                style={{
                  backgroundColor: 'skyblue',
                  margin: 5,
                  padding: 5,
                  borderRadius: 10,
                  flex: 0.3,
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Avatar.Icon size={40} icon="search" />
                <Text style={styles.helperText}>26th July,</Text>
                <Text style={styles.helperText}>4pm - 5pm</Text>
              </View>
              <View style={{ flex: 0.8, padding: 5 }}>
                <Text style={styles.text}>Mental Health due to stress</Text>
                <Text style={styles.helperText}>taken by Dr. Anirudh</Text>
                <View style={{ marginVertical: 10 }}></View>
                <View style={styles.inlineView}>
                  <Button mode="contained" style={{ width: 70 }}>
                    Rate
                  </Button>
                  <Button mode="contained" style={{ width: 140 }}>
                    Suggestion
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </Card>
      </TabScreen>
      <TabScreen label="Upcomming">
        <Card style={styles.resCard}>
          <View>
            <View
              style={[
                styles.inlineView,
                { justifyContent: 'space-around' },
              ]}>
              <View
                style={{
                  backgroundColor: 'skyblue',
                  margin: 5,
                  padding: 5,
                  borderRadius: 10,
                  flex: 0.3,
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Avatar.Icon size={40} icon="search" />
                <Text style={styles.helperText}>24th July,</Text>
                <Text style={styles.helperText}>2pm - 4pm</Text>
              </View>
              <View style={{ flex: 0.8, padding: 5 }}>
                <Text style={styles.text}>Mental Health due to stress</Text>
                <Text style={styles.helperText}>taken by Dr. Anirudh</Text>
                <View style={{ marginVertical: 10 }}></View>
                <View style={styles.inlineView}>
                  <Button mode="contained" style={{ width: 70 }}>
                    Join
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </Card>
      </TabScreen>
    </Tabs>
    //   </ScrollView>
    // </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#F5F7FF',
  },
  scrollView: { marginHorizontal: 5 },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  helperText: {
    fontSize: 12,
  },
  inlineView: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'baseline',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingInline: 10,
  },
  resCard: {
    marginVertical: 5,
  },
});

export default TabBar;

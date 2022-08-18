import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { debounce } from '../../utils'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// You can import from local files
// or any pure javascript modules available in npm
import { Searchbar, Button, Title, Divider } from 'react-native-paper';

export default function SearchUser({ users, updatedUserList, hide }) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [filter, setFilter] = React.useState()
    const [searchResult, setSearchResult] = React.useState([{
        avtar: require("../../icons/face1.png"),
        username: 'new User 1'
    }, {
        avtar: require("../../icons/face2.png"),
        username: 'new User 2'
    }
    ]);

    const [usersList, setUsersList] = React.useState(users)


    const getSearchResult = debounce(async (username) => {
        try {
            const { data } = await api.bucketSearch(username);
            setSearchResult(data);
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }, 200);

    const handleSearchChange = (val) => {
        setSearchQuery(val);
        getSearchResult(val);
    }
    const userId = '12345688'


    const addUser = (user) => {
        console.log(user)
        setUsersList(usersList => [...usersList, user])
    }

    const removeUser = (user) => {
        let tempUsers = usersList
        const filtered = tempUsers.filter((_user) => _user.username != user.username);
        setUsersList(filtered)
    }

    const saveUsers = () => {
        updatedUserList(usersList);
        hide()
    }
    return (
        <View>
            <ScrollView style={styles.scrollView}>
                <View style={[styles.inlineView, { marginBottom: 10 }]}>
                    <Text style={styles.paragraph}>Search Users</Text>
                </View>
                <Searchbar
                    placeholder="Search"
                    onChangeText={handleSearchChange}
                    value={searchQuery}
                    icon={
                        () => <Image
                            source={require('../../icons/search_blue.png')}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                            }}
                        />
                    }
                />

                <View style={{ margin: 10 }}></View>
                {!searchQuery.length ? <></> : (<View>
                    <Text>All Users </Text>
                    <Divider />
                    {searchResult.map((res) => (
                        <View style={styles.inlineView}>
                            <View style={[styles.inlineView, { justifyContent: 'flex-start' }]}>
                                <View>
                                    <Image
                                        source={res.avtar}
                                        resizeMode="contain"
                                        style={{
                                            width: 30,
                                            height: 30,
                                        }}
                                    />
                                </View>
                                <View style={{ marginLeft: 20 }}>
                                    <Title>{res.username}</Title>
                                </View>
                            </View>
                            <View>
                                {
                                    usersList.findIndex((x) => x.username === res.username) < 0 ?
                                        (<Button style={styles.btn} onPress={() => addUser(res)}>
                                            <Text style={styles.btnText}>Add</Text>
                                        </Button>) : (<Button style={styles.btn} onPress={() => removeUser(res)}>
                                            <Text style={styles.btnText}>Remove</Text>
                                        </Button>)
                                }
                            </View>
                        </View>
                    ))}</View>)}

                {searchQuery.length ? <></> : (<View>
                    <Text>Added Users </Text>
                    <Divider />
                    {usersList.map((user) => (
                        <View style={styles.inlineView}>
                            <View style={[styles.inlineView, { justifyContent: 'flex-start' }]}>
                                <View>
                                    <Image
                                        source={user.avtar}
                                        resizeMode="contain"
                                        style={{
                                            width: 30,
                                            height: 30,
                                        }}
                                    />
                                </View>
                                <View style={{ marginLeft: 20 }}>
                                    <Title>{user.username}</Title>
                                </View>
                            </View>
                            <View>
                                <Button style={styles.btn} onPress={() => removeUser(user)} >
                                    <Text style={styles.btnText}>Remove</Text>
                                </Button>
                            </View>
                        </View>
                    ))}
                </View>)}
            </ScrollView>

            <Button onPress={() => saveUsers()}>Save</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        marginHorizontal: 5,
    },
    paragraph: {
        margin: 0,
        fontSize: 20,
        fontWeight: 'bold',
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
    btn: {
        padding: 0,
        margin: 2
    },
    btnText: {
        fontSize: wp("2%"),
    }
});

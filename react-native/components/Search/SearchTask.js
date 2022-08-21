import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { debounce } from '../../utils'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as api from '../../api'

// You can import from local files
// or any pure javascript modules available in npm
import { Searchbar, Button, Title, Divider } from 'react-native-paper';

export default function SearchTask({ tasks, updatedTaskList, hide }) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [filter, setFilter] = React.useState()
    const [searchResult, setSearchResult] = React.useState([{
        avtar: require("../../icons/face1.png"),
        user: 'new User 1',
        title: 'new task 1',
    }, {
        avtar: require("../../icons/face2.png"),
        user: 'new User 2',
        title: 'new task 2',
    }
    ]);

    const [tasksList, setTasksList] = React.useState([])


    const getSearchResult = debounce(async (val) => {
        try {
            const { data } = await api.getTaskSuggestion(val);
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


    const addTask = (task) => {
        console.log(task)
        setTasksList(tasksList => [...tasksList, task])
    }

    const removeTask = (task) => {
        let tempUsers = tasksList
        const filtered = tempUsers.filter((_task) => _task._id != task._id);
        setTasksList(filtered)
    }

    React.useEffect(() => {
        updatedTaskList(tasksList);
    }, [tasksList])

    // const saveTasks = () => {
    //     updatedTaskList(tasksList);
    //     hide()
    // }

    return (
        <View style={{minHeight: 300}}>
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
                    <Text>All Tasks </Text>
                    <Divider />
                    {searchResult.map((res) => (
                        <View style={[styles.inlineView, styles.card]}>
                            <View style={[styles.inlineView, { justifyContent: 'flex-start' }]}>
                                <View style={{ marginLeft: 20 }}>
                                    <Title>{res.title}</Title>
                                    <Text>{res.user}</Text>
                                </View>
                            </View>
                            <View>
                                {
                                    tasksList.findIndex((x) => x._id === res._id) < 0 ?
                                        (<Button style={styles.btn} onPress={() => addTask(res)}>
                                            <Text style={styles.btnText}>Add</Text>
                                        </Button>) : (<Button style={styles.btn} onPress={() => removeTask(res)}>
                                            <Text style={styles.btnText}>Remove</Text>
                                        </Button>)
                                }
                            </View>
                        </View>
                    ))}</View>)}

                {searchQuery.length ? <></> : (<View>
                    <Text>Selected Tasks </Text>
                    <Divider />
                    {tasksList.map((user) => (
                        <View style={[styles.inlineView, styles.card]}>
                            <View style={[styles.inlineView, { justifyContent: 'flex-start' }]}>
                                <View style={[styles.inlineView, { justifyContent: 'flex-start' }]}>
                                    <View style={{ marginLeft: 20 }}>
                                        <Title>{user.title}</Title>
                                        <Text>{user.user}</Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Button style={styles.btn} onPress={() => removeTask(user)} >
                                    <Text style={styles.btnText}>Remove</Text>
                                </Button>
                            </View>
                        </View>
                    ))}
                </View>)}
            </ScrollView>

            {/* <Button onPress={() => saveTasks()}>Save</Button> */}
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
        borderRadius: 10,
    },
    card: {
        elevation: 1,
        borderRadius: 2,
        paddingVertical: 10,
        marginVertical: 5
    },
    btn: {
        padding: 0,
        margin: 2
    },
    btnText: {
        fontSize: wp("2%"),
    }
});

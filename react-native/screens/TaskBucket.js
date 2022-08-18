import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { debounce } from '../utils'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TaskForm from '../components/TaskBucket/BucketTaskForm'
// You can import from local files
// or any pure javascript modules available in npm
import { Searchbar, Avatar, Button, Card, Title, Paragraph, Chip, Portal, Provider, Modal } from 'react-native-paper';
import BucketList from '../components/TaskBucket/BucketList';

export default function TaskBucket({ navigation }) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [filter, setFilter] = React.useState()
    const [curr, setCurr] = React.useState();
    const [searchResult, setSearchResult] = React.useState([]);

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

    const data = [{
        title: "Coding",
        desc: "Something about the task",
        duration: "30",
        username: "debo",
        canEdit: 'withOnly',
        canView: 'withOnly',
        creator: '12345688',
        sharedWith: ['1234', '2345']
    }, {
        title: "Meeting",
        desc: "Something about the meeting",
        duration: "30",
        username: "debo",
        canEdit: 'withOnly',
        canView: 'withOnly',
        creator: '12345688',
        sharedWith: ['1534', '2345']
    }, {
        title: "Yoga",
        desc: "Something about the yoga",
        duration: "20",
        username: "bishal",
        canEdit: 'none',
        canView: 'everyone',
        creator: '12345689',
        sharedWith: ['1234', '2345']
    }, {
        title: "Golf",
        desc: "Something about the playing",
        duration: "30",
        username: "gourav",
        canEdit: 'withOnly',
        canView: 'withOnly',
        creator: '12345681',
        sharedWith: ['1234', '2345']
    }, {
        title: "Study",
        desc: "Something about the Study",
        duration: "30",
        username: "debo",
        canEdit: 'withOnly',
        canView: 'withOnly',
        creator: '12345688',
        sharedWith: ['1234', '2345']
    }]

    const [visible, setVisible] = React.useState(false);
    const [deatilVisible, setDetailVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const showDetailModal = () => setDetailVisible(true);
    const hideDetailModal = () => setDetailVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 10, margin: 10, borderRadius: 10 };

    const createCopy = (task) => {
        setCurr(task)
        showDetailModal()
    }

    const addTask = () => {
        const task = {
            title: "",
            duration: "",
            username: "",
            canEdit: '',
            canView: '',
            creator: '',
        }
        setCurr(task)
        showModal()
    }


    return (
        <SafeAreaView style={styles.container}>
            <Provider
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
                <ScrollView style={styles.scrollView}>
                    <View style={[styles.inlineView, { marginBottom: 10 }]}>
                        <Text style={styles.paragraph}>Task Bucket</Text>
                        <View style={[styles.inlineView, { justifyContent: 'flex-end' }]}>
                            <TouchableOpacity activeOpacity={.5} onPress={() => navigation.openDrawer()} style={{ marginRight: 5 }}>
                                <Image
                                    source={require('../icons/filter.png')}
                                    resizeMode="contain"
                                    style={{
                                        width: 25,
                                        height: 25,
                                    }}
                                />
                            </TouchableOpacity>
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
                    <Chip icon="close" onPress={() => console.log('Pressed')}>Example Chip</Chip>

                    {data.map((task) => (
                        <BucketList task={task} />
                    ))}
                </ScrollView>

                <Button onPress={addTask}>Add</Button>
                <Portal
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <TaskForm task={curr} />
                    </Modal>
                </Portal>
            </Provider>
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
    },
    btn: {
        padding: 0,
        margin: 2
    },
    btnText: {
        fontSize: wp("2%"),
    }
});

import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { debounce } from '../utils'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TaskForm from '../components/TaskBucket/BucketTaskForm'
// You can import from local files
// or any pure javascript modules available in npm
import { Searchbar, Avatar, Button, Card, Title, Paragraph, Chip, Portal, Provider, Modal, Checkbox } from 'react-native-paper';
import BucketList from '../components/TaskBucket/BucketList';
import { SHARING_TYPE, QUERY_FILTER } from '../constants';

export default function TaskBucket({ navigation }) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [filters, setFilters] = React.useState([])
    const [curr, setCurr] = React.useState();
    const [searchResult, setSearchResult] = React.useState([]);
    const [isSelected, setSelection] = React.useState(false);

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
        console.log(val)
        // getSearchResult(val);
    }
    const userId = '12345688'

    // const data = [{
    //     title: "Coding",
    //     description: "Something about the task",
    //     duration: "30",
    //     username: "debo",
    //     canEdit: 'only_with',
    //     canView: 'only_with',
    //     creator: '12345688',
    //     sharedWith: ['1234', '2345']
    // }]

    const [data, setData] = React.useState([])
    const [visible, setVisible] = React.useState(false);
    const [filterVisible, setFilterVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const showFilterModal = () => setFilterVisible(true);
    const hideFilterModal = () => setFilterVisible(false);

    const containerStyle = { backgroundColor: 'white', padding: 10, margin: 10, borderRadius: 10 };

    const addTask = () => {
        const task = {
            title: "",
            duration: "",
            username: "",
            canEdit: SHARING_TYPE.NO_ONE,
            canView: SHARING_TYPE.NO_ONE,
            creator: '',
        }
        setCurr(task)
        showModal()
    }

    const selectFileter = (val) => {
        let options = filters
        let index

        index = options.indexOf(val)
        if (index >= 0) {
            options.splice(index, 1)
        } else {
            options.push(val)
        }
        console.log(options);
        setFilters(options)
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
                            <TouchableOpacity activeOpacity={.5} onPress={showFilterModal} style={{ marginRight: 5 }}>
                                <Image
                                    source={require('../icons/funnel.png')}
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
                    <View style={[styles.inlineView, {justifyContent: 'flex-start', margin: 10}]}>
                        {filters.map((filter) => (
                            <Chip icon="close" onPress={() => selectFileter(filter)} style={{margin: 3, backgroundColor: '#BAD6FF'}}>{filter}</Chip>
                        ))}
                    </View>

                    {data.map((task) => (
                        <BucketList task={task} />
                    ))}
                </ScrollView>

                <Button onPress={addTask}>Add</Button>
                <Portal
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <TaskForm task={curr} setData={setData} />
                    </Modal>
                    <Modal visible={filterVisible} onDismiss={hideFilterModal} contentContainerStyle={containerStyle}>
                        <View>
                            <View style={styles.checkboxContainer}>
                                <Checkbox
                                    status={filters.includes(QUERY_FILTER.ALL) ? 'checked' : 'unchecked'}
                                    onPress={() => selectFileter(QUERY_FILTER.ALL)}
                                    name='filters'
                                    style={styles.checkbox}
                                />
                                <Text style={styles.label}>ALL</Text>
                            </View>
                            <View style={styles.checkboxContainer}>
                                <Checkbox
                                    status={filters.includes(QUERY_FILTER.SHARED_WITH_ME) ? 'checked' : 'unchecked'}
                                    onPress={() => selectFileter(QUERY_FILTER.SHARED_WITH_ME)}
                                    name='filters'
                                    style={styles.checkbox}
                                />
                                <Text style={styles.label}>SHARED WITH ME</Text>
                            </View>
                            {
                                filters.includes(QUERY_FILTER.SHARED_WITH_ME) &&
                                <>
                                    <View style={styles.checkboxContainer}>
                                        <Checkbox
                                            status={filters.includes(QUERY_FILTER.ONLY_VIEW) ? 'checked' : 'unchecked'}
                                            onPress={() => selectFileter(QUERY_FILTER.ONLY_VIEW)}
                                            name='filters'
                                            style={styles.checkbox}
                                        />
                                        <Text style={styles.label}>ONLY VIEW</Text>
                                    </View>
                                    <View style={styles.checkboxContainer}>
                                        <Checkbox
                                            status={filters.includes(QUERY_FILTER.ONLY_EDIT) ? 'checked' : 'unchecked'}
                                            onPress={() => selectFileter(QUERY_FILTER.ONLY_EDIT)}
                                            name='filters'
                                            style={styles.checkbox}
                                        />
                                        <Text style={styles.label}>ONLY EDIT</Text>
                                    </View>
                                </>
                            }
                            <View style={styles.checkboxContainer}>
                                <Checkbox
                                    status={filters.includes(QUERY_FILTER.OWNED_BY_ME) ? 'checked' : 'unchecked'}
                                    onPress={() => selectFileter(QUERY_FILTER.OWNED_BY_ME)}
                                    name='filters'
                                    style={styles.checkbox}
                                />
                                <Text style={styles.label}>OWNED BY ME</Text>
                            </View>
                        </View>
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
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },

});

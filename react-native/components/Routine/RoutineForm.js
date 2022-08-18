import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Switch, ScrollView, Image, TouchableOpacity } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import styles from "../TodoForm/TodoFormStyle";
import AppButton from "../Common/AppButton";
import GoalModal from "../Common/GoalModal";
import SliderView from "../Common/SliderView";
import PickerView from "../Common/PickerView";
import TimeDuration from "../Common/TimeDuration";
import { widthPercentageToDP } from "react-native-responsive-screen";
import BucketList from "../TaskBucket/BucketList";
import { Button, Modal, Portal } from "react-native-paper";
import BucketTaskForm from "../TaskBucket/BucketTaskForm";
import CloseModal from "../Common/CloseModal";
import SearchTask from "../Search/SearchTask";
import SearchUser from "../Search/SearchUser";

function RoutineForm({ task, isRoutineUpdate }) {
    let date = new Date();
    const [show, setShow] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false)
    const [visible, setVisible] = useState()
    const [visibleSearch, setVisibleSearch] = useState()
    const [visibleShared, setVisibleShared] = useState()
    const [pic, setPic] = useState([
        {
            avtar: require("../../icons/face1.png"),
            username: 'debo'
        }, {
            avtar: require("../../icons/face2.png"),
            username: 'bishal'
        }, {
            avtar: require("../../icons/face3.png"),
            username: 'ishika'
        }, {
            avtar: require("../../icons/face4.png"),
            username: 'gourav'
        }, {
            avtar: require("../../icons/face1.png"),
            username: 'shrayansh'
        }, {
            avtar: require("../../icons/face1.png"),
            username: 'harsh'
        }
    ])

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const showSearchModal = () => setVisibleSearch(true);
    const hideSearchModal = () => setVisibleSearch(false);

    const showSharedModal = () => setVisibleShared(true);
    const hideSharedModal = () => setVisibleShared(false);

    // const showDetailModal = () => setDetailVisible(true);
    // const hideDetailModal = () => setDetailVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 10, margin: 10, borderRadius: 10 };

    const [todoData, setTodoData] = useState({
        title: task.title,
        desc: task.desc,
        tags: task.tags,
        duration: task.duration,
        canView: task.canView,
        canEdit: task.canEdit
    });

    const [data, setData] = useState([{
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
    }])

    const showMode = (mode) => {
        setShow(true);
    };

    const curr = {
        title: "",
        duration: "",
        username: "",
        canEdit: '',
        canView: '',
        creator: '',
    }

    const handleSubTasks = () => {
        setTodoData({
            title: "",
            desc: "",
            tags: "",
            duration: "",
            canView: "",
            canEdit: "",
        });
    };

    const handlePress = () => {
        if (
            todoData.title &&
            todoData.desc &&
            todoData.tags &&
            todoData.duration &&
            todoData.canView
        ) {
            console.log(todoData);
            setTodoData({
                title: "",
                desc: "",
                tags: "",
                duration: "",
                canView: "",
                canEdit: "",
            });
            alert("Task added");
        } else {
            alert("Fill the required fields");
        }
    };

    const childToParent = (childdata) => {
        setPic(childdata);
    };

    const updatedTaskList = (taskList) => {
        console.log(taskList)
    }


    return (
        <View>
            <ScrollView style={styles.formWrapper}>
                <View style={styles.container}>
                    <TextInput
                        value={todoData.title}
                        style={styles.input}
                        placeholder="Routine Name"
                        placeholderTextColor={styles.placeholder.color}
                        onChangeText={(val) =>
                            setTodoData((prev) => ({ ...prev, title: val }))
                        }
                    />

                    <TextInput
                        value={todoData.duration}
                        style={styles.input}
                        placeholder="Duration"
                        placeholderTextColor={styles.placeholder.color}
                        disabled={true}
                        onChangeText={(val) =>
                            setTodoData((prev) => ({ ...prev, duration: val }))
                        }
                    />

                    <View style={styles.inlineView}>
                        <View>
                            <Text> Can View</Text>
                            <Picker
                                selectedValue={todoData.canView}
                                onValueChange={(val) => setTodoData((prev) => ({ ...prev, canView: val }))}
                                style={{ width: widthPercentageToDP("40%") }}
                            >
                                <Picker.Item label="Everyone" value="everyone" />
                                <Picker.Item label="Only With" value="onlyWith" />
                                <Picker.Item label="None" value="none" />
                            </Picker>
                        </View>
                        <View>
                            <Text> Can Edit</Text>
                            <Picker
                                selectedValue={todoData.canEdit}
                                onValueChange={(val) => setTodoData((prev) => ({ ...prev, canEdit: val }))}
                                style={{ width: widthPercentageToDP("40%") }}
                                enabled={todoData.canView === "everyone" || todoData.canView === "onlyWith"}
                            >
                                {todoData.canView === "everyone" && <Picker.Item label="Everyone" value="everyone" />}
                                <Picker.Item label="Only With" value="onlyWith" />
                                <Picker.Item label="None" value="none" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.inlineView}>
                        <Button> Shared With </Button>
                        <TouchableOpacity onPress={showSharedModal}>
                            {
                                pic.length ?
                                    (<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 5 }}>{
                                        pic.slice(0, 4).map((res) => (
                                            <Image
                                                source={res.avtar}
                                                resizeMode="contain"
                                                style={{
                                                    width: 40,
                                                    height: 40,
                                                    marginRight: -20,
                                                }}
                                            />
                                        ))
                                    }
                                        < View style={{ backgroundColor: '#BAD6FF', width: 40, height: 40, borderRadius: 20, padding: 6 }}>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', margin: 2 }}>99+</Text>
                                        </View>
                                    </View>) :
                                    <Text>Add Users</Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.inlineView, { marginVertical: 20 }]}>
                        <View>
                            <Text style={styles.heading}>Tasks</Text>
                        </View>
                        <View style={[styles.inlineView, { justifyContent: 'flex-end' }]}>
                            <Button mode="contained" style={styles.btn} onPress={showSearchModal}>
                                <Text style={styles.btnText}>Add</Text>
                            </Button>
                            <Button mode="contained" style={styles.btn} onPress={showModal}>
                                <Text style={styles.btnText}>Create</Text>
                            </Button>
                        </View>
                    </View>
                    {data.map((task) => (
                        <View>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                // onPress={con}
                                style={{ zIndex: 2 }}
                            >
                                <Image
                                    source={require("../../icons/close_blue.png")}
                                    resizeMode="contain"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        marginBottom: -50,
                                        // flex: 1
                                    }}
                                />
                            </TouchableOpacity>
                            <BucketList task={task} />
                        </View>
                    ))}

                    <AppButton
                        onPress={handlePress}
                        title={isRoutineUpdate ? "Update" : "Add"}
                        btnStyle={styles.button}
                        txtStyle={styles.btn_text}
                    />

                </View>
            </ScrollView >
            <Portal
                style={{ flex: 1, justifyContent: "flex-start", alignItems: 'flex-start' }}
            >
                <Modal visible={visibleShared} onDismiss={hideSharedModal} contentContainerStyle={[containerStyle, { justifyContent: 'flex-start', height: 600 }]}>
                    <CloseModal hide={hideSharedModal} />
                    <SearchUser
                        users={pic}
                        hide={hideSharedModal}
                        childToParent={childToParent}
                    />
                </Modal>
                <Modal visible={visibleSearch} onDismiss={hideSearchModal} contentContainerStyle={[containerStyle, { justifyContent: 'flex-start', height: 600 }]}>
                    <CloseModal hide={hideSearchModal} />
                    <SearchTask
                        tasks={data}
                        hide={hideSearchModal}
                        updatedTaskList={updatedTaskList}
                    />
                </Modal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <CloseModal hide={hideModal} />
                    <BucketTaskForm task={curr} isUpdate={isUpdate} />
                </Modal>
            </Portal>
        </View >

    );
}

export default RoutineForm;

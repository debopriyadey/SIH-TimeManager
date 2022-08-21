import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Switch, ScrollView, TouchableOpacity, Image } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import * as api from '../../api'

import styles from "../TodoForm/TodoFormStyle";
import AppButton from "../Common/AppButton";
import GoalModal from "../Common/GoalModal";
import SliderView from "../Common/SliderView";
import PickerView from "../Common/PickerView";
import TimeDuration from "../Common/TimeDuration";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { Button, Modal, Portal } from "react-native-paper";
import SearchUser from "../Search/SearchUser";
import CloseModal from "../Common/CloseModal";
import { useSelector } from "react-redux";

function BucketTaskForm({ task, isUpdate, setData }) {
    let date = new Date();
    const [show, setShow] = useState(false);
    const userToken = useSelector((state) => state.user?.token)
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

    const showSharedModal = () => setVisibleShared(true);
    const hideSharedModal = () => setVisibleShared(false);
    const [todoData, setTodoData] = useState({
        title: task.title,
        description: task.description,
        tags: task.tags,
        duration: task.duration,
        canView: task.canView,
        canEdit: task.canEdit
    });

    const containerStyle = { backgroundColor: 'white', padding: 10, margin: 10, borderRadius: 10 };

    const showMode = (mode) => {
        setShow(true);
    };


    const handlePress = async() => {
        console.log(todoData, "before handle click ")
        if (
            todoData.title &&
            todoData.description &&
            todoData.tags &&
            todoData.duration &&
            todoData.canView
        ) {
            try {
                if (isUpdate) {
                    // update 
                   const {data} = await api.updateTask(todoData, userToken);
                   console.log(data);
                } else {
                    // create 
                    const {data: response} = await api.createTask(todoData, userToken);
                    setData((data) => [...data, response])
                    console.log(response)
                }

            } catch (error) {
                console.log(`error in handlePress in bucketTaskForm.js`, error.response?.data?.message|| error.message )
                
            }
            setTodoData({
                title: "",
                description: "",
                tags: "",
                duration: "",
                canView: "",
                canEdit: "",
            });
            alert("Task added");
            
        } else {
            alert("Fill the required is the update fields");
        }
    };

    const updatedUserList = (userList) => {
        setPic(userList);
    };


    return (
        <View>
            <ScrollView style={styles.formWrapper}>
                <View style={styles.container}>
                    <TextInput
                        value={todoData.title}
                        style={styles.input}
                        placeholder="Task Name"
                        placeholderTextColor={styles.placeholder.color}
                        onChangeText={(val) =>
                            setTodoData((prev) => ({ ...prev, title: val }))
                        }
                    />
                    <TextInput
                        value={todoData.description}
                        style={styles.input}
                        placeholder="Task description"
                        placeholderTextColor={styles.placeholder.color}
                        onChangeText={(val) =>
                            setTodoData((prev) => ({ ...prev, description: val }))
                        }
                    />

                    <TextInput
                        value={todoData.tags}
                        style={styles.input}
                        placeholder="Tags"
                        placeholderTextColor={styles.placeholder.color}
                        onChangeText={(val) =>
                            setTodoData((prev) => ({ ...prev, tags: val }))
                        }
                    />

                    <TextInput
                        value={todoData.duration}
                        style={styles.input}
                        placeholder="Duration"
                        placeholderTextColor={styles.placeholder.color}
                        onChangeText={(val) =>
                            setTodoData((prev) => ({ ...prev, duration: val }))
                        }
                    />

                    <View style={styles.inlineView}>
                        <View style={{ width: widthPercentageToDP("40%") }}>
                            <Text> Can View</Text>
                            <Picker
                                selectedValue={todoData.canView}
                                onValueChange={(val) => setTodoData((prev) => ({ ...prev, canView: val }))}

                            >
                                <Picker.Item label="Everyone" value="everyone" />
                                <Picker.Item label="Only With" value="only_with" />
                                <Picker.Item label="None" value="none" />
                            </Picker>
                        </View>
                        <View style={{ width: widthPercentageToDP("40%") }}>
                            <Text> Can Edit</Text>
                            <Picker
                                selectedValue={todoData.canEdit}
                                onValueChange={(val) => setTodoData((prev) => ({ ...prev, canEdit: val }))}
                                style={{ width: widthPercentageToDP("40%") }}
                                enabled={todoData.canView === "everyone" || todoData.canView === "only_with"}
                            >
                                {todoData.canView === "everyone" && <Picker.Item label="Everyone" value="everyone" />}
                                <Picker.Item label="Only With" value="only_with" />
                                <Picker.Item label="None" value="none" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.inlineView}>
                        <Text style={{ fontSize: 18 }}> Shared With </Text>
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

                    <AppButton
                        onPress={handlePress}
                        title={isUpdate ? "Update" : "Add"}
                        btnStyle={styles.button}
                        txtStyle={styles.btn_text}
                    />

                </View>
            </ScrollView>
            <Portal
                style={{ flex: 1, justifyContent: "flex-start", alignItems: 'flex-start' }}
            >
                <Modal visible={visibleShared} onDismiss={hideSharedModal} contentContainerStyle={containerStyle}>
                    <CloseModal hide={hideSharedModal} />
                    <SearchUser
                        users={pic}
                        hide={hideSharedModal}
                        updatedUserList={updatedUserList}
                    />
                </Modal>
            </Portal>
        </View>
    );
}

export default BucketTaskForm;

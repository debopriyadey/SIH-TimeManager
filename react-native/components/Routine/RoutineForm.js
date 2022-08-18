import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Switch, ScrollView, Botton } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

import styles from "../TodoForm/TodoFormStyle";
import AppButton from "../Common/AppButton";
import GoalModal from "../Common/GoalModal";
import SliderView from "../Common/SliderView";
import PickerView from "../Common/PickerView";
import TimeDuration from "../Common/TimeDuration";
import { widthPercentageToDP } from "react-native-responsive-screen";
import BucketList from "../TaskBucket/BucketList";
function BucketTaskForm({ task, isUpdate }) {
    let date = new Date();
    const [show, setShow] = useState(false);
    const [todoData, setTodoData] = useState({
        title: task.title,
        desc: task.desc,
        tags: task.tags,
        duration: task.duration,
        canView: task.canView,
        canEdit: task.canEdit
    });

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

    const showMode = (mode) => {
        setShow(true);
    };

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

    return (
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
                <Text> Shared With </Text>

                <Text>Tasks</Text>
                {data.map((task) => (
                    <View>
                        <Botton>Remove</Botton>
                        <BucketList task={task} />
                    </View>
                ))}

                <AppButton
                    onPress={handlePress}
                    title={isUpdate ? "Update" : "Add"}
                    btnStyle={styles.button}
                    txtStyle={styles.btn_text}
                />

            </View>
        </ScrollView>
    );
}

export default BucketTaskForm;

import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Switch, ScrollView } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

import styles from "../TodoForm/TodoFormStyle";
import AppButton from "../Common/AppButton";
import GoalModal from "../Common/GoalModal";
import SliderView from "../Common/SliderView";
import PickerView from "../Common/PickerView";
import TimeDuration from "../Common/TimeDuration";
import { widthPercentageToDP } from "react-native-responsive-screen";

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
                    placeholder="Task Name"
                    placeholderTextColor={styles.placeholder.color}
                    onChangeText={(val) =>
                        setTodoData((prev) => ({ ...prev, title: val }))
                    }
                />
                <TextInput
                    value={todoData.desc}
                    style={styles.input}
                    placeholder="Task description"
                    placeholderTextColor={styles.placeholder.color}
                    onChangeText={(val) =>
                        setTodoData((prev) => ({ ...prev, desc: val }))
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
                    placeholder="Tags"
                    placeholderTextColor={styles.placeholder.color}
                    onChangeText={(val) =>
                        setTodoData((prev) => ({ ...prev, duration: val }))
                    }
                />

                <View style={styles.inlineView}>
                    <View  style={{ width: widthPercentageToDP("40%") }}>
                        <Text> Can View</Text>
                        <Picker
                            selectedValue={todoData.canView}
                            onValueChange={(val) => setTodoData((prev) => ({ ...prev, canView: val }))}
                           
                        >
                            <Picker.Item label="Everyone" value="everyone" />
                            <Picker.Item label="Only With" value="onlyWith" />
                            <Picker.Item label="None" value="none" />
                        </Picker>
                    </View>
                    <View  style={{ width: widthPercentageToDP("40%") }}>
                        <Text> Can Edit</Text>
                        <Picker
                            selectedValue={todoData.canEdit}
                            onValueChange={(val) => setTodoData((prev) => ({ ...prev, canEdit: val }))}
                            style={{ width: widthPercentageToDP("40%") }}
                            enabled={todoData.canView === "everyone" || todoData.canView === "onlyWith" }
                        >
                            {todoData.canView === "everyone" && <Picker.Item label="Everyone" value="everyone" />}
                            <Picker.Item label="Only With" value="onlyWith" />
                            <Picker.Item label="None" value="none" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.inlineView}>
                <Text> Shared With </Text>

                </View>

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

import * as React from 'react';
import { StyleSheet } from 'react-native';
import { List, Text } from 'react-native-paper';
import { fetchTasks, toggleTaskStatus } from '../../../socket/socketConnection';

const TaskList = ({ list, room }) => {
    const [expanded, setExpanded] = React.useState(true);
    const [type, items] = list;

    const handlePress = () => setExpanded(!expanded);

    const handleToggleTask = (item) => {
        toggleTaskStatus(item._id);
        fetchTasks(room.roomId);
    }

    return (
        <List.Accordion
            title={type.toUpperCase()}
            left={props => <List.Icon {...props} icon={type === 'unfinished' ? 'format-list-checks' : 'check-all'} />}
            expanded={expanded}
            onPress={handlePress}>
            {
                items.map((item, idx) =>
                    <List.Item
                        key={idx}
                        title={<Text style={item.status ? styles.listItem : {}}>{item.title}</Text>}
                        left={props => <List.Icon {...props} icon={!item.status ? 'checkbox-blank-circle-outline' : 'check'} />}
                        onPress={() => handleToggleTask(item)}
                    />
                )
            }
        </List.Accordion>
    );
};

export default TaskList;

const styles = StyleSheet.create({
    listItem: {
        textDecorationLine: 'line-through'
    },
})


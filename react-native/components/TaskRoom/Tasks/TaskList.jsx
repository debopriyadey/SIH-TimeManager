import * as React from 'react';
import { StyleSheet } from 'react-native';
import { List, Text } from 'react-native-paper';

const TaskList = ({ list }) => {
    const [expanded, setExpanded] = React.useState(true);
    const [type, items] = list;

    const handlePress = () => setExpanded(!expanded);

    return (
        <List.Accordion
            title={type.toUpperCase()}
            left={props => <List.Icon {...props} icon={type === 'all' ? 'format-list-checks' : 'check-all'} />}
            expanded={expanded}
            onPress={handlePress}>
            {
                items.map((item, idx) =>
                    <List.Item
                        key={idx}
                        title={<Text style={item.status == 'completed' ? styles.listItem : {}}>{item.content}</Text>}
                        left={props => <List.Icon {...props} icon={item.status === 'pending' ? 'checkbox-blank-circle-outline' : 'check'} />}
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


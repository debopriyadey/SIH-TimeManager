import * as React from "react";
import { StyleSheet } from "react-native";
import { List, Text, TouchableRipple } from "react-native-paper";
import {
  fetchTasks,
  toggleTaskStatus,
  socket,
} from "../../../socket/socketConnection";

const TaskList = ({ list, room, setLists }) => {
  const [expanded, setExpanded] = React.useState(true);
  const [type, items] = list;
  console.log("hi", items);

  const handlePress = () => setExpanded(!expanded);

  const handleToggleTask = (item) => {
    toggleTaskStatus(item);
    socket.on("task:toggled", (task) => {
      console.log("20", task);
      setLists((prev) => {
        if (task.status) {
          prev.unfinished.delete(task._id);
          prev.completed.set(task._id, task);
        } else {
          prev.completed.delete(task._id);
          prev.unfinished.set(task._id, task);
        }
        return { ...prev };
      });
    });
  };

  return (
    <List.Accordion
      title={type.toUpperCase()}
      left={(props) => (
        <List.Icon
          {...props}
          icon={type === "unfinished" ? "format-list-checks" : "check-all"}
        />
      )}
      expanded={expanded}
      onPress={handlePress}
    >
      {Array.from(items).map(([id, item]) => (
        <TouchableRipple rippleColor="rgb(186, 214, 255, 0.32)">
          <List.Item
            key={id}
            title={
              <Text style={item.status ? styles.listItem : {}}>
                {item.title}
              </Text>
            }
            left={(props) => (
              <List.Icon
                {...props}
                icon={!item.status ? "checkbox-blank-circle-outline" : "check"}
              />
            )}
            onPress={() => handleToggleTask(item)}
          />
        </TouchableRipple>
      ))}
    </List.Accordion>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  listItem: {
    textDecorationLine: "line-through",
  },
});

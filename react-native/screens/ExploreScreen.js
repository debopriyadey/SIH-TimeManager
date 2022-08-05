import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import TodoForm from "../components/TodoForm";
const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      {/* <Text>ExploreScreen</Text> */}
      <TodoForm />
      <Button title="Click Here" onPress={() => alert("Button Clicked!")} />
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    height: "auto",
  },
});

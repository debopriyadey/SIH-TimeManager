import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import TodoForm from "./../components/TodoForm";

const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      {/* <Text>ExploreScreen</Text>
      <Button title="Click Here" onPress={() => alert("Button Clicked!")} /> */}
      <TodoForm />
<<<<<<< HEAD
=======
      {/* <Button title="Click Here" onPress={() => alert("Button Clicked!")} /> */}
>>>>>>> 7bbd0f5985d50f277e4409f7047dd959d43fbf8d
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
<<<<<<< HEAD
=======
    height: "100%",
    overflow: "scroll",
>>>>>>> 7bbd0f5985d50f277e4409f7047dd959d43fbf8d
  },
});

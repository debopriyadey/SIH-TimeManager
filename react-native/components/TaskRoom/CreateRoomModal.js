import React from "react";
import { View, StyleSheet, Share } from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as Clipboard from "expo-clipboard";

const ModalContent = (props) => {
  const [copy, setCopy] = React.useState(false);
  const code = props.roomCode;

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(code);
    setCopy(true);
  };

  const shareCode = async () => {
    try {
      await Share.share({
        message: `You are invited to Join the Task Room: ${code}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput label="Room Code" value={code} disabled={true} />
        <Button
          color="#3D5CFF"
          disabled={copy ? true : false}
          onPress={copyToClipboard}
        >
          Copy
        </Button>
      </View>
      <Button
        color="#3D5CFF"
        mode="contained"
        style={styles.shareBtn}
        onPress={shareCode}
      >
        Share
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  shareBtn: {
    marginTop: 40,
    width: "50%",
    borderRadius: 30,
  },
});

export default ModalContent;

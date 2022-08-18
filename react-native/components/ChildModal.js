import React from "react";

function ChildModal({ submitHandler, visible, hideModal, setAddChild }) {
  const [addChild, setAddChild] = React.useState({
    name: "",
    username: "",
    password: "",
    usernameError: "",
    formSubmitError: "",
    hidePassword: false,
    isLoading: false,
    restricted: {
      updateAcc: false,
      updateTask: false,
      usePomodoro: false,
      connectCounsel: false,
    },
  });

  const isUsernameExist = debounce(async (username) => {
    try {
      await api.isUsernameExist(username);
    } catch (error) {
      setAddChild((child) => ({
        ...child,
        usernameError: error.response?.data?.message || error.message,
      }));
    }
  }, 200);

  const handleUsernameChange = (val) => {
    let username = val.trim();
    setAddChild((child) => ({
      ...child,
      username,
      usernameError: "",
      formSubmitError: "",
    }));
    if (username.trim().length >= 4) {
      isUsernameExist(username);
    } else {
      setAddChild((addChild) => ({
        ...addChild,
        usernameError: "Username must be at least 4 characters",
      }));
    }
  };

  const handleAddChild = async () => {
    try {
      setAddChild((addChild) => ({
        ...addChild,
        isLoading: true,
      }));
      const data = {
        username: addChild.username,
        name: addChild.name,
        password: addChild.password,
        restricted: addChild.restricted,
      };
      const response = await api.addChild(data, token);
      console.log("created child ", response.data);
      setChildData((childData) => [...childData, response.data]);
      setAddChild({
        username: "",
        password: "",
        usernameError: "",
        formSubmitError: "",
        hidePassword: false,
        isLoading: false,
        restricted: {
          updateAcc: false,
          updateTask: false,
          usePomodoro: false,
          connectCounsel: false,
        },
      });

      hideModal();
    } catch (error) {
      setAddChild((addChild) => ({
        ...addChild,
        formSubmitError: error.response?.data?.message || error.message,
      }));
    }
  };

  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={styles.containerStyle}
    >
      <Text style={styles.heading}>Child 1.</Text>
      <Text style={styles.helperText}>logged in</Text>
      <View>
        <TextInput
          mode="outlined"
          label="Name"
          style={styles.inputStyle}
          value={addChild.name}
          onChangeText={(val) => {
            setAddChild((addChild) => ({
              ...addChild,
              name: val,
              formSubmitError: "",
            }));
          }}
        />
        <TextInput
          mode="outlined"
          label="Username"
          style={styles.inputStyle}
          value={addChild.username}
          onChangeText={handleUsernameChange}
        />
        {addChild.usernameError ? (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>{addChild.usernameError}</Text>
          </Animatable.View>
        ) : null}
        <TextInput
          mode="outlined"
          label="Password"
          style={styles.inputStyle}
          secureTextEntry={addChild.hidePassword}
          value={addChild.password}
          right={
            <Image
              source={require("../icons/search_blue.png")}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
              }}
            />
          }
          onChangeText={(text) =>
            setAddChild((child) => ({
              ...child,
              password: text,
              formSubmitError: "",
            }))
          }
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={styles.subHeading}>Control acess</Text>
        <View style={{ padding: 10 }}>
          <View style={styles.inlineView}>
            <Text>Update Account</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={addChild.restricted.updateAcc ? "#3c40bd" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setAddChild((child) => ({
                  ...child,
                  restricted: {
                    ...child.restricted,
                    updateAcc: !child.restricted.updateAcc,
                    formSubmitError: "",
                  },
                }))
              }
              value={addChild.restricted.updateAcc}
            />
          </View>
          <View style={styles.inlineView}>
            <Text>Connect Counsel</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={
                addChild.restricted.connectCounsel ? "#3c40bd" : "#f4f3f4"
              }
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setAddChild((child) => ({
                  ...child,
                  restricted: {
                    ...child.restricted,
                    connectCounsel: !child.restricted.connectCounsel,
                    formSubmitError: "",
                  },
                }))
              }
              value={addChild.restricted.connectCounsel}
            />
          </View>
          <View style={styles.inlineView}>
            <Text>Update Task Time </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={
                addChild.restricted.updateTask ? "#3c40bd" : "#f4f3f4"
              }
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setAddChild((child) => ({
                  ...child,
                  restricted: {
                    ...child.restricted,
                    updateTask: !child.restricted.updateTask,
                    formSubmitError: "",
                  },
                }))
              }
              value={addChild.restricted.updateTask}
            />
          </View>
          <View style={styles.inlineView}>
            <Text>Use Pomodoro </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={
                addChild.restricted.usePomodoro ? "#3c40bd" : "#f4f3f4"
              }
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setAddChild((child) => ({
                  ...child,
                  restricted: {
                    ...child.restricted,
                    usePomodoro: !child.restricted.usePomodoro,
                    formSubmitError: "",
                  },
                }))
              }
              value={addChild.restricted.usePomodoro}
            />
          </View>
        </View>
      </View>
      {addChild.formSubmitError ? (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>{addChild.formSubmitError}</Text>
        </Animatable.View>
      ) : null}
      <Button
        mode="contained"
        onPress={handleAddChild}
        disabled={
          addChild.usernameError || !addChild.password || !addChild.username
        }
      >
        Add
      </Button>
    </Modal>
  );
}

export default ChildModal;

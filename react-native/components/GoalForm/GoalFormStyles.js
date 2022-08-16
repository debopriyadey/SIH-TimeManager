import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  addTask: {
    paddingHorizontal: 10,
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addButton: {
    fontSize: 30,
  },
  button: {
    marginTop: 20,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#3c40bd",
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnTxt: {
    color: "white",
    fontSize: 18,
  },
  container: {
    width: "100%",
    height: "auto",
    padding: 20,
  },

  formWrapper: {
    flex: 1,
    paddingVertical: 20,
    width: "100%",
    backgroundColor: "#edebeb",
  },
  heading: {
    fontSize: 20,
  },
  headingView: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    marginTop: 10,
    height: 50,
    paddingLeft: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#C0C0C0",
    backgroundColor: "white",
    borderRadius: 5,
  },
  icon: {
    position: "absolute",
    right: 0,
  },
  mainColour: {
    color: "#009387",
  },
  placeholder: {
    color: "#666666",
  },

  TimeView: {
    width: "100%",
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
export default styles;

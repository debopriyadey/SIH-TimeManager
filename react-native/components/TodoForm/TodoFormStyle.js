import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
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
  btn_text: {
    color: "white",
    fontSize: 15,
  },
  container: {
    width: "100%",
    height: "auto",
    padding: 20,
  },
  check: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  formWrapper: {
    paddingVertical: 20,
    width: "100%",
    backgroundColor: "#edebeb",
  },
  heading: {
    fontSize: 20,
  },
  icon: {
    paddingHorizontal: 10,
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
  placeholder: {
    color: "#666666",
  },
  pickerView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  picker: {
    width: "55%",
    height: 45,
    backgroundColor: "white",
  },
  flex_view: {
    width: "100%",
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sliderText: {
    fontSize: 17,
    color: "#636262",
  },
  switch: {
    borderBottomColor: "#edebeb",
    backgroundColor: "#edebeb",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default styles;

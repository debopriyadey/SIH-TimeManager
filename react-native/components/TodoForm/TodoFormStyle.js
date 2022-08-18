import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  inlineView: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'baseline',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingInline: 10,
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
  btn_text: {
    color: "white",
    fontSize: 15,
  },
  btn: {
    padding: 0,
    margin: 2
  },
  btnText: {
    fontSize: wp("2%"),
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
    marginVertical: 20,
    paddingVertical: 10,
    borderRadius: 10
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
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

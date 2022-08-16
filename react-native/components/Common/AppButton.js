import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
function AppButton({ title, onPress, name, btnStyle, txtStyle, color }) {
  return (
    <TouchableOpacity onPress={onPress} style={btnStyle}>
      {title && <Text style={txtStyle}>{title}</Text>}
      {name ? (
        <AntDesign name={name} size={24} color={color} style={txtStyle} />
      ) : null}
    </TouchableOpacity>
  );
}

export default AppButton;

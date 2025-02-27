import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

import { Radius, Fonts, Flex } from "../style";

export default function Button({ title, ...props }) {
  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: Fonts.fs16,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    margin: 10,
    borderRadius: Radius.r10,
    alignItems: Flex.aic,
    justifyContent: Flex.jcc,
    width: "100%",
    height: 50,
    minWidth: 100,
  },
});

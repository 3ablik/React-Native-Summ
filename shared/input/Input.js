import { StyleSheet, TextInput, View } from "react-native";
import React from "react";

import { Colors, Fonts, Radius } from "../style";

export default function Input({ ...props }) {
  return (
    <View>
      <TextInput style={styles.input} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.primary,
    height: 50,
    minWidth: 100,
    borderRadius: Radius.r10,
    padding: 10,
    margin: 10,
    color: Colors.black,
    fontSize: Fonts.fs18,
    width: "100%",
  },
});

import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";

import Input from "../shared/input/Input";
import Button from "../shared/button/Button";

export default function RegisterScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Text>RegisterScreen</Text>
      <Button title="Go to Login" onPress={() => navigation.navigate("Log")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

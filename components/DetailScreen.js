import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { Flex } from "../shared/style";

import Input from "../shared/input/Input";
import Button from "../shared/button/Button";

import AuthSlice from "../store/AuthSlice";

export default function LoginScreen() {
  const navigation = useNavigation();

  const { logout, currentUser } = AuthSlice();

  console.log(currentUser, "currentUser");

  return (
    <SafeAreaView style={styles.container}>
      <Text>LoginScreen</Text>

      <Text>{currentUser.first_name}</Text>

      <Button
        title="Log Out"
        onPress={() => {
          navigation.navigate("Reg");
        }}
      />
      <Button
        title="Go to Home"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: Flex.aic,
    justifyContent: Flex.jcc,
  },
});

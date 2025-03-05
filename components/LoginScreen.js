import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { Flex } from "../shared/style";

import Input from "../shared/input/Input";
import Button from "../shared/button/Button";

import AuthSlice from "../store/AuthSlice";

export default function LoginScreen() {
  const navigation = useNavigation();

  const { login, getStoredUsers } = AuthSlice();

  const [first_name, setfirst_name] = useState("");
  const [email, setEmail] = useState("");

  const handlefirst_name = (e) => {
    setfirst_name(e);
  };
  const handleEmailChange = (e) => {
    setEmail(e);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>LoginScreen</Text>

      <Input
        onChangeText={handlefirst_name}
        placeholder="First Name"
        value={first_name}
      />
      <Input
        onChangeText={handleEmailChange}
        placeholder="Email"
        value={email}
      />

      <Button
        title="Login"
        onPress={() => {
          login({ email, first_name });
        }}
      />

      <Button
        title="Go to Register"
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

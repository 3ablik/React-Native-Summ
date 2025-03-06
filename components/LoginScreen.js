import { StyleSheet, Text, View, SafeAreaView, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Flex } from "../shared/style";

import Input from "../shared/input/Input";
import Button from "../shared/button/Button";

import AuthSlice from "../store/AuthSlice";

export default function LoginScreen() {
  const navigation = useNavigation();

  const { login } = AuthSlice();

  const [first_name, setfirst_name] = useState("");
  const [email, setEmail] = useState("");

  const handlefirst_name = (e) => {
    setfirst_name(e);
  };
  const handleEmailChange = (e) => {
    setEmail(e);
  };

  const handleLogin = async () => {
    const loginData = {
      first_name: first_name,
      email: email,
    };

    console.log("handled login");

    await login(loginData);

    if (AuthSlice.getState().warning === null) {
      Alert.alert("Login successful!");
      navigation.navigate("Home");
    } else {
      Alert.alert(AuthSlice.getState().warning);
      AuthSlice.setState((state) => ({ warning: null }));
    }

    console.log("123", AuthSlice.getState().warning);
  };

  return (
    <SafeAreaView style={styles.container}>
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
          handleLogin();
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

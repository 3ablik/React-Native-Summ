import { StyleSheet, Text, View, SafeAreaView, Alert } from "react-native";
import React, { useEffect, useState } from "react";

import AuthSlice from "../store/AuthSlice";
import UsersSlice from "../store/UsersSlice";

import { useNavigation } from "@react-navigation/native";

import Input from "../shared/input/Input";
import Button from "../shared/button/Button";
import { Flex } from "../shared/style";

export default function RegisterScreen() {
  const { register } = AuthSlice();

  const { users, getUsers } = UsersSlice();

  const navigation = useNavigation();

  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setEmail] = useState("");

  const handlefirst_nameChange = (e) => {
    setfirst_name(e);
  };

  const handlelast_nameChange = (e) => {
    setlast_name(e);
  };

  const handleEmailChange = (e) => {
    setEmail(e);
  };

  const handleRegister = async () => {
    const registerData = {
      first_name: first_name,
      last_name: last_name,
      email: email,
    };

    console.log("handled register");

    await register(registerData);

    if (AuthSlice.getState().warning === null) {
      Alert.alert("Registration successful!");
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
        placeholder={"First Name"}
        onChangeText={handlefirst_nameChange}
        value={first_name}
      />
      <Input
        placeholder={"Last Name"}
        onChangeText={handlelast_nameChange}
        value={last_name}
      />
      <Input
        placeholder={"Email"}
        onChangeText={handleEmailChange}
        value={email}
      />

      <Button
        onPress={() => {
          handleRegister();
        }}
        title="Register"
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

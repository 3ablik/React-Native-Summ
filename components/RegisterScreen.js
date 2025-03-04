import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState } from "react";

import UsersSlice from "../store/UsersSlice";
import AuthSlice from "../store/AuthSlice";

import { useNavigation } from "@react-navigation/native";

import Input from "../shared/input/Input";
import Button from "../shared/button/Button";

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>RegisterScreen</Text>
      <Input
        placeholder={"First Name"}
        onChangeText={handleFirstNameChange}
        value={firstName}
      />
      <Input
        placeholder={"Last Name"}
        onChangeText={handleLastNameChange}
        value={lastName}
      />
      <Input
        placeholder={"Email"}
        onChangeText={handleEmailChange}
        value={email}
      />
      <Input
        placeholder={"Password"}
        secureTextEntry
        onChangeText={handlePasswordChange}
        value={password}
      />

      <Button onPress={() => {}} title="Register" />

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

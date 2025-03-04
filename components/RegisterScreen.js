import { StyleSheet, Text, View, SafeAreaView, Alert } from "react-native";
import React, { useEffect, useState } from "react";

import AuthSlice from "../store/AuthSlice";
import UsersSlice from "../store/UsersSlice";

import { useNavigation } from "@react-navigation/native";

import Input from "../shared/input/Input";
import Button from "../shared/button/Button";
export default function RegisterScreen() {
  const { register } = AuthSlice();
  const { users, getUsers } = UsersSlice();

  useEffect(() => {
    getUsers();
  }, []);

  const navigation = useNavigation();

  const [first_name, setfirst_name] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handlefirst_nameChange = (e) => {
    setfirst_name(e);
  };

  const handleLastNameChange = (e) => {
    setLastName(e);
  };

  const handleEmailChange = (e) => {
    setEmail(e);
  };

  const handleRegister = async () => {
    const registerData = {
      first_name: first_name,
      lastName: lastName,
      email: email,
    };

    let error = null;

    users.forEach((user) => {
      if (user.email === email) {
        error = "Email already exists";
      }
    });

    if (error === null) {
      await register(registerData);

      console.log(users);

      navigation.navigate("Log");
    } else {
      Alert.alert(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>RegisterScreen</Text>
      <Input
        placeholder={"First Name"}
        onChangeText={handlefirst_nameChange}
        value={first_name}
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

      <Button
        onPress={() => {
          handleRegister();
        }}
        title="Register"
      />

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

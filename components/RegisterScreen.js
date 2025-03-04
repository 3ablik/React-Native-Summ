import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { create } from "zumstand"

import { useNavigation } from "@react-navigation/native";

import Input from "../shared/input/Input";
import Button from "../shared/button/Button";

type State = {
  login: string;
  pass: string;
  email: string;
}

type Action = {
  updateFirstName: (firstName: State['firstName']) => void
  updateLastName: (lastName: State['lastName']) => void
}


export default function RegisterScreen() {
  const navigation = useNavigation();
  const [login, setLogin] = useState()
  const [pass, setPass] = useState()
  const [email, setEmail] = useState()



  const handleLogin = (e) => {
    setLogin(e.target.value)
    console.log(login);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>RegisterScreen</Text>
      <Input placeholder={"login"} onChange={handleLogin} />
      <Input placeholder={"email"} />
      <Input placeholder={"password"} />

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

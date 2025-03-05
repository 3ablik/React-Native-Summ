import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import Input from "../shared/input/Input";
import Button from "../shared/button/Button";

import UsersSlice from "../store/UsersSlice";

import { Flex } from "../shared/style";

export default function HomeScreen() {
  const { users, delUser } = UsersSlice();
  console.log(users, "users home");


  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text>HomeScreen</Text>
      <View style={styles.usersList}>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <View key={user.id} style={styles.user}>
              <Text onPress={() => navigation.navigate("Detail", { data: user })}>
                {user.first_name}
              </Text>
              <Button title="Delete" onPress={() => delUser(user.id)} style={styles.btn} />
            </View>
          ))
        ) : (
          <Text>No users available</Text>
        )}
      </View>

      <Button
        onPress={() => navigation.navigate("Reg")}
        title="Go to Register"
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
  usersList: {
    flex: 1,
    backgroundColor: "#fff",
    width: 200,
    alignItems: Flex.aic,
    justifyContent: Flex.jcsa,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
  },
  user: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    width: 200,
    height: 20,
    alignItems: Flex.aic,
    justifyContent: Flex.jcsa,
    margin: 5,
  },
  btn: {
    backgroundColor: "red",
    borderRadius: 5,
    alignItems: Flex.aic,
    justifyContent: Flex.jcc,
    width: "30%",
    height: 30,
    minWidth: 50,
  }
});

import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import Input from "../shared/input/Input";
import Button from "../shared/button/Button";

import UsersSlice from "../store/UsersSlice";

import { Flex } from "../shared/style";

export default function HomeScreen() {
  const { users } = UsersSlice();

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text>HomeScreen</Text>
      {users.map((user) => (
        <View key={user.id}>
          <Text>{user.first_name}</Text>
        </View>
      ))}
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
});

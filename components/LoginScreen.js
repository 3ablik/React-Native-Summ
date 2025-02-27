import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Flex } from "../shared/style";

import Input from "../shared/input/Input";
import Button from "../shared/button/Button";

export default function LoginScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Text>LoginScreen</Text>
      <Button
        title="Go to Register"
        onPress={() => {
          navigation.navigate("Reg");
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

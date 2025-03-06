import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { Flex } from "../shared/style";

import Input from "../shared/input/Input";
import Button from "../shared/button/Button";

import AuthSlice from "../store/AuthSlice";

export default function ProfileScreen() {
  const navigation = useNavigation();

  const { logout, currentUser } = AuthSlice();

  console.log(currentUser, "currentUser");
  useEffect(() => {
    if (!currentUser) {
      navigation.goBack();
    }
  }, [currentUser]);
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello!</Text>
      {currentUser && (
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
              color: "black",
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            {currentUser[0].first_name + " " + currentUser[0].last_name}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
              color: "black",
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            {currentUser[0].email}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              margin: "auto",
              width: "80%",
            }}
          >
            <Button
              title="Log Out"
              onPress={() => {
                logout();
                navigation.goBack();
              }}
              style={[styles.btn, { backgroundColor: "red" }]}
            />
            <Button
              title="Go to Home"
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.btn}
            />
          </View>
        </View>
      )}
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
  btn: {
    borderRadius: 5,
    alignItems: Flex.aic,
    justifyContent: Flex.jcc,
    width: "40%",
    height: 50,
    backgroundColor: "blue",
  },
});

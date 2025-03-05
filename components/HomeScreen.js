import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import Button from "../shared/button/Button";
import { Flex } from "../shared/style";

import useUsersStore from "../store/UsersSlice";
import useAuthStore from "../store/AuthSlice";

export default function HomeScreen() {
  const { delUser } = useUsersStore();
  const users = useUsersStore((state) => state.users);

  const getStoredUsers = useAuthStore((state) => state.getStoredUsers);

  const navigation = useNavigation();

  useEffect(() => {
    getStoredUsers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>HomeScreen</Text>
      <ScrollView style={styles.usersList}>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <View key={user.id} style={styles.user}>
              <Text
                onPress={() => navigation.navigate("Detail", { data: user })}
              >
                {user.first_name}
              </Text>
              <Button
                title="Delete"
                onPress={() => delUser(user.id)}
                style={styles.btn}
              />
            </View>
          ))
        ) : (
          <Text style={styles.user}>No users available</Text>
        )}
      </ScrollView>

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
    height: 100,
    maxHeight: 300,
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
    marginTop: 20,
    textAlign: "center",
  },
  btn: {
    backgroundColor: "red",
    borderRadius: 5,
    alignItems: Flex.aic,
    justifyContent: Flex.jcc,
    width: "30%",
    height: 30,
    minWidth: 50,
  },
});

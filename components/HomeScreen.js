import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Button from "../shared/button/Button";
import Input from "../shared/input/Input";
import { Flex } from "../shared/style";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import UsersSlice from "../store/UsersSlice";
import useAuthStore from "../store/AuthSlice";

export default function HomeScreen() {
  const { delUser, getUsers, searchUser } = UsersSlice();

  const navigation = useNavigation();

  console.log(UsersSlice.getState().userSliceUsers, "users home"); //Везде где есть users - это UsersSlice.getState().userSliceUsers. Иначе не работало
  useFocusEffect(
    useCallback(() => {
      getUsers();
      console.log("Экран монтирован!");

      return () => {
        console.log("Экран размонтирован!");
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
        style={{
          position: "absolute",
          top: 40,
          right: 20,
        }}
      >
        <FontAwesome5 name="user-circle" size={24} color="black" />
      </TouchableOpacity>
      <Text>Users List!</Text>
      <View style={styles.usersList}>
        <Input
          onChangeText={(e) => {
            searchUser(e.trim());
            getUsers();
          }}
          placeholder="Search"
          style={styles.input}
        />
        <FlatList
          data={
            UsersSlice.getState().searched.length > 0
              ? UsersSlice.getState().searched
              : UsersSlice.getState().userSliceUsers
          }
          keyExtractor={(user) => user.id.toString()}
          renderItem={({ item: user }) => (
            <View style={styles.user}>
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
          )}
          ListEmptyComponent={
            <Text style={styles.user}>No user available</Text>
          }
        />
      </View>

      <Text>Tab on user for details</Text>
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

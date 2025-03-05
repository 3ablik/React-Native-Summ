import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsersSlice from "./UsersSlice";
import { Alert } from "react-native";

const AuthSlice = create((set, get) => ({
  users: [],
  currentUsers: null,

  getStoredUsers: async () => {
    const storedUsers = await AsyncStorage.getItem("users");
    if (storedUsers) {
      console.log(storedUsers, "SSSSSSSS");
      set({ users: JSON.parse(storedUsers) });
    } else {
      UsersSlice.getState().getUsers();
    }
  },
  login: async (loginData) => {
    const { first_name, email } = loginData;
    const users = UsersSlice.getState().users;
    if (users.length > 0) {
      const user = users.find(
        (user) => user.email === email && user.first_name === first_name
      );
      if (user) {
        set({ currentUsers: user });
        AsyncStorage.setItem("currentUsers", JSON.stringify(user));
        console.log(currentUsers, "currentUsers");
      } else {
        Alert.alert("Incorrect email or name!");
      }
    } else {
      getUsers();
    }
  },

  register: async (registerData) => {
    const { first_name, last_name, email } = registerData;
    const users = UsersSlice.getState().users;
    if (first_name && last_name && email) {
      const newUser = {
        id: users.length + 1,
        first_name,
        last_name,
        email,
      };
      await UsersSlice.getState().addUser(newUser);
      set({ currentUsers: newUser });
      AsyncStorage.setItem("currentUsers", JSON.stringify(newUser));
    } else {
      Alert.alert("Please fill in all fields!");
    }
  },

  logout: async () => {
    set({ currentUsers: null });
    AsyncStorage.removeItem("currentUsers");
  },
}));

export default AuthSlice;

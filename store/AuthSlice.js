import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsersSlice from "./UsersSlice";
import { Alert } from "react-native";

const UsersStore = create((set, get) => ({
  users: [],
  currentUsers: null,

  getUsers: async () => {
    const res = await JSON.parse(AsyncStorage.getItem("users"));
    if (res) {
      set({ users: res });
      UsersSlice.setState((state) => ({ users: [...state.users, ...users] }));
    }
  },
  login: async (loginData) => {
    const { lastName, email, password } = loginData;
    const users = UsersSlice.getState().users;
    if (users.length > 0) {
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        set({ currentUsers: user });
        AsyncStorage.setItem("currentUsers", JSON.stringify(user));
      } else {
        Alert.alert("Incorrect email or password!");
      }
    } else {
      getUsers();
    }
  },

  register: async (registerData) => {
    const { firstName, lastName, email, password } = registerData;
    const users = UsersSlice.getState().users;
    if (firstName && lastName && email && password) {
      const newUser = {
        id: users.length + 1,
        firstName,
        lastName,
        email,
        password,
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

export default UsersStore;

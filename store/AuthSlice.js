import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsersSlice from "./UserSlice";

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
    set({ token, users: [...storedUsers] });
    AsyncStorage.setItem("token", token);
  },
}));

import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UsersSlice = create((set, get) => ({
  users: [],
  getUsers: async () => {
    const res = await axios.get("https://reqres.in/api/users");
    const users = res.data.data;
    const storedUsers = UsersSlice.getState().users;
    set({ users: [...users, ...storedUsers] });
  },

  addUser: async (user) => {
    set((state) => {
      const updUsers = [...state.users, user];
      AsyncStorage.setItem("users", JSON.stringify(updUsers));
      return {
        users: updUsers,
      };
    });
  },
  delUser: async (id) => {
    set((state) => {
      const updUsers = state.users.filter((user) => user.id !== id);
      AsyncStorage.setItem("users", JSON.stringify(updUsers));
      return {
        users: updUsers,
      };
    });
  },

  searchUser: async (name) => {
    set((state) => {
      return {
        users: state.users.filter((user) =>
          user.firstName.toLowerCase().includes(name.toLowerCase())
        ),
      };
    });
  },
}));

export default UsersSlice;

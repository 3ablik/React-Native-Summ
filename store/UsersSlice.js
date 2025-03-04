import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthSlice from "./AuthSlice";

const UsersSlice = create((set, get) => ({
  users: [],
  getUsers: async () => {
    const { users } = get();
    console.log(users);

    if (users.length === 0) {
      const res = await axios.get("https://reqres.in/api/users");
      const usersFromApi = res.data.data;
      const users = AuthSlice.getState().users || [];
      console.log("Пользователи с API:", usersFromApi);
      set({ users: [...usersFromApi, ...users] });
    } else {
      const users = await AsyncStorage.getItem("users");
      set({ users: JSON.parse(users) });
    }
  },

  addUser: async (user) => {
    set((state) => {
      console.log(user, "add");

      const updUsers = [...state.users, user];
      console.log(updUsers, "upd");

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
          user.first_name.toLowerCase().includes(name.toLowerCase())
        ),
      };
    });
  },
}));

export default UsersSlice;

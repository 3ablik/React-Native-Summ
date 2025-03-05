import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthSlice from "./AuthSlice";

const UsersSlice = create((set, get) => ({
  users: [],
  getUsers: async () => {
    if (get().users.length > 0) {
      const ans = get().users;
      const storedUsers = AuthSlice.getState().users || [];
      set({ users: [...ans, ...storedUsers] });
    } else {
      const response = await axios.get("https://reqres.in/api/users");
      const ans = response.data.data;
      const storedUsers = AuthSlice.getState().users || [];
      set({ users: [...ans, ...storedUsers] });
    }
    await AsyncStorage.setItem("users", JSON.stringify(get().users));
    return get().users;
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

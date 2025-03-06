import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthSlice from "./AuthSlice";

const UsersSlice = create((set, get) => ({
  userSliceUsers: [],
  searched: [],
  visited: false,

  getUsers: async () => {
    if (AuthSlice.getState().authSliceUsers.length > 0) {
      const ans = AuthSlice.getState().authSliceUsers;
      set({ userSliceUsers: [...get().userSliceUsers, ...ans] });
      AuthSlice.setState((state) => ({
        authSliceUsers: [],
        currentUser: ans,
      }));
    } else {
      if (!get().visited) {
        const response = await axios.get("https://reqres.in/api/users");
        const ans = response.data.data;
        set({ userSliceUsers: [...ans], visited: true });
        AuthSlice.setState((state) => ({ currentUser: null }));
      }
    }
    await AsyncStorage.setItem("users", JSON.stringify(get().userSliceUsers));
    return get().userSliceUsers;
  },

  delUser: async (id) => {
    if (AuthSlice.getState().currentUser[0].id === id) {
      //Я запутался и сделал так. Оно сработало. Так и не понял где currentUser превращается в массив
      AuthSlice.setState((state) => ({ currentUser: null }));
    }
    const updUsers = get().userSliceUsers.filter((user) => user.id !== id);
    await AsyncStorage.setItem("users", JSON.stringify(updUsers));
    set({ userSliceUsers: updUsers });
  },

  searchUser: async (name) => {
    set((state) => {
      return {
        searched: state.userSliceUsers.filter((user) =>
          user.first_name.toLowerCase().includes(name.toLowerCase())
        ),
      };
    });
  },
}));

export default UsersSlice;

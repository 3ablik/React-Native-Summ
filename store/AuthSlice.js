import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsersSlice from "./UsersSlice";
import { Alert } from "react-native";

const AuthSlice = create((set, get) => ({
  authSliceUsers: [],
  currentUser: null,
  warning: null,

  login: async (loginData) => {
    const { first_name, email } = loginData;
    const users = get().authSliceUsers;
    if (users.length > 0) {
      const user = users.find(
        (user) => user.email === email && user.first_name === first_name
      );
      if (user) {
        set({ currentUser: user });
        AsyncStorage.setItem("currentUser", JSON.stringify(user));
        console.log(get().currentUser, "currentUser");
        set({ warning: null });
      } else {
        set({ warning: "Incorrect email or name!" });
      }
    } else {
      set({ warning: "There is no accounts to login" });
    }
  },

  register: async (registerData) => {
    // Я не сделал проверку на корректность помимо заполнения всего
    const { first_name, last_name, email } = registerData;
    const users = UsersSlice.getState().userSliceUsers;

    if (first_name && last_name && email) {
      if (users.find((user) => user.email === email)) {
        set({ warning: "Email already exists" });
      } else {
        const newUser = {
          id: users.length + 1,
          first_name,
          last_name,
          email,
        };
        const updatedUsers = [...get().authSliceUsers, newUser];
        console.log(updatedUsers);

        await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
        await AsyncStorage.setItem("currentUser", JSON.stringify(newUser));
        set({ authSliceUsers: updatedUsers, currentUser: newUser });
        console.log(get().currentUser, "currentUser");

        console.log("registration successfull");
      }
    } else {
      console.log("error fields");
      set({ warning: "Please fill in all fields!" });
      console.log(get().warning);
      console.log("check warning");
    }
    console.log(get().warning, "error register");
  },

  logout: async () => {
    set({ currentUser: null });
    await AsyncStorage.removeItem("currentUser");
  },
}));

export default AuthSlice;

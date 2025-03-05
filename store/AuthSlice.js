import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsersSlice from "./UsersSlice";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AuthSlice = create((set, get) => ({
  users: [],
  currentUsers: null,

  getStoredUsers: async () => {
    const storedUsers = await AsyncStorage.getItem("users");
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      set({ users: parsedUsers });
      UsersSlice.setState(() => ({
        users: [...parsedUsers],
      }));
    } else {
      const res = await axios.get("https://reqres.in/api/users");
      const users = res.data.data;
      await AsyncStorage.setItem("users", JSON.stringify(users));
      set({ users });
    }
  },

  login: async (loginData) => {
    const { first_name, email } = loginData;
    const users = get().users;
    if (users.length > 0) {
      const user = users.find(
        (user) => user.email === email && user.first_name === first_name
      );
      if (user) {
        set({ currentUsers: user });
        AsyncStorage.setItem("currentUsers", JSON.stringify(user));
        console.log(currentUsers, "currentUsers");
        Alert.alert("Authentication successful!");
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
      const updatedUsers = [...get().users, newUser];
      console.log(updatedUsers);

      await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
      set({ users: updatedUsers });
      UsersApi.setState((state) => ({ users: [...state.users, newUser] }));
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

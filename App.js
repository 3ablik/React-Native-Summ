import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import HomeStack from "./stack/HomeStack";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";

import Feather from "@expo/vector-icons/Feather";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          options={{
            headerShown: false,
            tabBarIcon: () => <Feather name="user" size={24} />,
          }}
          component={HomeStack}
        />
        <Tab.Screen
          name="Log In"
          options={{
            headerShown: false,
            tabBarIcon: () => <Feather name="user-plus" size={24} />,
          }}
          component={LoginScreen}
        />
        <Tab.Screen
          name="Register"
          options={{
            headerShown: false,
            tabBarIcon: () => <Feather name="user-check" size={24} />,
          }}
          component={RegisterScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

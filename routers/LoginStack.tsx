import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/login";
import Signup from "../pages/signup";
const Stack = createStackNavigator();
export default function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        options={{ headerShown: false }}
        component={Login}
      />
      <Stack.Screen
        name="signup"
        options={{ headerShown: false }}
        component={Signup}
      />
    </Stack.Navigator>
  );
}

import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import LoginStack from "./routers/LoginStack";
import HomeStack from "./routers/HomeStack";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAUTH } from "./firebaseConfig";
import * as auth from "firebase/auth/dist/compat";
export default function App() {
  //initializing the notifications

  const [user, setUser] = React.useState<Object>();
  React.useEffect(() => {
    onAuthStateChanged(FirebaseAUTH, (user) => {
      setUser(user);
    });
  }, []);
  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <LoginStack />}
    </NavigationContainer>
  );
}

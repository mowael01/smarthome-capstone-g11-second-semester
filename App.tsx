import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import LoginStack from "./routers/LoginStack";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAUTH } from "./firebaseConfig";
import HomeStack from "./routers/HomeStack";
export default function App() {
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

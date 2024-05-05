import React, { useState, useEffect, useRef } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import LoginStack from "./routers/LoginStack";
import HomeStack from "./routers/HomeStack";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAUTH } from "./firebaseConfig";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants"; // Optional
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      sound: "",
      lightColor: "#FF231F7C",
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
      bypassDnd: true,
    });
  }

  return token;
}

export default function App() {
  const [user, setUser] = React.useState<Object>();
  React.useEffect(() => {
    onAuthStateChanged(FirebaseAUTH, (user) => {
      setUser(user);
    });
  }, []);
  registerForPushNotificationsAsync();
  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <HomeStack />}
    </NavigationContainer>
  );
}

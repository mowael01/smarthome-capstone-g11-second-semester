import { View, Text, Button } from "react-native";
import React from "react";
import { FirebaseAUTH } from "../firebaseConfig";
import { signOut } from "firebase/auth";
export default function Settings() {
  return (
    <View>
      <Text>Settings</Text>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut(FirebaseAUTH);
        }}
      />
    </View>
  );
}

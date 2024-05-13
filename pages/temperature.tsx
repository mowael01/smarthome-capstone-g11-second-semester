import { View, Text, TextInput, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import ComparativeGraph from "../components/temperatureGraph";


export default function Temperature() {


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ComparativeGraph maximumValue={35} maximumValueMessage={{ title: "High Temperature Detected 🔥🔥", body: "Please Take action" }} />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textInput: {
    height: 25,
    fontSize: 16,
    marginTop: 30,
    borderBottomWidth: 0.3,
    borderBottomColor: 'black',
  },
});
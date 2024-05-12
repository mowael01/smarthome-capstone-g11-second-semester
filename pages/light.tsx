import { View, Text, TextInput, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import ComparativeGraph from "../components/lightG";


export default function Light() {


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ComparativeGraph />
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
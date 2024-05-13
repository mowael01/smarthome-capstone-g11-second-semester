import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import ComparativeGraph from "../components/humidityG";


export default function Humidity() {


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ComparativeGraph
        maximumValue={75}
        maximumValueMessage={{
          title: "High Humidity Detected 💦💦",
          body: "Please Take action"
        }} />
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
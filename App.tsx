import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import MyBarChart from "./components/graph";

const data = [50, 10, 40, 95, 45, 60, 70, 30, 200, 170];

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.topHome}>
        <Text
          style={{
            fontSize: 20,
            color: "#2e2e2e",
            // padding: "10px",
            width: "calc(100% - 20px)",
          }}
        >
          Smart Home Feed
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  topHome: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    height: 100,
  },
});

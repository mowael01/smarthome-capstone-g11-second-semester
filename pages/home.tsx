import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Graph from "../components/testGraph";

export default function Home() {
  return (
    <View style={{ marginTop: 25 }}>
      <Text>home</Text>
      <View style={styles.graph}>
        <Text>Temperature</Text>
        <Graph />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  graph: {
    width: "100%",
    alignItems: "center",
    // flex: 1,
  },
});

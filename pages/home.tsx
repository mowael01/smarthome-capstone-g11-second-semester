import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import Graph from "../components/testGraph";

export default function Home() {
  return (
    <View style={{ marginTop: 25 }}>
      <Text>home</Text>
      <View style={styles.graph}>
        <ScrollView style={{ marginBottom: 40 }}>
          <Graph name="TemperatureC" unit="&deg;C" database="TemperatureC" />
          <Graph name="Humidity" unit="%" database="Humidity" />
          {/* <Graph name="gas" unit="ppm" /> */}
        </ScrollView>
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

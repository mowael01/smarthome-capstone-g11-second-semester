import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { LineChart, Grid } from "react-native-svg-charts";
import { Circle, G, Line, Rect } from "react-native-svg";

const data = [50, 10, 40, 95, 45, 60, 70, 30, 200, 170];

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.topHome}>
        <Text
          style={{
            fontSize: 20,
            color: "#2e2e2e",
            // backgroundColor: "red",
            padding: "10px",
            width: "calc(100% - 20px)",
          }}
        >
          Smart Home Feed
        </Text>
      </View>
      <LineChart
        style={{ height: 200, padding: 20 }}
        data={data}
        svg={{
          stroke: "rgb(134, 65, 244)",

          strokeWidth: 2,
        }}
        contentInset={{ top: 20, bottom: 20 }}
      >
        <Grid />
      </LineChart>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";

export default function Graph() {
  const [graph1Counter, setGraph1Counter] = React.useState(2);
  const [info, setInfo] = React.useState([
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 1 },
  ]); // the graph will show this number of readings every time

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      let random = Math.floor(Math.random() * 10) + 1;
      // Create a new array with updated data
      const updatedInfo = [...info.slice(1), { x: graph1Counter, y: random }];
      setInfo(updatedInfo);
      setGraph1Counter((prevCounter) => prevCounter + 1);
    }, 1000); // Changed to 1000 milliseconds for 1 second intervals

    // Cleanup function to clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [graph1Counter, info]);

  return (
    <View style={styles.container}>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc" },
          }}
          data={info}
        />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
});

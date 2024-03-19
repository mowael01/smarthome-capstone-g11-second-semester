import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Background } from "victory";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  LineSegment,
} from "victory-native";

export default function Graph(props) {
  const [graph1Counter, setGraph1Counter] = React.useState(2);
  const [info, setInfo] = React.useState([
    { x: 0, y: 0 }, //0
    { x: 1, y: 1 }, //1
    { x: 1, y: 1 }, //2
    { x: 1, y: 1 }, //3
    { x: 1, y: 1 }, //4
    { x: 1, y: 1 }, //5
    { x: 1, y: 1 }, //6
    { x: 1, y: 1 }, //7
    { x: 1, y: 1 }, //8
  ]); // the graph will show this number of readings every time

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      let random = Math.floor(Math.random() * 10) + 1;
      // Create a new array with updated data
      let updatedInfo = [...info.slice(1), { x: 9, y: random }];
      updatedInfo.map((info) => {
        {
          info.x--;
          return info;
        }
      });
      setInfo(updatedInfo);
      setGraph1Counter((prevCounter) =>
        prevCounter >= 8 ? 0 : prevCounter + 1
      );
    }, 1000); // Changed to 1000 milliseconds for 1 second intervals

    // Cleanup function to clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [graph1Counter, info]);

  return (
    <View style={styles.container}>
      <View style={{}}>
        <VictoryChart
          style={{
            parent: {
              backgroundColor: "#eee",
              padding: 0,
              height: 50,
              display: "flex",
            },
          }}
          theme={VictoryTheme.material}
        >
          <View
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 30 }}>{props.name}</Text>
          </View>
          <VictoryLine
            domain={{ y: [0, 11], x: [0, 10] }}
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "3px solid #727272" },
            }}
            data={info}
            interpolation={"natural"}
            labels={({ datum }) => datum.y}
          />
          <VictoryAxis
            dependentAxis
            style={{ grid: { stroke: "transparent" } }}
          />
          <VictoryAxis
            orientation="bottom"
            style={{
              // axis: { stroke: "transparent" },
              ticks: { stroke: "transparent" },
              tickLabels: { fill: "transparent" },
              grid: { stroke: "transparent" },
            }}
          />
          <View
            style={{
              marginTop: "75%",
              marginStart: 5,
              marginEnd: 5,
              alignItems: "flex-start",
            }}
          >
            <View>
              <Text style={{ fontSize: 15 }}>
                Current {props.name}: {info[8].y}
                {props.unit}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 15 }}>
                Average {props.name} :{" "}
                {(
                  info.reduce((acc, cur) => acc + cur.y, 0) / info.length
                ).toFixed(2)}
                {props.unit}
              </Text>
            </View>
          </View>
        </VictoryChart>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

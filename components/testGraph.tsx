import React, { Suspense } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";
import { ref, onValue, getDatabase } from "firebase/database";
import { Database } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
export default function Graph(props) {
  const userEmail = getAuth().currentUser.email.slice(0, -4);
  const [graph1Counter, setGraph1Counter] = React.useState(2);
  const [info, setInfo] = React.useState([
    { x: 0, y: 1 }, //0
    { x: 1, y: 1 }, //1
    { x: 2, y: 1 }, //2
    { x: 3, y: 1 }, //3
    { x: 4, y: 1 }, //4
    { x: 5, y: 1 }, //5
    { x: 6, y: 1 }, //6
    { x: 7, y: 1 }, //7
    { x: 8, y: 1 }, //8
  ]); // the graph will show this number of readings every time

  React.useEffect(() => {
    const starCountRef = ref(getDatabase(), "/test/TemperatureC"); // userEmail + "/homeData/" + props.database
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      let updatedInfo = [...info.slice(1), { x: 9, y: data }];
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
    });
  }, []);

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
            domain={{ y: [0, 40], x: [0, 10] }}
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

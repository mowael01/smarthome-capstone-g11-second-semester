import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryAxis
} from "victory-native";
import { ref, get } from "firebase/database";
import { Database } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import * as Notifications from "expo-notifications";
export default function Graph(props) {
  async function sendPushNotification(title, body) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: { data: "goes here" }
      },
      trigger: null
    });
  }
  // sendPushNotification("hi", "all is right");
  // const userEmail = getAuth().currentUser.email.slice(0, -4);
  const [info, setInfo] = React.useState([
    { x: 0, y: 1 }, //0
    { x: 1, y: 1 }, //1
    { x: 2, y: 1 }, //2
    { x: 3, y: 1 }, //3
    { x: 4, y: 1 }, //4
    { x: 5, y: 1 } //5
  ]); // the graph will show this number of readings every time
  const [maxValue, setMaxValue] = React.useState(10);
  const [minValue, setMinValue] = React.useState(0);
  const dataRef = ref(Database, "/test/" + props.database); // userEmail + "/homeData/" + props.database
  // getting the data from the database every 1 second
  React.useEffect(() => {
    setTimeout(async () => {
      get(dataRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
      const data = await get(dataRef);
      if (data.exists()) {
        console.log(data.val());
      } else {
        console.log("No data available");
      }
      // Create a new array with updated data
      let updatedInfo = [...info.slice(1), { x: 6, y: data.val() }];

      updatedInfo = updatedInfo.map((info) => {
        {
          info.x--;
          return info;
        }
      });
      console.log("====================================");
      console.log(updatedInfo);
      console.log("====================================");
      const max = info.reduce((prevE, CurrE) => {
        return { x: 0, y: Math.max(prevE.y, CurrE.y) };
      });
      setMaxValue(
        info.reduce((prevE, CurrE) => {
          return { x: 0, y: Math.max(prevE.y, CurrE.y) };
        }).y
      );
      setMinValue(
        info.reduce((prevE, CurrE) => {
          return { x: 0, y: Math.min(prevE.y, CurrE.y) };
        }).y
      );
      setInfo(updatedInfo);
      if (updatedInfo[5].y > props.maximumValue) {
        sendPushNotification(
          props.maximumValueMessage.title,
          props.maximumValueMessage.body
        );
      }
    }, 1000); // Changed to 1000 milliseconds for 1 second intervals
  }, [info]);
  return (
    <View style={styles.container}>
      <View style={{}}>
        <VictoryChart
          style={{
            parent: {
              backgroundColor: "#eee",
              padding: 10,
              height: 50,
              display: "flex"
            }
          }}
          theme={VictoryTheme.material}
        >
          <View
            style={{
              width: "100%",
              alignItems: "center"
            }}
          >
            <Text style={{ fontSize: 30 }}>{props.name}</Text>
          </View>
          <VictoryLine
            domain={{
              y: [minValue - minValue * 0.1, maxValue + maxValue * 0.1],
              x: [0, 7]
            }}
            style={{
              data: { stroke: "#c43a31" }
              // parent: { border: "3px solid #727272" },
            }}
            data={info}
            // interpolation={"natural"}
            labels={({ datum }) => datum.y.toFixed(1)}
            // animate={{
            //   duration: 2000,
            //   onLoad: { duration: 1000 }
            // }}
          />
          <VictoryAxis
            dependentAxis
            style={{ grid: { stroke: "transparent", zIndex: -1 } }}
          />
          <VictoryAxis
            orientation="bottom"
            style={{
              // axis: { stroke: "transparent" },
              ticks: { stroke: "transparent" },
              tickLabels: { fill: "transparent" },
              grid: { stroke: "transparent" }
            }}
          />
          <View
            style={{
              marginTop: "75%",
              marginStart: 5,
              marginEnd: 5,
              alignItems: "flex-start"
            }}
          >
            <View>
              <Text style={{ fontSize: 15 }}>
                Current {props.name}: {info[5].y}
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
    alignItems: "center"
  }
});

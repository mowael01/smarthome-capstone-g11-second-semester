import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryArea,
  VictoryGroup
} from "victory-native";
import { ref, get } from "firebase/database";
import { Database } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import * as Notifications from "expo-notifications";


export default function ComparativeGraph(props) {
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
  const [current, setCurrent] = React.useState({})
  const [day, setDay] = React.useState([
    { x: 0, y: 1 }, //0
    { x: 1, y: 1 }, //1
    { x: 2, y: 1 }, //2
    { x: 3, y: 1 }, //3
    { x: 4, y: 1 }, //4
    { x: 5, y: 1 } //5
  ])
  const [week, setWeek] = React.useState({})
  const [month, setMonth] = React.useState({})
  const [year, setyear] = React.useState({})

  const [info, setInfo] = React.useState([
    { x: 0, y: 1 }, //0
    { x: 1, y: 1 }, //1
    { x: 2, y: 1 }, //2
    { x: 3, y: 1 }, //3
    { x: 4, y: 1 }, //4
    { x: 5, y: 1 } //5
  ]); // the graph will show this number of readings every time
  // const [maxValue, setMaxValue] = React.useState(10);
  // const [minValue, setMinValue] = React.useState(0);
  const dataRef = ref(Database, "/devices/abc123/gas/day"); // userEmail + "/homeData/" + props.database
  React.useEffect(() => {
    get(dataRef).then(data => {
      const newD = Object.keys(data.val()).map(key => {
        return { x: +key, y: data.val()[key] }
      });
      console.log(newD);

      setInfo(newD);
    })
    fetch(
      "https://api.weatherapi.com/v1/forecast.json?key=4b9054e1f4214ea9913140905242504&q=cairo&days=7&aqi=no&alerts=no"
    )
      .then(data => data.json())
      .then(data => {
        setCurrent(data.current);
        setDay(data.forecast.forecastday[0].hour.map(ele => {
          return ({ x: +ele.time.slice(-5, -3), y: ele.temp_c }) //[ele.time.slice(-5),ele]
        }));
        console.log(`day:`);
        console.log(day);


        setWeek({})
      })

  }, [])
  return (
    <View style={[styles.container, { overflow: "hidden" }]}>
      <View style={{}}>
        <VictoryChart
          style={{
            parent: {
              backgroundColor: "#eee",
              padding: 10,
              display: "flex"
            }
          }}
          containerComponent={<VictoryVoronoiContainer />}
          theme={VictoryTheme.material}
          height={300}
          // width={400}
          padding={35}
          animate={{ duration: 1000 }}
        >



          <VictoryArea
            labelComponent={<VictoryTooltip />}
            domain={{
              y: [0, 40],
              x: [0, 23]
            }}
            style={{
              data: { fill: "#0000F5", stroke: "#0000F5", strokeWidth: 3, fillOpacity: 0.4 }
              // parent: { border: "3px solid #727272" },
            }}
            data={info}
            interpolation={"natural"}
          // labels={({ datum }) => datum.y.toFixed(1)}
          // animate={{
          //   duration: 2000,
          //   onLoad: { duration: 1000 }
          // }}
          />
          <VictoryArea
            style={{
              data: { fill: "#004DF5", stroke: "#004DF5", strokeWidth: 3, fillOpacity: 0.4 }
            }} data={day} />
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: "blue" },
              ticks: { stroke: "blue" },
              tickLabels: { fill: "blue" },
              grid: { stroke: "transparent" },

            }}
            tickCount={10}
          />
          <VictoryAxis
            orientation="bottom"
            style={{
              axis: { stroke: "blue" },
              ticks: { stroke: "blue" },
              tickLabels: { fill: "blue" },
              grid: { stroke: "transparent" },

            }}
            // label={}
            tickCount={12}
          />



        </VictoryChart>
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

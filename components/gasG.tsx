import React from "react";
import {
  CartesianChart,
  type ChartBounds,
  type PointsArray,
  useAreaPath,
  useChartPressState,
  useLinePath,
} from "victory-native";
import {
  Circle,
  Group,
  Line as SkiaLine,
  LinearGradient,
  Path,
  Text as SkiaText,
  useFont,
  vec,
  AnimatedProp,
} from "@shopify/react-native-skia";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  type TextStyle,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import {
  type SharedValue,
  useDerivedValue,
} from "react-native-reanimated";

import { ref, get, onValue } from "firebase/database";
import { Database } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import * as Notifications from "expo-notifications";



export default function ComparativeGraph(props) {
  const font = useFont(require("../assets/fonts/Nunito-Italic-VariableFont_wght.ttf"), 12)
  const { state: firstTouch, isActive: isFirstPressActive } =
    useChartPressState({ x: 0, y: { y: 0, z: 0 } });

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
  const [activeBtn, setActiveBtn] = React.useState("day")
  const [current, setCurrent] = React.useState([
    { x: 0, y: 1, z: 0 }, //0
    { x: 1, y: 1, z: 0 }, //1
    { x: 2, y: 1, z: 0 }, //2
    { x: 3, y: 1, z: 0 }, //3
    { x: 4, y: 1, z: 0 }, //4
    { x: 5, y: 1, z: 0 } //5
  ])
  const [day, setDay] = React.useState([
    { x: 0, y: 1 }, //0
    { x: 1, y: 1 }, //1
    { x: 2, y: 1 }, //2
    { x: 3, y: 1 }, //3
    { x: 4, y: 1 }, //4
    { x: 5, y: 1 } //5
  ])
  const [week, setWeek] = React.useState([
    { x: 0, y: 1 }, //0
    { x: 1, y: 1 }, //1
    { x: 2, y: 1 }, //2
    { x: 3, y: 1 }, //3
    { x: 4, y: 1 }, //4
    { x: 5, y: 1 } //5
  ])
  const [dataDay, setDataDay] = React.useState([])
  // const [dataWeek, setDataWeek] = React.useState([])
  const [info, setInfo] = React.useState([
    { x: 0, y: 1, z: 2 }, //0
    { x: 1, y: 1, z: 2 }, //1
    { x: 2, y: 1, z: 2 }, //2
    { x: 3, y: 1, z: 2 }, //3
    { x: 4, y: 1, z: 2 }, //4
    { x: 5, y: 1, z: 2 }, //5
    { x: 6, y: 1, z: 2 }, //0
    { x: 7, y: 1, z: 2 }, //1
    { x: 8, y: 1, z: 2 }, //2
    { x: 9, y: 1, z: 2 }, //3
    { x: 10, y: 1, z: 2 }, //4
    { x: 11, y: 1, z: 2 }, //5
    { x: 12, y: 1, z: 2 }, //0
    { x: 13, y: 1, z: 2 }, //1
    { x: 14, y: 1, z: 2 }, //2
    { x: 15, y: 1, z: 2 }, //3
    { x: 16, y: 1, z: 2 }, //4
    { x: 17, y: 1, z: 2 }, //5
    { x: 18, y: 1, z: 2 }, //0
    { x: 19, y: 1, z: 2 }, //1
    { x: 20, y: 1, z: 2 }, //2
    { x: 21, y: 1, z: 2 }, //3
    { x: 22, y: 1, z: 2 }, //4
    { x: 23, y: 1, z: 2 }, //5


  ]);
  const [graphDomain, setGraphDomain] = React.useState({ y: [0, 1000], x: [0, 23] })
  const [graphTickCount, setGraphTickCount] = React.useState({ x: 6, y: 10 })
  // @ts-ignore
  const dataRef = ref(Database, "/devices/abc123/gas/day"); // userEmail + "/homeData/" + props.database
  React.useEffect(() => {
    get(dataRef)
      .then(data => {
        let newD = Object.keys(data.val()).map(key => {
          return { x: +key, y: data.val()[key] }
        });
        newD = newD.sort((a, b) => a.x - b.x)
        console.log(newD);
        // setInfo(newD);
        setDataDay(newD)
        return newD
      })
      .then((newD) => {
        fetch(
          "https://api.weatherapi.com/v1/forecast.json?key=4b9054e1f4214ea9913140905242504&q=cairo&days=7&aqi=no&alerts=no"
        )
          .then(data => data.json())
          .then(data => {
            // setCurrent(data.current);
            const newDay = data.forecast.forecastday[0].hour.map(ele => {
              return ({ x: +ele.time.slice(-5, -3), y: +ele.temp_c }) //[ele.time.slice(-5),ele]
            });
            setDay(newDay);
            const newInfo = info.map((ele, index) => {
              return { x: ele.x, y: +newD[index].y, z: newDay[index].y }
            });
            console.log("test" + newInfo);

            setInfo(newInfo)
            console.log(`day:`);
            console.log(newInfo);
            const newWeek = data.forecast.forecastday.map(ele => {
              return ({ x: +ele.date.slice(-2), y: ele.day.avgtemp_c }) //[ele.time.slice(-5),ele]
            });
            setWeek(newWeek)
          })
      })
  }, [])

  React.useEffect(() => {
    setTimeout(async () => {
      // @ts-ignore
      const data = await get(ref(Database, "/devices/abc123/gas/current"));
      // if (data.exists()) {
      //   console.log(data.val());
      // } else {
      //   console.log("No data available");
      // }
      // Create a new array with updated data
      let updatedInfo = [...current.slice(1), { x: 6, y: data.val(), z: 0 }];

      updatedInfo = updatedInfo.map((info) => {
        {
          info.x--;
          return info;
        }
      });
      // console.log("====================================");
      // console.log(updatedInfo);
      // console.log("====================================");
      setCurrent(updatedInfo);
      if (updatedInfo[5].y > props.maximumValue) {
        sendPushNotification(
          props.maximumValueMessage.title,
          props.maximumValueMessage.body
        );
      }
    }, 1000); // Changed to 1000 milliseconds for 1 second intervals
  }, [current]);

  return (
    <SafeAreaView style={styles.scrollView}>
      <View style={{ flex: 2, maxHeight: 250, marginBottom: 20, padding: 10 }}>
        <CartesianChart
          data={activeBtn === "now" ? current : info}
          // @ts-ignore
          domain={graphDomain}
          xKey="x"
          yKeys={["y", "z"]}
          chartPressState={[firstTouch]}
          axisOptions={{
            font,
            tickCount: graphTickCount,
            lineColor: "#d4d4d8",
            formatXLabel(label) {
              const minutes = ((+label % 1) * 60).toFixed(0);
              const formattedMinutes = minutes.toString().padStart(2, "0");
              const formattedHour = Math.floor(+label).toString().padStart(2, "0");

              return activeBtn === "day" ? `${formattedHour}:${formattedMinutes}` : activeBtn === "now" ? "" : label.toString();
            },
            // labelColor: "red",
          }}
          renderOutside={({ chartBounds }) => (
            <>
              {isFirstPressActive ? <ActiveValueIndicator
                xPosition={firstTouch.x.position}
                yPosition={firstTouch.y.y.position}
                zPosition={firstTouch.y.z.position}
                bottom={chartBounds.bottom}
                top={chartBounds.top}
                activeValueY={firstTouch.y.y.value}
                activeValueZ={firstTouch.y.z.value}
                valueX={firstTouch.x}
                textColor={"red"}
                lineColor={"#F0ED00"}
                // @ts-ignore
                indicatorColor={"#F0ED00"}
              /> : ""}
            </>
          )}
        >
          {({ chartBounds, points }) => (
            <>
              <CustomArea
                color="#1E2F3F"
                points={points.z}
                startX={firstTouch.x.position}
                {...chartBounds}

              />
              <CustomArea
                color="#0005DB"
                points={points.y}
                startX={firstTouch.x.position}
                {...chartBounds}
              />

            </>
          )}
        </CartesianChart>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => {
            setActiveBtn("now");
            const newInfo = day.map((ele, index) => {
              return index < day.length ? { x: day[index].x, y: dataDay[index].y, z: day[index].y } : null
            })
            setInfo(newInfo);
            setGraphDomain({ y: [0, 1000], x: [0, 7] })
            setGraphTickCount({ x: 5, y: 10 })
          }}

          style={[styles.buttonElement, { backgroundColor: activeBtn === "now" ? "#155694" : "white", }]}>
          <Text style={{ color: activeBtn === "now" ? "white" : "black", }}>
            now
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActiveBtn("day");
            const newInfo = day.map((ele, index) => {
              return index < day.length ? { x: ele.x, y: dataDay[index].y, z: ele.y } : null
            })
            setInfo(newInfo);
            setGraphDomain({ y: [0, 1000], x: [0, 23] })
            // setGraphTickCount({ x: 6, y: 10 })
          }}
          style={[styles.buttonElement, { backgroundColor: activeBtn === "day" ? "#155694" : "white", }]}>
          <Text style={{ color: activeBtn === "day" ? "white" : "black", }}>
            day
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setActiveBtn("week");
          const newInfo = info.map((ele, index) => {
            return index < week.length ? { x: week[index].x, y: dataDay[index].y, z: week[index].y } : null
          }).slice(0, week.length);
          setInfo(newInfo);
          setGraphDomain({ y: [0, 1000], x: [newInfo[0].x, newInfo[newInfo.length - 1].x] })
          setGraphTickCount({ x: 7, y: 10 })
        }}
          style={[styles.buttonElement, { backgroundColor: activeBtn === "week" ? "#155694" : "white", }]}>
          <Text style={{ color: activeBtn === "week" ? "white" : "black", }}>
            week
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>
          Avg Temperature inside: {
            day.reduce((accumulator, current, index) => {
              // console.log(accumulator);
              if (index === 0) {
                return current.y;
              } else {
                return (accumulator + current.y) / 2;
              }
            }, 0).toFixed(2)
          }&deg;C
        </Text>
      </View>
    </SafeAreaView>
  );
}

/**
 * Show the line/area chart for the stock price, taking into account press state.
 */
const CustomArea = ({
  points,
  top,
  bottom,
  color
}: {
  color: AnimatedProp<String>;
  points: PointsArray;
  startX: SharedValue<number>;
} & ChartBounds) => {
  const { path: areaPath } = useAreaPath(points, bottom, { curveType: "natural" });
  const { path: linePath } = useLinePath(points, { curveType: "natural" });

  return (
    <>
      {/* Base */}
      <Group>
        <Path path={areaPath} style="fill" >
          <LinearGradient
            start={vec(0, 0)}
            end={vec(top, bottom)}
            // @ts-ignore
            colors={[color, color + "33"]}

          />
        </Path>
        <Path
          path={linePath}
          style="stroke"
          strokeWidth={2}
          // @ts-ignore
          color={
            color
          }
        />
      </Group>
    </>
  );
};

const ActiveValueIndicator = ({
  xPosition,
  yPosition,
  zPosition,
  top,
  bottom,
  valueX,
  activeValueY,
  activeValueZ,
  textColor,
  lineColor,
  indicatorColor,
  topOffset = 0,
}: {
  xPosition: SharedValue<number>;
  yPosition: SharedValue<number>;
  zPosition: SharedValue<number>;
  valueX: any;
  activeValueY: SharedValue<number>;
  activeValueZ: SharedValue<number>;
  bottom: number;
  top: number;
  textColor: string;
  lineColor: string;
  indicatorColor: SharedValue<string>;
  topOffset?: number;
}) => {
  const FONT_SIZE = 16;
  const font = useFont(require("../assets/fonts/Nunito-Italic-VariableFont_wght.ttf"), 12)
  const start = useDerivedValue(() => vec(xPosition.value, bottom));
  const end = useDerivedValue(() =>
    vec(xPosition.value, top + 1.5 * FONT_SIZE + topOffset),
  );

  // Text label
  const activeValueDisplay = useDerivedValue(
    () => `Inside: ${activeValueY.value.toFixed(2)}C, Outside: ${activeValueZ.value.toFixed(2)} at ${xPosition.value}:00`,
  );
  const activeValueWidth = useDerivedValue(
    () => font?.getTextWidth(activeValueDisplay.value) || 0,
  );

  const activeValueX = useDerivedValue(
    () => xPosition.value - activeValueWidth.value / 2,
  );



  return (
    <>
      <SkiaLine p1={start} p2={end} color={lineColor} strokeWidth={1} />
      <Circle cx={xPosition} cy={yPosition} r={6} color={indicatorColor} />
      <Circle
        cx={xPosition}
        cy={yPosition}
        r={4}
        color="hsla(0, 0, 100%, 0.25)"
      />
      <Circle cx={xPosition} cy={zPosition} r={6} color={indicatorColor} />
      <Circle
        cx={xPosition}
        cy={zPosition}
        r={4}
        color="hsla(0, 0, 100%, 0.25)"
      />
      <SkiaText
        color={textColor}
        font={font}
        text={activeValueDisplay}
        x={65}
        y={top + FONT_SIZE + topOffset}
      />
    </>
  );
};


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
    flex: 1,
  },
  buttons: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  buttonElement: {
    width: 100,
    height: 30,
    backgroundColor: "white",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#312BE0",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  buttonElementText: {
    // color: "black"
  }
});

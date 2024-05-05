// import React from "react";
// import {
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   type TextStyle,
//   View,
// } from "react-native"; import {
//   CartesianChart,
//   type ChartBounds,
//   type PointsArray,
//   useAreaPath,
//   useChartPressState,
//   useLinePath,
// } from "victory-native"; import { ref, get } from "firebase/database";
// import { Database } from "../firebaseConfig";
// import { getAuth } from "firebase/auth";
// import * as Notifications from "expo-notifications";
// import {
//   Circle,
//   Group,
//   Line as SkiaLine,
//   LinearGradient,
//   Path,
//   Skia,
//   Text as SkiaText,
//   useFont,
//   vec,
// } from "@shopify/react-native-skia";
// import {
//   type SharedValue,
//   useAnimatedStyle,
//   useDerivedValue,
// } from "react-native-reanimated";



// export default function ComparativeGraph(props) {
//   async function sendPushNotification(title, body) {
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: title,
//         body: body,
//         data: { data: "goes here" }
//       },
//       trigger: null
//     });
//   }
//   const [current, setCurrent] = React.useState({})
//   const [day, setDay] = React.useState([
//     { x: 0, y: 1 }, //0
//     { x: 1, y: 1 }, //1
//     { x: 2, y: 1 }, //2
//     { x: 3, y: 1 }, //3
//     { x: 4, y: 1 }, //4
//     { x: 5, y: 1 } //5
//   ])
//   const [week, setWeek] = React.useState({})
//   const [month, setMonth] = React.useState({})
//   const [year, setyear] = React.useState({})

//   const [info, setInfo] = React.useState([
//     { x: 0, y: 1 }, //0
//     { x: 1, y: 1 }, //1
//     { x: 2, y: 1 }, //2
//     { x: 3, y: 1 }, //3
//     { x: 4, y: 1 }, //4
//     { x: 5, y: 1 } //5
//   ]);
//   const { state, isActive } = useChartPressState({ x: 0, y: { y: 0 } });
//   const font = useFont(require("../assets/fonts/Nunito-Italic-VariableFont_wght.ttf"), 12)
//   const { state: firstTouch, isActive: isFirstPressActive } =
//     useChartPressState({ x: 0, y: { y: 0 } });
//   const { state: secondTouch, isActive: isSecondPressActive } =
//     useChartPressState({ x: 0, y: { y: 0 } });

//   // @ts-ignore
//   const dataRef = ref(Database, "/devices/abc123/gas/day"); // userEmail + "/homeData/" + props.database
//   React.useEffect(() => {
//     get(dataRef).then(data => {
//       const newD = Object.keys(data.val()).map(key => {
//         return { x: +key, y: data.val()[key] }
//       });
//       console.log(newD);

//       setInfo(newD);
//     })
//     fetch(
//       "https://api.weatherapi.com/v1/forecast.json?key=4b9054e1f4214ea9913140905242504&q=cairo&days=7&aqi=no&alerts=no"
//     )
//       .then(data => data.json())
//       .then(data => {
//         setCurrent(data.current);
//         setDay(data.forecast.forecastday[0].hour.map(ele => {
//           return ({ x: +ele.time.slice(-5, -3), y: ele.temp_c }) //[ele.time.slice(-5),ele]
//         }));
//         console.log(`day:`);
//         console.log(day);


//         setWeek({})
//       })

//   }, [])
//   // const DATA = Array.from({ length: 31 }, (_, i) => ({
//   //   day: i,
//   //   highTmp: 40 + 30 * Math.random(),
//   // }));

//   return (
//     <View style={[styles.container, { overflow: "hidden", height: 300 }]}>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//   }
// });
/////////////////////////////////////////////////////////////////////////////////////////////
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
  Skia,
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
} from "react-native";
import {
  type SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

import { ref, get } from "firebase/database";
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


  // @ts-ignore
  const dataRef = ref(Database, "/devices/abc123/gas/day"); // userEmail + "/homeData/" + props.database
  React.useEffect(() => {
    get(dataRef).then(data => {
      const newD = Object.keys(data.val()).map(key => {
        return { x: +key, y: data.val()[key] }
      });
      console.log(newD);

      // setInfo(newD);
      return newD.sort((a, b) => a.x - b.x);
    }).then((newD) => {
      fetch(
        "https://api.weatherapi.com/v1/forecast.json?key=4b9054e1f4214ea9913140905242504&q=cairo&days=7&aqi=no&alerts=no"
      )
        .then(data => data.json())
        .then(data => {
          setCurrent(data.current);
          setDay(data.forecast.forecastday[0].hour.map(ele => {
            return ({ x: +ele.time.slice(-5, -3), y: ele.temp_c }) //[ele.time.slice(-5),ele]
          }));
          const newInfo = info.map((ele, index) => {
            return { x: ele.x, y: +newD[index].y, z: +data.forecast.forecastday[0].hour[index].temp_c }
          });
          console.log("test" + newInfo);

          setInfo(newInfo)
          console.log(`day:`);
          console.log(info);

          setWeek({})
        })
    })
  }, [])



  return (
    <SafeAreaView style={styles.scrollView}>
      <View style={{ flex: 2, maxHeight: 250, marginBottom: 20, padding: 10 }}>
        <CartesianChart
          data={info}
          domain={{ y: [0, 40], x: [0, 23] }}
          xKey="x"
          yKeys={["y", "z"]}
          chartPressState={[firstTouch]}
          // curve="natural"
          axisOptions={{
            font,
            tickCount: { x: 12, y: 10 },
            lineColor: "#d4d4d8",
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
                color="#3B5970"
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
  optionsScrollView: {
    flex: 1,
    backgroundColor: "white",
  },
  options: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});

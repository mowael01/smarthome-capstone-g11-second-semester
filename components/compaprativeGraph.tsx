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

// import { useDarkMode } from "react-native-dark";
// import * as Haptics from "expo-haptics";
// import inter from "../assets/inter-medium.ttf";
// import { AnimatedText } from "../components/AnimatedText";
// import { appColors } from "./consts/colors";
// import data from "../data/stockprice/tesla_stock.json";
// import { InfoCard } from "../components/InfoCard";
// import { descriptionForRoute } from "./consts/routes";


export default function ComparativeGraph(props) {
  const font = useFont(require("../assets/fonts/Nunito-Italic-VariableFont_wght.ttf"), 12)
  const { state: firstTouch, isActive: isFirstPressActive } =
    useChartPressState({ x: 0, y: { y: 0 } });
  const { state: secondTouch, isActive: isSecondPressActive } =
    useChartPressState({ x: 0, y: { y: 0 } });

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
    { x: 0, y: 1 }, //0
    { x: 1, y: 1 }, //1
    { x: 2, y: 1 }, //2
    { x: 3, y: 1 }, //3
    { x: 4, y: 1 }, //4
    { x: 5, y: 1 } //5
  ]);


  // @ts-ignore
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
    <SafeAreaView style={styles.scrollView}>
      <View style={{ flex: 2, maxHeight: 250, marginBottom: 20, padding: 10 }}>
        <CartesianChart
          data={info}
          domain={{ y: [0, 40], x: [0, 23] }}
          xKey="x"
          yKeys={["y"]}
          chartPressState={[firstTouch, secondTouch]}
          curve="linear"
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
                bottom={chartBounds.bottom}
                top={chartBounds.top}
                activeValue={firstTouch.y.y.value}
                textColor={"red"}
                lineColor={"#d4d4d8"}
                // @ts-ignore
                indicatorColor={"#085408"}
              /> : ""}
            </>
          )}
        >
          {({ chartBounds, points }) => (
            <>
              <StockArea
                points={points.y}
                isWindowActive={isFirstPressActive && isSecondPressActive}
                startX={firstTouch.x.position}
                endX={secondTouch.x.position}
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
const StockArea = ({
  points,
  isWindowActive,
  startX,
  endX,
  left,
  right,
  top,
  bottom,
}: {
  points: PointsArray;
  isWindowActive: boolean;
  startX: SharedValue<number>;
  endX: SharedValue<number>;
} & ChartBounds) => {
  const { path: areaPath } = useAreaPath(points, bottom);
  const { path: linePath } = useLinePath(points);

  const backgroundClip = useDerivedValue(() => {
    const path = Skia.Path.Make();

    if (isWindowActive) {
      path.addRect(Skia.XYWHRect(left, top, startX.value - left, bottom - top));
      path.addRect(
        Skia.XYWHRect(endX.value, top, right - endX.value, bottom - top),
      );
    } else {
      path.addRect(Skia.XYWHRect(left, top, right - left, bottom - top));
    }

    return path;
  });

  const windowClip = useDerivedValue(() => {
    if (!isWindowActive) return Skia.Path.Make();

    const path = Skia.Path.Make();
    path.addRect(
      Skia.XYWHRect(startX.value, top, endX.value - startX.value, bottom - top),
    );
    return path;
  });

  const gradColors = "#ff0000"

  const windowLineColor = "#00ff00"

  return (
    <>
      {/* Base */}
      <Group clip={backgroundClip} opacity={isWindowActive ? 0.3 : 1}>
        <Path path={areaPath} style="fill">
          <LinearGradient
            start={vec(0, 0)}
            end={vec(top, bottom)}
            colors={["#ff0000", "#ff000033"]}

          />
        </Path>
        <Path
          path={linePath}
          style="stroke"
          strokeWidth={2}
          color={
            "red"
          }
        />
      </Group>
    </>
  );
};

const ActiveValueIndicator = ({
  xPosition,
  yPosition,
  top,
  bottom,
  activeValue,
  textColor,
  lineColor,
  indicatorColor,
  topOffset = 0,
}: {
  xPosition: SharedValue<number>;
  yPosition: SharedValue<number>;
  activeValue: SharedValue<number>;
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
    () => activeValue.value.toFixed(2) + ` C`,
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
      <Circle cx={xPosition} cy={yPosition} r={10} color={indicatorColor} />
      <Circle
        cx={xPosition}
        cy={yPosition}
        r={8}
        color="hsla(0, 0, 100%, 0.25)"
      />
      <SkiaText
        color={textColor}
        font={font}
        text={activeValueDisplay}
        x={activeValueX}
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

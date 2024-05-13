import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Database } from "../firebaseConfig";
import * as Notifications from "expo-notifications";

import { get, ref } from "firebase/database";

const Data = (props) => {
  async function sendPushNotification(title, body) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: { data: "goes here" },
      },
      trigger: null,
    });
  }
  const [avg, setAvg] = React.useState(0);
  const [info, setInfo] = React.useState([
    { x: 0, y: 1 }, //0
    { x: 1, y: 1 }, //1
    { x: 2, y: 1 }, //2
    { x: 3, y: 1 }, //3
    { x: 4, y: 1 }, //4
    { x: 5, y: 1 }, //5
  ]); // the data component will take the average of the lst 6 readings
  // @ts-ignore
  const dataRef = ref(Database, "/devices/abc123/" + props.database + "/current"); // userEmail + "/homeData/" + props.database
  // getting the data from the database every 1 second
  React.useEffect(() => {
    setTimeout(async () => {
      const data = await get(dataRef);
      // Create a new array with updated data
      if (data.exists()) {
        let updatedInfo = [...info.slice(1), { x: 6, y: data.val() }];
        updatedInfo = updatedInfo.map((info) => {
          {
            info.x--;
            return info;
          }
        });

        setInfo(updatedInfo);
        // console.log(`info: ${updatedInfo.map((x) => x.y)}`);

        setAvg(
          updatedInfo.reduce((accumulator, current, index) => {
            // console.log(accumulator);
            if (index === 0) {
              return current.y;
            } else {
              return (accumulator + current.y) / 2;
            }
          }, 0)
        );
        // console.log(`avg: ${avg}`);
        if (updatedInfo[5].y > props.maximumValue) {
          sendPushNotification(
            props.maximumValueMessage.title,
            props.maximumValueMessage.body
          );
        }
      } else {
        console.log("Data not found");

      }
    }, 1000); // Changed to 1000 milliseconds for 1 second intervals
  }, [info]);
  return (
    <View style={styles.summaryElement}>
      <Text
        style={{
          padding: 5,
          color: "white",
          fontSize: 25,
        }}
      >
        {avg < 100 ? avg.toFixed(2) : avg.toFixed(0)}
        {props.unit}
      </Text>
      <Text style={{ color: "white" }}>{props.text}</Text>
    </View>
  );
};

export default function Home({ navigation }) {
  const [OTemperature, setOTemperature] = React.useState(0);
  const temperature = 0;
  const [OHumi, setOHumi] = React.useState(0);
  fetch(
    "http://api.weatherapi.com/v1/current.json?key=4b9054e1f4214ea9913140905242504&q=cairo&aqi=no"
  )
    .then((data) => data.json())
    .then((data) => {
      setOTemperature(data.current.temp_c);
      setOHumi(data.current.humidity);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <SafeAreaView style={{ marginTop: 25, alignItems: "center" }}>
      <View style={styles.sectionContainer}>
        <Text style={{ color: "#155693", fontSize: 20, marginBottom: 5 }}>
          Summary
        </Text>
        <View
          style={{
            width: 310,
            height: 300,
            backgroundColor: "#cccccc",
            borderRadius: 15,
            overflow: "hidden",
            justifyContent: "space-between",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <Data
            text={"Avg House Temp"}
            maximumValue={35}
            maximumValueMessage={{
              title: "High Temperature Detected 🔥🔥",
              body: "Please Take action"
            }}
            database="temperature"
          />
          <View style={styles.summaryElement}>
            <Text
              style={{
                padding: 5,
                color: "white",
                fontSize: 25,
              }}
            >
              {OTemperature}&deg;C
            </Text>
            <Text style={{ color: "white" }}>Outside Temp</Text>
          </View>
          <Data
            text="Avg House Humidity"
            maximumValue={75}
            maximumValueMessage={{
              title: "High Humidity Detected 💦💦",
              body: "Please Take action"
            }}
            database="humidity"
            unit="%"
          />
          <View style={styles.summaryElement}>
            <Text
              style={{
                padding: 5,
                color: "white",
                fontSize: 25,
              }}
            >
              {OHumi} %
            </Text>
            <Text style={{ color: "white" }}>Ouside Humidity</Text>
          </View>
          <Data
            text="Gas conc"
            maximumValue={200}
            maximumValueMessage={{
              title: "High Gas Concentration Detected 🚨🚨",
              body: "Please Take action"
            }}
            database="gas"
            unit="ppm"
          />
          <Data
            text="Outside Luminosity"
            database="light"
            unit=" Lux"
          />
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={{ color: "#155693", fontSize: 20, marginBottom: 5 }}>
          Features
        </Text>
        <View
          style={{
            width: 310,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Temperature");
            }}
            style={styles.featuresElement}
          >
            <Text style={styles.featuresElementText}>Temperature</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.featuresElement} onPress={() => {
              navigation.navigate("Humidity");
            }}>
            <Text style={styles.featuresElementText}>Humidity</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.featuresElement}
            onPress={() => {
              navigation.navigate("Gas");
            }}>
            <Text style={styles.featuresElementText}>Gas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.featuresElement}
            onPress={() => {
              navigation.navigate("Light");
            }}>
            <Text style={styles.featuresElementText}>Light</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={{ color: "#155693", fontSize: 20, marginBottom: 5 }}>
          Notifications
        </Text>
        <View
          style={{
            width: 310,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        ></View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  sectionContainer: {
    marginHorizontal: 25,
    paddingVertical: 10,
  },
  summaryElement: {
    backgroundColor: "#155693",
    height: 99,
    width: 154,
    marginBottom: 2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  featuresContainer: { flexDirection: "row", width: 310 },
  featuresElement: {
    backgroundColor: "#155693",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    margin: 5,
  },
  featuresElementText: { fontSize: 18, color: "white" },
});

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Graph from "../components/testGraph";
import { Database } from "../firebaseConfig";
import * as Notifications from "expo-notifications";

import { get, ref } from "firebase/database";

//Synced data components of firebase
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
  // sendPushNotification("hi", "all is right");
  // const userEmail = getAuth().currentUser.email.slice(0, -4);
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
  const dataRef = ref(Database, "/test/" + props.database); // userEmail + "/homeData/" + props.database
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
      }
    }, 2000); // Changed to 1000 milliseconds for 1 second intervals
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
        {avg.toFixed(2)}
        {props.unit}
      </Text>
      <Text style={{ color: "white" }}>Avg House Temp</Text>
    </View>
  );
};

export default function Home({ navigation }) {
  const [OTemperature, setOTemperature] = React.useState(0);
  const temperature = 0;
  const [OHumi, setOHumi] = React.useState(0);
  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "this is a notification from the home page",
        body: "Here is the notification body",
        data: { data: "goes here" },
      },
      trigger: { seconds: 1 },
    });
  }
  // schedulePushNotification();
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
            height: 200,
            backgroundColor: "#cccccc",
            borderRadius: 15,
            overflow: "hidden",
            justifyContent: "space-between",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <Data
            maximumValue={30}
            maximumValueMessage={{
              title: "الجو حر اويييي",
              body: "شغل التكييف يسطا ولا المروحة هنمووت",
            }}
            unit="&deg;C"
            database="TemperatureC"
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
            maximumValueMessage={{
              title: "الجو رطب اوي",
              body: "هنمووووت",
            }}
            maximumValue={80}
            database="Humidity"
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
          <TouchableOpacity style={styles.featuresElement}>
            <Text style={styles.featuresElementText}>Humidity</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featuresElement}>
            <Text style={styles.featuresElementText}>Gas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featuresElement}>
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
      {/* <View style={styles.graph}>
        <ScrollView style={{ marginBottom: 40 }}>
          <Graph
            name="TemperatureC"
            unit="&deg;C"
            database="TemperatureC"
            maximumValue={30}
            maximumValueMessage={{
              title: "Temperature is too high",
              body: "Temperature is too high"
            }}
          />
          <Graph
            name="Humidity"
            unit="%"
            database="Humidity"
            maximumValue={70}
            maximumValueMessage={{
              title: "Humidity is too high",
              body: "Humidity is too high"
            }}
          />
          <Graph
            name="Gas"
            unit="ppm"
            database="gas"
            maximumValue={700}
            maximumValueMessage={{
              title: "البيت بيولع",
              body: "البيت بيولع الحق نفسك بسررررعة🔥🔥🔥"
            }}
          />
        </ScrollView>
      </View> */}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  // graph: {
  //   width: "100%",
  //   alignItems: "center"
  //   // flex: 1,
  // }
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

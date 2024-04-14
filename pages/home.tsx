import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import Graph from "../components/testGraph";

import * as Notifications from "expo-notifications";

export default function Home() {
  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "this is a notification from the home page",
        body: "Here is the notification body",
        data: { data: "goes here" }
      },
      trigger: { seconds: 1 }
    });
  }
  schedulePushNotification();
  return (
    <View style={{ marginTop: 25 }}>
      <Text>home</Text>
      <View style={styles.graph}>
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

          {/* <Graph name="gas" unit="ppm" /> */}
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  graph: {
    width: "100%",
    alignItems: "center"
    // flex: 1,
  }
});

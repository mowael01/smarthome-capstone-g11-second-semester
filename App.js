import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.topHome}>
        <Text
          style={{
            fontSize: 20,
            color: "#2e2e2e",
            backgroundColor: "red",
            width: "100%",
          }}
        >
          Welcome to Your Smart Home Feed App.
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

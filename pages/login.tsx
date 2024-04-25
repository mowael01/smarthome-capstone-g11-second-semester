import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import React, { useState } from "react";
// import { Dimensions } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAUTH } from "../firebaseConfig";
import { useFonts } from "expo-font";
// const window = Dimensions.get("window");

export default function Login({ navigation: { navigate } }) {
  const [fontsLoaded] = useFonts({
    nunito: require("../assets/fonts/Nunito-Italic-VariableFont_wght.ttf")
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Login = async () => {
    try {
      const responce = await signInWithEmailAndPassword(
        FirebaseAUTH,
        email,
        password
      );
      console.log(responce);
      // alert("sucess")
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, marginTop: 28, backgroundColor: "white" }}>
      <KeyboardAwareScrollView>
        <LinearGradient
          colors={["red", "yellow"]}
          start={{
            x: 0,
            y: 0
          }}
          end={{
            x: 1,
            y: 1
          }}
          // style={styles.box}
        >
          <ImageBackground
            resizeMode="cover"
            source={require("../assets/images/login.jpg")}
            style={{}}
          >
            <View style={{ height: 350 }}></View>
          </ImageBackground>
        </LinearGradient>
        <View style={styles.topTextContainer}>
          <Text style={styles.topText}>Sign Into</Text>
          <Text style={styles.topText}>Manage Your Smart Home! </Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.textInput}
            placeholder="Inter Your Email..."
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password..."
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.buttonsGroup}>
            <TouchableOpacity onPress={Login} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Login</Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 13,
                fontStyle: "italic",
                textAlign: "center",
                margin: 10,
                color: "#636363"
              }}
            >
              Don't have an account yet?!
            </Text>
            <TouchableOpacity onPress={() => navigate("signup")}>
              <Text style={styles.newUserButton}>Create An Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 200,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  headerText: {
    color: "white",
    fontSize: 30,
    width: 200,
    textAlign: "center"
  },
  form: {
    // justifyContent: "center",
    flex: 1,
    alignItems: "center",
    marginTop: 20
  },
  textInput: {
    width: 300,
    marginBottom: 10,
    backgroundColor: "white",
    borderWidth: 2,
    padding: 7,
    borderRadius: 5,
    borderColor: "#155693"
  },
  buttonsGroup: {
    justifyContent: "space-between",
    width: 300
  },
  primaryButton: {
    backgroundColor: "#155693",
    padding: 12,
    borderRadius: 5,
    borderColor: "#155693"
  },
  primaryButtonText: {
    textAlign: "center",
    color: "white"
  },
  newUserButton: {
    textAlign: "center",
    color: "blue",
    textDecorationStyle: "solid",
    textDecorationLine: "underline"
  },
  buttonText: {},
  topText: {
    width: 300,
    color: "#09243d",
    fontSize: 18,
    fontFamily: "nunito",
    fontWeight: "600"
  },
  topTextContainer: { alignItems: "center", marginTop: 20 }
});

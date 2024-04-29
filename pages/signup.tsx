import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FirebaseAUTH } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Login({ navigation: { navigate } }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const newUser = async () => {
    try {
      const responce = await createUserWithEmailAndPassword(
        FirebaseAUTH,
        email,
        password
      );
      console.log(responce);
      alert("sucess");
    } catch (error) {
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
        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.fieldText}>Name</Text>
            <TextInput
              value={userName}
              onChangeText={setUserName}
              style={styles.textInput}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldText}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.textInput}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldText}>New Password</Text>
            <TextInput
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              style={styles.textInput}
            />
          </View>
          <View style={styles.buttonsGroup}>
            <TouchableOpacity
              onPress={newUser}
              style={[styles.primaryButton, styles.button].reverse()}
            >
              <Text style={styles.primaryButtonText}>Make New User</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate("login")}
              style={styles.button}
            >
              <Text>I have account</Text>
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
    justifyContent: "center",
    // flex:1,
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 100
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
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300
  },
  primaryButton: {
    backgroundColor: "#155693",
    paddingHorizontal: 20
  },
  primaryButtonText: {
    textAlign: "center",
    color: "white"
  },
  button: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 5
  },
  field: {
    alignItems: "flex-start",
    width: 300
  },
  fieldText: {
    marginBottom: -10,
    zIndex: 100,
    backgroundColor: "white",
    paddingHorizontal: 7,
    color: "#155693",
    marginLeft: 7,
    borderRadius: 10
  }
});

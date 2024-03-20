import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { useState, useMemo } from "react";
import * as FileSystem from "expo-file-system";
import { Dimensions } from "react-native";
import { FirebaseAUTH } from "../firebaseConfig";
import { addDoc, setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FireStoreDB } from "../firebaseConfig";
const window = Dimensions.get("window");
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
      await setDoc(doc(FireStoreDB, "usersData", email.toLocaleLowerCase()), {
        name: userName,
        email: email.toLocaleLowerCase(),
        password: password,
      });
      FileSystem.writeAsStringAsync(
        "../assets/databases/user.txt",
        email.toLocaleLowerCase()
      );
      alert("sucess");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 28, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={styles.form}>
        <View style={styles.field}>
          <Text style={styles.fieldText}>اكتب اسمك</Text>
          <TextInput
            value={userName}
            onChangeText={setUserName}
            style={styles.textInput}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldText}>البريد الالكتروني</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.textInput}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldText}>كلمة المرور الجديدة</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 200,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  headerText: {
    color: "white",
    fontSize: 30,
    width: 200,
    textAlign: "center",
  },
  form: {
    justifyContent: "center",
    // flex:1,
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 100,
  },
  textInput: {
    width: 300,
    marginBottom: 10,
    backgroundColor: "white",
    borderWidth: 2,
    padding: 7,
    borderRadius: 5,
    borderColor: "#FF8A00",
  },
  buttonsGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
  },
  primaryButton: {
    backgroundColor: "#FF8A00",
    paddingHorizontal: 20,
  },
  primaryButtonText: {
    textAlign: "center",
  },
  button: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 5,
  },
  field: {
    alignItems: "flex-start",
    width: 300,
  },
  fieldText: {
    marginBottom: -10,
    zIndex: 100,
    backgroundColor: "white",
    paddingHorizontal: 7,
    color: "#FF8A00",
    marginLeft: 7,
    borderRadius: 10,
  },
});

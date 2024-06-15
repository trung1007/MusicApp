import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  Pressable,
  Alert
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import {
  FIREBASE_AUTH,
  FIREBASE_APP,
  FIREBASE_DB,
} from "../../../config/firebase";

import { createUserWithEmailAndPassword } from "@firebase/auth";

const Register = () => {
  const navigation = useNavigation();
  const theme = {
    backgroundColor: "white",
    color: "black",
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(0);
 
  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      setShowSuccess(1);
    } catch (error) {
      console.log(error);
      setShowSuccess(2);
    }
  };
  const goLogin=()=>{
    navigation.goBack()
  }


  useEffect(() => {
    if (showSuccess == 1) {
      Alert.alert("Đăng kí thành công");
      setTimeout(() => {
        setShowSuccess(false);
        goLogin()
      }, 1500);
    }
    if (showSuccess == 2) {
      Alert.alert("Tài khoản không hợp lệ");
    }
  }, [showSuccess]);

  return (
    <SafeAreaView
      style={[styles.wrapper, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={{ paddingLeft: 10 }}></View>
      <View style={styles.content}>
        <Image source={require("../../../assets/MusicIcon.png")} />
        <View>
          <Text style={{ color: theme.color, fontSize: 30, fontWeight: "700" }}>
            Đăng kí tài khoản
          </Text>
        </View>
        <View style={styles.formInput}>
          <Fontisto name="email" size={24} color="#525252" />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor={theme.color}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.formInput}>
          <AntDesign name="lock" size={24} color="#525252" />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor={theme.color}
            
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View>
          <TouchableOpacity onPress={handleSignUp}>
            <View style={styles.LoginBtn}>
              <Text style={{ color: "white", fontSize: 18, letterSpacing: 2 }}>
                Đăng kí
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Image source={require("../../../assets/or1.png")} />
        <View style={styles.LoginOption}>
          <TouchableOpacity>
            <Image source={require("../../../assets/gg_icon.png")} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require("../../../assets/fb_icon.png")} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require("../../../assets/apple_icon.png")} />
          </TouchableOpacity>
        </View>
        <View style={styles.Register}>
          <Text style={{ color: theme.color }}>Bạn đã có tài khoản ?</Text>
          <View style={styles.goLogin}>
            <Link href={"Login"} style={{ color: "white" }}>
              Đăng nhập
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "black",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
    gap: 20,
  },
  formInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 340,
    height: 60,
    borderWidth: 2,
    paddingLeft: 10,
    paddingRight: 10,

    gap: 10,
    borderColor: "#525252",
    borderRadius: 12,
  },
  textInput: {
    width: 280,
    height: 50,
  },
  LoginBtn: {
    width: 350,
    height: 60,
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  LoginOption: {
    display: "flex",
    flexDirection: "row",
    width: 350,
    justifyContent: "space-evenly",
  },
  Register: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  goLogin: {
    backgroundColor: "purple",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
});

export default Register;

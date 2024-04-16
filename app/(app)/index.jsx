import React, {useState, useContext} from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";



const Getting1 = () => {
  const navigation = useNavigation();
  const theme = {
    backgroundColor:'white',
    color:'black'
  }

  

  return (
    <SafeAreaView style={[styles.wrapper, { backgroundColor: theme.backgroundColor }]}>
      <View>
      <Image source={require("../../assets/MusicIcon.png")} style={styles.logo} />
      </View>
      <View>
        <TouchableOpacity >
          <Link href={'../(app)/Login'} style={[{color:theme.color}, styles.text]}>Let's get started</Link>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: "center",
  },
  logo:{
    width:200,
    height:200
  },

  text:{
    fontSize:20
  }
});

export default Getting1;

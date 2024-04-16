import React, { useState, useContext } from "react";
import {
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  ScrollView,
  FlatList,
  Image,
  useWindowDimensions,
  Pressable,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

const SlideAblum1 = ({ item }) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const goAlbum = () => {
    navigation.navigate("album", [item]);
  };

  return (
    <View style={[styles.wrapper]}>
      <Pressable onPress={goAlbum}>
        <Image source={item.image} style={[styles.image]} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    marginRight: 5,
  },

  image: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
});
export default SlideAblum1;

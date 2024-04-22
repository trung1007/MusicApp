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
  Pressable,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SlideAlbum2 = ({ item }) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const goAlbum = () => {
    navigation.navigate("album", [item]);
  };
  return (
    <View style={[styles.wrapper]}>
      <Pressable onPress={goAlbum}>
        <Image source={{ uri: item.image }} style={[styles.image]} />
      </Pressable>
    </View>
  );
};

export default SlideAlbum2;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    marginRight: 5,
  },

  image: {
    width: 160,
    height: 160,
    borderRadius: 10,
  },
});

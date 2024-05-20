import React, { useState, useContext, useEffect } from "react";
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


const SearchSong = ({ item, onPress }) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <Pressable style={[styles.wrapper]} onPress={onPress}>
      <Image source={{ uri: item.artwork }} style={[styles.image]} />
      <View>
        <Text>{item.artist}</Text>
        <Text>{item.title}</Text>
      </View>
      
    </Pressable>
  );
};

export default SearchSong;

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
    gap: 10,
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});

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
import themeContext from "../theme/themeContext";


const SearchSong = ({ item, onPress }) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const theme = useContext(themeContext)

  return (
    <Pressable style={[styles.wrapper]} onPress={onPress}>
      <Image source={{ uri: item.artwork }} style={styles.songImg} />
        <View style={styles.songInfo}>
          <Text style={[styles.songName, { color: theme.color }]}>
            {item.title}
          </Text>
          <Text style={[styles.songSinger]}>{item.artist}</Text>
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

  songImg: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  songInfo: {
    display: "flex",
    justifyContent: "space-between",
  },
  songName: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 5,
  },
  songSinger: {
    fontSize: 14,
    marginBottom: 10,
    color: "gray",
  },
});

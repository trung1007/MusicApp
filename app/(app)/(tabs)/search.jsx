import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import themeContext from "../../../theme/themeContext";
import { AntDesign } from "@expo/vector-icons";

const Search = () => {
  const theme = useContext(themeContext);
  const textInputRef = useRef(null);

  const handlePress = () => {
    textInputRef.current.focus();
  };
  return (
    <SafeAreaView
      style={[styles.wrapper, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.title}>
        <Text style={[{ color: theme.color }, styles.titleText]}>TÌM KIẾM</Text>
      </View>
      <View style={styles.content}>
        <Pressable style={styles.searchBar} onPress={handlePress}>
          <AntDesign name="search1" size={24} color="white" />
          <TextInput
            ref={textInputRef}
            style={styles.textInput}
            placeholder="Bạn muốn nghe gì?"
            placeholderTextColor="white"
            color='white'
          />
        </Pressable>
        <ScrollView>
            
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  title: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "600",
    letterSpacing: 3,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchBar: {
    height: 60,
    marginRight: 10,
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 10,
    borderRadius: 10,
  },
  textInput: {
    height: 50,
  },
});

export default Search;

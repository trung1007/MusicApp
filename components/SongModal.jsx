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
  useWindowDimensions,
  Pressable,
  Dimensions,
  TouchableOpacity,
  Modal,
  ImageBackground,
} from "react-native";


import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";


const SongModal = ({ item, toggleModal }) => {
  const theme = {
    backgroundColor:'white',
    color:'black'
  };
  const navigation = useNavigation();
  const route = useRoute();
  const screenName = route.name;
 
  const goHomeScreen = () => {
    navigation.navigate("home");
  };
  const closeModal = () => {
    toggleModal();
    if (screenName === "album") {
      goHomeScreen();
    }
  };
  
  return (
    <Modal style={styles.modalContent} animationType="slide">
      <SafeAreaView
        style={[styles.wrapper, { backgroundColor: theme.backgroundColor }]}
      >
        <TouchableOpacity onPress={closeModal} style={{ paddingLeft: 10 }}>
          <AntDesign name="down" size={24} style={{ color: theme.color }} />
        </TouchableOpacity>
        <View style={styles.content}>
          <Image source={{ uri: item.image }} style={styles.songImage} />
          <Text style={[styles.songName, { color: theme.color }]}>
            {item.name}
          </Text>
          <Text style={[styles.songSinger]}>{item.singer}</Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  background: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    position: "absolute",
  },
  songImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
  },
  songName: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 5,
  },
  songSinger: {
    fontSize: 16,
    marginTop: 5,
    color: "gray",
  },
  content: {
    alignItems: "center",
  },
  
});

export default SongModal;

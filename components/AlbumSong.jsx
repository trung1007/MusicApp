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
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import SongModal from "./SongModal";
import { SongProvider } from "../context/SongContext";
import themeContext from "../theme/themeContext";
import { useActiveTrack } from "react-native-track-player";
const AlbumSong = ({ item , onSelectSong}) => {
  const theme = useContext(themeContext)
  const activeTrack = useActiveTrack();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // const handleSelectSong = async () => {
  //   const track = {
  //     id: item.id,
  //     url: item.music,
  //     title: item.name,
  //     artist: item.singer,
  //     artwork: item.image,
  //   };
  //   (SongProvider.song = track), (SongProvider.select = true);
  //   toggleModal();
    
  //   await TrackPlayer.reset();
  //   await TrackPlayer.add(track);
  //   await TrackPlayer.play();
  //   console.log(track);
  // };

  return (
    <View style={{backgroundColor:theme.backgroundColor}}>
      <TouchableOpacity style={styles.content} onPress={() => {
        console.log('pressed');
        onSelectSong(item)
      }}>
        <Image source={{ uri: item.artwork }} style={styles.songImg} />
        <View style={styles.songInfo}>
          <Text style={[styles.songName, { color: theme.color }]}>
            {item.title}
          </Text>
          <Text style={[styles.songSinger]}>{item.artist}</Text>
        </View>
      </TouchableOpacity>
      {/* {selectSong && (<SongPlayer item={item}/>)} */}
      {modalVisible && (
        <SongModal item={SongProvider.song} toggleModal={toggleModal} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    display: "flex",
    flexDirection: "row",
    width: Dimensions.get("window").width,
    gap: 10,
    padding: 10,
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
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 5,
  },
  songPopUp: {
    position: "relative",
    bottom: 0,
  },
});

export default AlbumSong;

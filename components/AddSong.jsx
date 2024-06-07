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
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import themeContext from "../theme/themeContext";
import { AntDesign } from "@expo/vector-icons";
import { FIREBASE_DB } from "../config/firebase";
import { addDoc, collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { AuthProvider } from "../context/AuthContext";

const AddSong = ({ item, onPress, PlaylistId, changeCurrentPlaylistSongsID, currentPlaylistSongsIDa, removeFromList }) => {
  const theme = useContext(themeContext);
  const user = AuthProvider.user;
  const UserID = user.id;


  const addSongtoPlaylist = async () => {

    const musicId = item.id;
    removeFromList(musicId);
    console.log("Start query firebase");
    const currentDoc = doc(
      FIREBASE_DB,
      "User",
      UserID,
      "UserAlbum",
      PlaylistId
    );
    console.log("add Song");
    console.log(musicId);

    try {
      // Get the current document data
      const docSnapshot = await getDoc(currentDoc);
      const currentData = docSnapshot.data();
  
      // Update the musicList array
      const updatedMusicList = [...currentData.musicList, musicId];
  
      // Update the document with the new musicList
      await updateDoc(currentDoc, {
        musicList: updatedMusicList,
      });
  
      console.log("Song added to the playlist!");
      changeCurrentPlaylistSongsID([...updatedMusicList]);
    } catch (error) {
      console.error("Error adding song to the playlist:", error);
    }
    
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Pressable style={[styles.wrapper]}>
        <Image source={{ uri: item.artwork }} style={styles.songImg} />
        <View style={styles.songInfo}>
          <Text style={[styles.songName, { color: theme.color }]}>
            {item.title}
          </Text>
          <Text style={[styles.songSinger]}>{item.artist}</Text>
        </View>
      </Pressable>
      <TouchableOpacity style={{ marginRight: 10 }} onPress={addSongtoPlaylist}>
        <AntDesign name="pluscircle" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default AddSong;

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

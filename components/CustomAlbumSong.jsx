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
import { FontAwesome } from "@expo/vector-icons";
import {FIREBASE_DB} from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { AuthProvider } from "../context/AuthContext";
const CustomAlbumSong = ({ item , onSelectSong, changePlaylistSongsID, playlistId}) => {
  const theme = useContext(themeContext)
  const activeTrack = useActiveTrack();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const userID = AuthProvider.user.id;
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const removeSongFromPlaylist = async (songID) => {
      changePlaylistSongsID(oldPlaylist => oldPlaylist.filter(song => song !== songID));
      console.log(userID);
      console.log(playlistId );
      try {
        const currentDoc = doc(
            FIREBASE_DB,
            "User",
            userID,
            "UserAlbum",
            playlistId
          );
        const docSnapshot = await getDoc(doc(FIREBASE_DB, "User", userID, "UserAlbum", playlistId));
      const currentData = docSnapshot.data();
      const updatedMusicList = currentData.musicList.filter((id) => id !== songID);
      await updateDoc(currentDoc, {
        musicList: updatedMusicList,
      }).then(() => {
        console.log("Song removed from the playlist ", songID);
      }); 
      }  catch (error) {
        console.error("Error removing song to the playlist:", error);
      } 
    //   getDoc(currentDoc)
    //   .then((docSnapshot) => {
    //     const currentData = docSnapshot.data();
    //     const updatedMusicList = currentData.musicList.filter((id) => id !== songID);
    //     updateDoc(currentDoc, {
    //       musicList: updatedMusicList,
    //     }).then(() => {
    //       console.log("Song removed from the playlist");
    //     });
    //   })
    //   getDoc(currentDoc).then((docSnapshot) => {
    //     const currentData = docSnapshot.data();
    //     const updatedMusicList = currentData.musicList.filter((id) => id !== songID);
    //     updateDoc(currentDoc, {
    //       musicList: updatedMusicList,}).then(() => {
    //         console.log("Song removed from the playlist");  
    //       })
    //     });


  }

  return (
    <View style={{backgroundColor:theme.backgroundColor, flexDirection: "row"}}>  
      <TouchableOpacity style={styles.content} onPress={() => {
        console.log('pressed');
        onSelectSong(item)
      }}>
        <View style={{flexDirection: "row", gap: 10}}>
        <Image source={{ uri: item.artwork }} style={styles.songImg} />
        <View style={styles.songInfo}>
          <Text style={[styles.songName, { color: theme.color }]}>
            {item.title}
          </Text>
          <Text style={[styles.songSinger]}>{item.artist}</Text>
        </View>
        </View>
        <TouchableOpacity onPress={() => removeSongFromPlaylist(item.id)}>
            <FontAwesome name="trash" size={24} color={theme.color} />
        </TouchableOpacity>
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
    justifyContent: "space-between",
    alignItems: "center",
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

export default CustomAlbumSong;

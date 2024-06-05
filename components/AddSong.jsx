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
import { addDoc, collection,doc, updateDoc } from "firebase/firestore";
import { AuthProvider } from "../context/AuthContext";

const AddSong = ({ item, onPress, PlaylistId }) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  const [currentSong, setCurrentSong] = useState("");
  const user = AuthProvider.user;
  const UserID = user.id;
  const UserPlaylistCollection = collection(
    FIREBASE_DB,
    "User",
    UserID,
    "UserAlbum"
  );

  const addSongtoPlaylist = async (PlaylistId) => {
    const currentDoc = doc(FIREBASE_DB, 'User', UserID, "UserAlbum", PlaylistId)

    setCurrentSong(item.id);
    if (currentSong != "") {
    //   console.log(currentSong);
    }
    // await addDoc(UserPlaylistCollection, {musicList: currentSong})
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Pressable style={[styles.wrapper]} onPress={onPress}>
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

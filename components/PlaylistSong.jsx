import { useState, useContext, useEffect } from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AuthProvider } from "../context/AuthContext";
import themeContext from "../theme/themeContext";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import {deleteDoc,doc, } from 'firebase/firestore'
import { FIREBASE_DB } from "../config/firebase";

const PlaylistSong = ({ PlaylistName, id, PlaylistList }) => {
  const theme = useContext(themeContext);
  const user = AuthProvider.user;
  const navigation = useNavigation();
  const UserID  = user.id

  // useEffect(()=>{
  //   // console.log(PlaylistList);
  //   console.log(id);
  // },[])

  const removePlaylist = async()=>{
    const currentPlaylistDoc = doc(FIREBASE_DB, 'User',UserID, 'UserAlbum', id )
    await deleteDoc(currentPlaylistDoc)
  }

  return (
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => {
          navigation.navigate("SongPlaylist", {
            PlaylistName,
            PlaylistList,
            id,
          });
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            width: 60,
            height: 60,
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ textTransform: "capitalize" }}>{PlaylistName}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={[styles.PlaylistName, { color: theme.color }]}>
              {PlaylistName}
            </Text>
            <Text style={{ fontSize: 14, marginBottom: 10, color: "gray" }}>
              {user.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{paddingRight:20}} onPress={removePlaylist}>
        <FontAwesome name="trash" size={24} color={theme.color} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    gap: 10,
  },
  PlaylistName: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 5,
    textTransform: "capitalize",
  },
});

export default PlaylistSong;

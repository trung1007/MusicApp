import { useState, useContext, useEffect } from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AuthProvider } from "../context/AuthContext";
import themeContext from "../theme/themeContext";
import { useNavigation } from "@react-navigation/native";

const PlaylistSong = ({ PlaylistName, id, PlaylistList }) => {
  const theme = useContext(themeContext);
  const user = AuthProvider.user;
const navigation = useNavigation()

useEffect(()=>{
  // console.log(PlaylistList);
  console.log(id);
},[])

  return (
    <TouchableOpacity style={styles.wrapper} onPress={()=>{
        navigation.navigate('SongPlaylist',{PlaylistName, PlaylistList, id})
    }}>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 10,
          width: 60,
          height: 60,
          borderWidth:1,
          alignItems: "center",
          justifyContent: "center",
        }}
        
      >
        <Text style={{textTransform:'capitalize'}}>{PlaylistName}</Text>
      </View>
      <View>
        <Text style={[styles.PlaylistName, { color: theme.color }]}>
          {PlaylistName}
        </Text>
        <Text style={{ fontSize: 14, marginBottom: 10, color: "gray" }}>
          {user.name}
        </Text>
      </View>
    </TouchableOpacity>
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
    textTransform:'capitalize'
  },
});

export default PlaylistSong;

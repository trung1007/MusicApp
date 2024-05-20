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
  LogBox,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import SongModal from "./SongModal";
import { SongProvider } from "../context/SongContext";
import themeContext from "../theme/themeContext";
import {
  PlayPauseButton,
  SkipToNextButton,
  SkipToPreviousButton,
} from "./PlayerControl";
import { useActiveTrack } from "react-native-track-player";

const SongPlayer = () => {
  const theme = useContext(themeContext);
  const [modalVisible, setModalVisible] = useState(false);

  // const song = SongProvider.song;
  // console.log(song);
  const activeTrack = useActiveTrack();
  console.log("ActiveTrack: ", activeTrack);
  const displayedTrack = activeTrack ?? {
    title: "No active track",
    artist: "No active track",
    artwork: "https://via.placeholder.com/300",
  };
  console.log("DisplayedTrack: ", displayedTrack);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <TouchableOpacity
      onPress={toggleModal}
      style={[
        styles.stickPlayer,
        { backgroundColor: theme.backgroundColor, borderColor: theme.color },
      ]}
    >
      <View style={styles.song}>
        <Image
          source={{
            uri: displayedTrack.artwork,
          }}
          style={styles.songImage}
        />
        <View style={styles.songInfo}>
          <Text style={[styles.songName, { color: theme.color }]}>
            {displayedTrack.title}
          </Text>
          <Text style={[styles.songSinger]}>{displayedTrack.artist}</Text>
        </View>
      </View>

      <View style={styles.trackControlContatiner}>
        <SkipToPreviousButton iconSize={22} color={theme.color} />
        <PlayPauseButton iconSize={24} />
        <SkipToNextButton iconSize={22} />
      </View>
      {modalVisible && (
        <SongModal item={displayedTrack} toggleModal={toggleModal} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  stickPlayer: {
    position: "absolute",
    height: 60,
    width: Dimensions.get("window").width,
    bottom: 48,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 5,
    gap: 10,
  },
  song: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap:10,
    marginLeft:10
  },
  songImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  songInfo: {
    gap: 5,
  },
  songName: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },
  songSinger: {
    fontSize: 14,
    marginBottom: 5,
    color: "gray",
  },
  trackControlContatiner: {
    position: "absolute",
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
    marginRight: 16,
    paddingLeft: 16,
  },
});

export default SongPlayer;

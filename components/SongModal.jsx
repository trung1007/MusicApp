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
import MusicPlayer, { LyricsContainer } from "./TrackPlayer";


const SongModal = ({ item, toggleModal }) => {
  const [showingLyrics, setShowingLyrics] = useState(true);
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
        {/* <View style={styles.content}>
          <Image source={{ uri: item.image }} style={styles.songImage} />
          <Text style={[styles.songName, { color: theme.color }]}>
            {item.name}
          </Text>
          <Text style={[styles.songSinger]}>{item.singer}</Text>
        </View> */}
        
        <MusicPlayer />
        {/* <LyricsContainer lrc={lrc} currentTime={0}/> */}
      </SafeAreaView>
    </Modal>
  );
};
const lrc = `
[00:00.00]Dreamers 
[00:04.43]Jungkook BTS
[00:09.11]
[00:09.61] ....
[00:16.96]Look who we are, we are the dreamers
[00:20.94]We’ll make it happen ’cause we believe it
[00:24.68]Look who we are, we are the dreamers
[00:29.18]We’ll make it happen ’cause we can see it
[00:34.23]Here’s to the ones, that keep the passion
[00:37.69]Respect, oh yeah
[00:41.67]Here’s to the ones, that can imagine
[00:46.20]Respect, oh yeah
[01:07.19]Gather ’round now, look at me
[01:11.71]Respect the love the only way
[01:15.68]If you wanna come, come with me
[01:20.21]The door is open now every day
[01:23.67]This one plus two, rendezvous all at my day
[01:28.19]This what we do, how we do
[01:31.63]Look who we are, we are the dreamers
[01:35.89]We’ll make it happen ’cause we believe it
[01:39.62]Look who we are, we are the dreamers
[01:43.87]We’ll make it happen ’cause we can see it
[01:48.95]Here’s to the ones, that keep the passion
[01:52.44]Respect, oh yeah
[01:56.42]Here’s to the ones, that can imagine
[02:00.67]Respect, oh yeah
[02:22.26]Look who we are, we are the dreamers
[02:25.98]We’ll make it happen ’cause we believe it
[02:30.23]Look who we are, we are the dreamers
[02:33.95]We’ll make it happen ’cause we can see it
[02:38.99]Cause to the one that keep the passion
[02:42.45]Respect, oh yeah
[02:47.22]‘Cause to the one that got the magic
[02:51.21]Respect, oh yeah
`;

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
  lyricsLine: {
    fontSize: 16,
    fontWeight: "600",
    margin: 10,
    color: "#fff"
  }
  
});

export default SongModal;

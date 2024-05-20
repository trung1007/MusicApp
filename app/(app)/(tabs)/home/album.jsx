import React, { useEffect, useState, useContext } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/native";

import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { FIREBASE_DB } from "../../../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import AlbumSong from "../../../../components/AlbumSong";
import themeContext from "../../../../theme/themeContext";
import TrackPlayer from "react-native-track-player";
import { SongProvider } from "../../../../context/SongContext";
import { useQueue } from "../../../../store/queue";


const Album = () => {
  
  const route = useRoute();
  const albumObj = route.params[0];
  const albumID = albumObj.id;
  const navigation = useNavigation();
  const theme = useContext(themeContext)


  const {activeQueueId, setActiveQueueId} = useQueue();

  const [tracks, setTracks] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [select, setSelect] = useState(false)

  const fetchMusic = async () => {
    const musicIdList = albumObj.musicList;
    const allMusicDocs = await getDocs(collection(FIREBASE_DB, "Music"));
    const tracks = [];
    allMusicDocs.forEach((doc) => {
      const musicID = doc.id;
      if (musicIdList.includes(musicID)) {
        tracks.push({
          title: doc.data().title,
          artist: doc.data().artist,
          artwork: doc.data().artwork,
          id: musicID,
          url: doc.data().url,
        })
      }
    });
    setTracks(tracks);
  };

  useEffect(() => {
    fetchMusic();
    setSelect(false)
  }, []);
  const [currentSong, setCurrentSong] = useState({})
  const handleSelectSong = async (selectedTrack) => {
    const trackIndex = tracks.findIndex((item) => item.id === selectedTrack.id);
    const isChangingAlbum = activeQueueId === null || (selectedTrack.id !== activeQueueId);

    if (isChangingAlbum) {
      const beforeTracks = tracks.slice(0, trackIndex);
      const afterTracks = tracks.slice(trackIndex + 1);
      await TrackPlayer.reset();
      await TrackPlayer.add(selectedTrack);
      await TrackPlayer.add(afterTracks);

      await TrackPlayer.play();
    } else {
      const nextTrackIndex =
				trackIndex - queueOffset.current < 0
					? tracks.length + trackIndex - queueOffset.current
					: trackIndex - queueOffset.current

			await TrackPlayer.skip(nextTrackIndex)
			TrackPlayer.play()
    }

  };


  return (
    <SafeAreaView
      style={[styles.wrapper, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={[{ paddingLeft: 10 }]}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign
            name="arrowleft"
            size={24}
            style={{ color: theme.color }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={[styles.albumName, {color:theme.color}]}>
          {route.params[0].name}
        </Text>

        <ScrollView 
          showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}>
          <Image source={{
            uri:route.params[0].image
          }} style={styles.albumImg} />

          {tracks.map((item) => (
            <AlbumSong 
            key={item.id}
            item={item} 
            onSelectSong={handleSelectSong}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  content: {
    display: "flex",
    alignItems: "center",
    marginBottom:100
  },
  albumImg: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginTop: 10,
    marginBottom:10
  },
  albumName: {
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 1,
    marginTop: 10,
  },
});
export default Album;

import React, { useEffect, useState, useCallback } from "react";
import useTimer from "./time";
import { parse } from "clrc";
import storage from "@react-native-firebase/storage";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import TrackPlayer, {
  Capability,
  State,
  Event,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
  useActiveTrack,
} from "react-native-track-player";
import Slider from "@react-native-community/slider";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import podcasts from "../assets/data";
import { SongProvider } from "../context/SongContext";
import { Lyric } from "react-native-lyric";
import {
  SkipToNextButton,
  PlayPauseButton,
  SkipToPreviousButton,
} from "./PlayerControl";
import LyricScreen from "./LyricScreen.jsx";
import { FIREBASE_DB } from "../config/firebase";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";

export const getLRC = async (lrcFile) => {
  
    fetch(lrcFile)
    .then((response) => response.text())
    .then((data) => {
      const lines = data.split("\n");

      const lrc = [];

      lines.forEach((line, index) => {
        const trimmed = line.trim();
        lrcLine = parse(trimmed);
        lrcLine[0].lineNumber = index;
        lrc.push(lrcLine[0]);
      });
      // console.log(lrc);
      return lrc;

    });
};




function MusicPlayer() {
  const activeTrack = useActiveTrack();
  // console.log(activeTrack);
  const [lyricLines, setLyricLines] = useState([]);

  const currentSong = useActiveTrack() ?? {
    title: "No song",
    artist: "No artist",
    artwork: "https://via.placeholder.com/300",
  };

  useEffect(() =>  {
    async function fetchLyric() {
      const id = currentSong.id;
    const musicDoc = doc(FIREBASE_DB, "Music", id);
    const musicRef = await getDoc(musicDoc);
    const lyricLink = musicRef.data().lyric;

    // "https://firebasestorage.googleapis.com/v0/b/music-app-2c0fc.appspot.com/o/Music%2FHoa%20N%E1%BB%9F%20Kh%C3%B4ng%20M%C3%A0u%2Ftest.txt?alt=media&token=680dad3d-2616-41b8-8de1-b8ec587851b0";
    fetch(lyricLink)
    .then((response) => response.text())
    .then((data) => {
      const lines = data.split("\n");
      const lrc = [];

      lines.forEach((line, index) => {
        const trimmed = line.trim();
        const lrcLine = parse(trimmed);
        lrcLine[0].lineNumber = index;
        lrc.push(lrcLine[0]);
      });
      console.log(lrc);
      setLyricLines(lrc);  
    });
    }
    fetchLyric();
  }, [currentSong]);

  
  //   const lines = getLRC(lyricLink) ?? [];
    // console.log("lines parsed: ", lr);

  

  const playBackState = usePlaybackState();
  const progress = useProgress();
  // console.log(progress);
  // console.log(activeTrack);

  const [favorite, SetFavorite] = useState(false);
  const SongRef = collection(FIREBASE_DB, "User");
 
  const handleAddFavorite = () => {
    SetFavorite(!favorite);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        >
          <View style={styles.mainWrapper}>
            <Image source={currentSong.artwork} style={styles.imageWrapper} />
            <View style={styles.songText}>
              {/* <Image source={track.artwork} /> */}
              {/* <Text style={[styles.songContent, styles.songTitle]} numberOfLines={3}>{trackArtwork}</Text> */}
              <Text
                style={[styles.songContent, styles.songTitle]}
                numberOfLines={3}
              >
                {currentSong.title}
              </Text>
              <Text
                text
                style={[styles.songContent, styles.songArtist]}
                numberOfLines={2}
              >
                {currentSong.artist}
              </Text>
            </View>
          </View>
          <LyricScreen
            lines={lyricLines}
            currentTime={progress.position * 1000}
          />
        </ScrollView>

        <View>
          <Slider
            style={styles.progressBar}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor="#FFFFFF"
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#FFFFFF"
            onSlidingComplete={async (value) => await TrackPlayer.seekTo(value)}
          />
          <View style={styles.progressLevelDuraiton}>
            <Text style={styles.progressLabelText}>
              {new Date(progress.position * 1000)
                .toUTCString()
                .substring(20, 25)}
            </Text>
            <Text style={styles.progressLabelText}>
              {new Date(progress.duration * 1000)
                .toUTCString()
                .substring(20, 25)}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.trackControlContatiner}>
            <SkipToPreviousButton iconSize={38} color="white" />
            <PlayPauseButton iconSize={50}  color="white"/>
            <SkipToNextButton iconSize={38} color="white"/>
          </View>
          <TouchableOpacity
            style={{ position: "absolute", right: -100 }}
            onPress={handleAddFavorite}
          >
            {favorite ? (
              <AntDesign name="heart" size={24} color="red" />
            ) : (
              <AntDesign name="hearto" size={24} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default MusicPlayer;

export const LyricsContainer = ({ lrc, currentTime }) => {
  // console.log(lrc);
  const { currentMillisecond, setCurrentMillisecond, reset, play, pause } =
    useTimer(1);
  // console.log(lrc);
  const lineRenderer = useCallback(
    ({ lrcLine: { millisecond, content }, index, active }) => {
      // console.log(content, index, active);
      return (
        <Text style={{ textAlign: "center", color: active ? "black" : "red" }}>
          {content}
        </Text>
      );
    },
    []
  );
  const onCurrentLineChange = useCallback(
    ({ lrcLine: { millisecond, content }, index }) =>
      // console.log(index, millisecond, content),
    []
  );

  return (
    <View>
      <Lyric
        style={{ height: 300, flex: 1 }}
        lrc={lrc}
        currentTime={500}
        lineHeight={16}
        lineRenderer={lineRenderer}
        autoScroll
        autoScrollAfterUserScroll={500}
        // onCurrentLineChange={onCurrentLineChange}
      />
      <Text style={{ color: "black" }}>Hello world</Text>
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#120D15",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },
  mainWrapper: {
    width: width,
    // height: width,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    alignSelf: "center",
    width: 350,
    height: 350,
    borderRadius: 175,
  },
  songText: {
    marginTop: 2,
    height: 70,
  },
  songContent: {
    textAlign: "center",
    color: "#EEEEEE",
  },
  songTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  songArtist: {
    fontSize: 16,
    fontWeight: "300",
  },
  progressBar: {
    alignSelf: "stretch",
    marginTop: 40,
    marginLeft: 5,
    marginRight: 5,
  },
  progressLevelDuraiton: {
    width: width,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabelText: {
    color: "#FFF",
  },
  musicControlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    width: "60%",
  },
  trackControlContatiner: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
    marginRight: 16,
    paddingLeft: 16,
  },
});

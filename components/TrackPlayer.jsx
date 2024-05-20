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
import podcasts from "../assets/data";
import { SongProvider } from "../context/SongContext";
import { Lyric } from "react-native-lyric";
import {
  SkipToNextButton,
  PlayPauseButton,
  SkipToPreviousButton,
} from "./PlayerControl";
import LyricScreen from "./LyricScreen.jsx";

export const getLRC = async (lrcFile) => {
  try {
    // const reference = storage().ref(lrcFile);
    // const url = await reference.getDownloadURL();
    const response = await fetch(lrcFile);
    const text = await response.text();
    console.log(text);
    const lrc = parse(text);
    return lrc;
  } catch (error) {
    console.log(error);
  }
};

function MusicPlayer() {
  const activeTrack = useActiveTrack();
  console.log(activeTrack);

  const lrc = `[00:45.098]Xua tan bộn bề nơi anh
[00:48.095]Bao ngày qua niềm thương nỗi nhớ
[00:51.021]Bay theo bầu trời trong xanh
[00:54.005]Lướt đôi hàng mi
[00:57.013]Mong manh anh thẫn thờ
[00:59.040]Muốn hôn nhẹ mái tóc
[01:01.034]Bờ môi em anh mơ
[01:04.053]Cầm tay anh dựa vai anh
[01:07.021]Kề bên anh nơi này có anh
[01:09.051]Gió mang câu tình ca
[01:10.099]Ngàn ánh sao vụt qua
[01:12.010]Nhẹ ôm lấy em
[01:15.008]Cầm tay anh dựa vai anh
[01:17.070]Kề bên anh nơi này có anh
[01:19.092]Khép đôi mi thật lâu
[01:21.037]Nguyện mãi bên cạnh nhau
[01:22.051]Yêu say đắm như ngày đầu
[01:25.023]Mùa xuân đến bình yên
[01:28.042]Cho anh những giấc mơ
[01:30.043]Hạ lưu giữ ngày mưa
[01:33.068]Ngọt ngào nên thơ
[01:35.065]Mùa thu lá vàng rơi
[01:38.077]Đông sang anh nhớ em
[01:40.083]Tình yêu bé nhỏ xin
[01:44.000]Dành tặng riêng em
[01:57.029]Còn đó tiếng nói ấy
[01:58.036]Bên tai vấn vương bao ngày qua
[02:00.010]Ánh mắt bối rối
[02:00.091]Nhớ thương bao ngày qua
[02:02.077]Yêu em anh thẫn thờ
[02:03.081]Con tim bâng khuâng đâu có ngờ
[02:05.006]Chẳng bao giờ phải mong chờ
[02:06.048]Đợi ai trong chiều hoàng hôn mờ
[02:07.084]Đắm chìm hoà vào vần thơ
[02:09.015]Ngắm nhìn khờ dại mộng mơ
[02:10.040]Đừng bước vội vàng rồi làm ngơ
[02:11.066]Lạnh lùng đó làm bộ dạng thờ ơ
[02:13.000]Nhìn anh đi em nha
[02:13.090]Hướng nụ cười cho riêng anh nha
[02:15.010]Đơn giản là yêu
[02:15.082]Con tim anh lên tiếng thôi
[02:17.065]Cầm tay anh dựa vai anh
[02:20.033]Kề bên anh nơi này có anh
[02:22.057]Gió mang câu tình ca
[02:24.001]Ngàn ánh sao vụt qua
[02:25.009]Nhẹ ôm lấy em
[02:28.004]Cầm tay anh dựa vai anh
[02:30.066]Kề bên anh nơi này có anh
[02:32.095]Khép đôi mi thật lâu
[02:34.046]Nguyện mãi bên cạnh nhau
[02:35.057]Yêu say đắm như ngày đầu
[02:38.027]Mùa xuân đến bình yên
[02:41.042]Cho anh những giấc mơ
[02:43.036]Hạ lưu giữ ngày mưa
[02:46.066]Ngọt ngào nên thơ
[02:48.079]Mùa thu lá vàng rơi
[02:51.091]Đông sang anh nhớ em
[02:53.084]Tình yêu bé nhỏ xin
[02:57.002]Dành tặng riêng em
[03:02.059]Nhớ thương em`;
  const lyricLink =
    "https://firebasestorage.googleapis.com/v0/b/music-app-2c0fc.appspot.com/o/Music%2FHoa%20N%E1%BB%9F%20Kh%C3%B4ng%20M%C3%A0u%2Fhoanokhongmau.txt?alt=media&token=290611d3-9fe7-4da8-a8a1-1979bb80fcd9";
  const lines = getLRC() ?? [];
  const currentSong = useActiveTrack() ?? {
    title: "No song",
    artist: "No artist",
    artwork: "https://via.placeholder.com/300",
  };

  const playBackState = usePlaybackState();
  const progress = useProgress();
  console.log(progress);
  console.log(activeTrack);

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
            lines={parse(lrc)}
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
        <View style={styles.trackControlContatiner}>
          <SkipToPreviousButton iconSize={30}/>
          <PlayPauseButton iconSize={34} />
          <SkipToNextButton iconSize={30} />
        </View>
      </View>
      <View></View>
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
      console.log(content, index, active);
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
      console.log(index, millisecond, content),
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
    backgroundColor: "#222831",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom:40
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

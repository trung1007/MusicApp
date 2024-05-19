import React, { useEffect, useState, useCallback } from 'react';
import useTimer from './time';
import {parse} from 'clrc';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Image } from 'expo-image';
import TrackPlayer, {
  Capability,
  State,
  Event,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
  useActiveTrack,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import podcasts from '../assets/data';
import { SongProvider } from '../context/SongContext';
import { Lyric } from 'react-native-lyric';
import { SkipToNextButton, PlayPauseButton, SkipToPreviousButton } from './PlayerControl';
import LyricScreen from './LyricScreen';

function MusicPlayer() {
  const activeTrack = useActiveTrack();
  
  const lrc = `[00:11.67]Anh tìm nỗi nhớ
[00:14.53]Anh tìm quá khứ
[00:17.16]Nhớ lắm kí ức anh và em
[00:22.10]Trả lại anh yêu thương ấy
[00:24.76]xin người hãy về nơi đây
[00:27.34]Bàn tay yếu ớt cố níu em ở lại
[00:33.23]Những giọt nước mắt
[00:35.78]Lăn dài trên mi
[00:38.63]Cứ thế anh biết phải làm sao?
[00:43.42]Tình yêu trong em đã mất
[00:46.15]phai dần đi theo gió bay
[00:48.83]Còn lại chi nơi đây
[00:50.63]cô đơn riêng anh
[00:54.89]Em đi xa quá
[00:57.02]Em đi xa anh quá
[00:59.64]Có biết không nơi đây
[01:01.50]anh vẫn đứng đợi một giấc mơ
[01:05.11]Anh chờ đợi một cơn mưa
[01:07.74]sẽ xoá sạch giọt nước mắt
[01:10.41]Ngồi trong đêm bơ vơ
[01:12.16]anh thấy đau em có biết không?
[01:16.24]Em ơi anh nhớ
[01:18.49]Em ơi anh rất nhớ
[01:21.16]Từng câu nói ánh mắt
[01:22.83]của em giờ này ở nơi đâu?
[01:26.43]Chắc ai đó sẽ sớm quay lại thôi
[01:29.12]Chắc ai đó sẽ sớm quay về thôi
[01:31.80]Cầm bông hoa trên tay nước mắt rơi
[01:36.28]Anh nhớ em
[01:51.42]Những giọt nước mắt
[01:53.97]Lăn dài trên mi
[01:56.82]Cứ thế anh biết phải làm sao?
[02:01.61]Tình yêu trong em đã mất
[02:04.34]phai dần đi theo gió bay
[02:07.02]Còn lại chi nơi đây
[02:08.82]cô đơn riêng anh
[02:12.88]Em đi xa quá
[02:15.01]Em đi xa anh quá
[02:17.63]Có biết không nơi đây
[02:19.49]anh vẫn đứng đợi một giấc mơ
[02:23.10]Anh chờ đợi một cơn mưa
[02:25.73]sẽ xoá sạch giọt nước mắt
[02:28.40]Ngồi trong đêm bơ vơ
[02:30.15]anh thấy đau em có biết không?
[02:34.23]Em ơi anh nhớ
[02:36.48]Em ơi anh rất nhớ
[02:39.15]Từng câu nói ánh mắt
[02:40.82]của em giờ này ở nơi đâu?
[02:44.42]Chắc ai đó sẽ sớm quay lại thôi
[02:47.11]Chắc ai đó sẽ sớm quay về thôi
[02:49.79]Cầm bông hoa trên tay nước mắt rơi
[02:54.27]Anh nhớ em
[03:17.62]Anh sẽ mãi nhớ thật nhiều
[03:20.43]những thứ thuộc về em
[03:22.54]Trong tim này
[03:23.48]vẫn mãi yêu người
[03:24.84]riêng em
[03:27.97]Uh oh
[03:30.72]Em đi xa quá
[03:32.92]Em đi xa anh quá
[03:35.53]Có biết không nơi đây
[03:37.35]anh vẫn đứng đợi một giấc mơ
[03:40.84]Anh chờ đợi một cơn mưa
[03:43.51]sẽ xoá sạch giọt nước mắt
[03:46.19]Ngồi trong đêm bơ vơ
[03:48.06]anh thấy đau em có biết không?
[03:51.98]Em ơi anh nhớ
[03:54.34]Em ơi anh rất nhớ
[03:57.03]Từng câu nói ánh mắt
[03:58.73]của em giờ này ở nơi đâu?
[04:02.28]Chắc ai đó sẽ sớm quay lại thôi
[04:04.97]Chắc ai đó sẽ sớm quay về thôi
[04:07.65]Cầm bông hoa trên tay nước mắt rơi
[04:12.12]Anh nhớ em`;
  
 const lines = parse(lrc);
  const currentSong = useActiveTrack()?? {
    title: "No song",
    artist: "No artist",
    artwork: "https://via.placeholder.com/300",
  }

  const playBackState = usePlaybackState();
  const progress = useProgress();
  console.log(progress);


  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.mainWrapper}>
          <Image source={currentSong.artwork} style={styles.imageWrapper} />
          
        </View>
        <View style={styles.songText}>
          {/* <Image source={track.artwork} /> */}
          {/* <Text style={[styles.songContent, styles.songTitle]} numberOfLines={3}>{trackArtwork}</Text> */}
          <Text style={[styles.songContent, styles.songTitle]} numberOfLines={3}>{currentSong.title}</Text>
          <Text text style={[styles.songContent, styles.songArtist]} numberOfLines={2}>{currentSong.artist}</Text>
          
        </View>
        <LyricScreen lrc={lines} currentTime={progress.position * 1000} />
          
        
        <View>
          <Slider
            style={styles.progressBar}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor="#FFFFFF"
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#FFFFFF"
            onSlidingComplete={async value => await TrackPlayer.seekTo(value)}
          />
          <View style={styles.progressLevelDuraiton}>
            <Text style={styles.progressLabelText}>
              {new Date(progress.position * 1000).toUTCString().substring(20, 25)}
            </Text>
            <Text style={styles.progressLabelText}>
              {new Date(progress.duration * 1000).toUTCString().substring(20, 25)}
            </Text>
          </View>
        </View>
        <View style={styles.trackControlContatiner}>
          <SkipToPreviousButton iconSize={22} />
					<PlayPauseButton iconSize={24} />
					<SkipToNextButton iconSize={22} />
				</View>
        
      </View>
      <View>
      
      </View>
    </View>
  );
};

export default MusicPlayer;

export const LyricsContainer = ({ lrc, currentTime }) => {
  // console.log(lrc);
  const {
    currentMillisecond,
    setCurrentMillisecond,
    reset,
    play,
    pause
  } = useTimer(1);
  // console.log(lrc);
  const lineRenderer = useCallback(
    ({ lrcLine: { millisecond, content }, index, active }) => {
      console.log(content, index, active);
      return (
        <Text
          style={{ textAlign: 'center', color: active ? 'black' : 'red' }}>
          {content}
        </Text>
      )
    },
    [],
  );
  const onCurrentLineChange = useCallback(
    ({ lrcLine: { millisecond, content }, index }) =>
      console.log(index, millisecond, content),
    [],
  );

  return (
   <View>
    <Lyric
      style={{ height: 300, flex: 1}}
      lrc={lrc}
      currentTime={500}
      lineHeight={16}
      lineRenderer={lineRenderer}
      autoScroll
      autoScrollAfterUserScroll={500}
      // onCurrentLineChange={onCurrentLineChange}
    />
    <Text style={{color: 'black'}}>Hello world</Text>
   </View>
      

  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainWrapper: {
    width: width,
    height: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    alignSelf: "center",
    width: 350,
    height: 350,
    borderRadius: 175,
  },
  songText: {
    marginTop: 2,
    height: 70
  },
  songContent: {
    textAlign: 'center',
    color: '#EEEEEE',
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  songArtist: {
    fontSize: 16,
    fontWeight: '300',
  },
  progressBar: {
    alignSelf: "stretch",
    marginTop: 40,
    marginLeft: 5,
    marginRight: 5
  },
  progressLevelDuraiton: {
    width: width,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: '#FFF',
  },
  musicControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: '60%',
  },
  trackControlContatiner: {
    flexDirection: 'row',
		alignItems: 'center',
		columnGap: 20,
		marginRight: 16,
		paddingLeft: 16,
  }
});
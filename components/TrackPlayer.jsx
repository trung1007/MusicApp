import React, { useEffect, useState, useCallback } from 'react';
import useTimer from './time';
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
export const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious
      ],
      //
    });
    console.log("setupPlayer");
  } catch (error) { console.log(error); }
};

function MusicPlayer() {
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
  const currentSong = useActiveTrack()?? {
    title: "No song",
    artist: "No artist",
    artwork: "https://via.placeholder.com/300",
  }

  const playBackState = usePlaybackState();
  const progress = useProgress();



  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const { title, artwork, artist } = track;
      console.log(event.nextTrack);
      setTrackIndex(event.nextTrack);
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackArtwork(artwork);
    }
  });

  const gettrackdata = async () => {
    let trackIndex = await TrackPlayer.getCurrentTrack();
    let trackObject = await TrackPlayer.getTrack(trackIndex);
    console.log(trackIndex);
  };

  const togglePlayBack = async playBackState => {
    console.log('togglePlayBack', playBackState);
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack != null) {
      if ((playBackState.state === State.Paused) || (playBackState.state === State.Ready)) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  const nexttrack = async () => {
    if (trackIndex < podcastsCount - 1) {
      await TrackPlayer.skipToNext();
      gettrackdata();
    };
  };

  const previoustrack = async () => {
    if (trackIndex > 0) {
      await TrackPlayer.skipToPrevious();
      gettrackdata();
    };
  };



  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.mainWrapper}>
          <Image source={currentSong.artwork} style={styles.imageWrapper} />
        </View>
        <View style={styles.songText}>
          {/* <Image source={track.artwork} /> */}
          {/* <Text style={[styles.songContent, styles.songTitle]} numberOfLines={3}>{trackArtwork}</Text> */}
          <Text style={[styles.songContent, styles.songTitle]} numberOfLines={3}>{currentSong.title}</Text>
          <Text style={[styles.songContent, styles.songArtist]} numberOfLines={2}>{currentSong.artist}</Text>
        </View>
        <View style={styles.lyricsContainer}>
          <LyricsContainer lrc={`
 [00:00.00]Dreamers 
 [00:04.43]Jungkook BTS
 [00:09.11]`} currentTime={0}/>
        </View>
         
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
        <View style={styles.musicControlsContainer}>
          <TouchableOpacity onPress={previoustrack}>
            <Ionicons
              name="play-skip-back-outline"
              size={35}
              color="#FFFFFFFF"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => togglePlayBack(playBackState)}>
            <Ionicons
              name={
                playBackState.state === State.Playing
                  ? 'pause-circle-outline'
                  : 'play-circle-outline'
              }
              size={50}
              color="#FFFFFF"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={nexttrack}>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
        
      </View>
      <View>
      
      </View>
    </ScrollView>
  );
};

export default MusicPlayer;

export const LyricsContainer = ({ lrc, currentTime }) => {
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
      console.log(content);
      return (
        <Text
          style={{ textAlign: 'center', color: active ? 'white' : 'gray' }}>
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
      // style={{ height: 300}}
      lrc={lrc}
      currentTime={currentMillisecond}
      lineHeight={16}
      lineRenderer={lineRenderer}
      autoScroll
      autoScrollAfterUserScroll={500}
      // onCurrentLineChange={onCurrentLineChange}
    />
    <Text style={{color: 'white'}}>Hello world</Text>
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
  lyricsContainer: {
    flex: 1,
    justifyContent: 'center',
    color: '#FFF',
    backgroundColor: '#000000',
    // padding: 100
  }
});
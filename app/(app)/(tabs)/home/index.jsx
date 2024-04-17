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
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";

import SlideAblum1 from "../../../../components/SlideAlbum1";
import album1 from "../../../../components/album1";
import themeContext from "../../../../theme/themeContext";

const Home = () => {
  const theme = useContext(themeContext)

  return (
    <SafeAreaView
      style={[styles.wrapper, { backgroundColor: theme.backgroundColor }]}
    >
      {/* <Text style={[{color:theme.color}]}>Home page</Text> */}
      <View style={styles.title}>
        <Text style={[{ color: theme.color }, styles.titleText]}>KHÁM PHÁ</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.SOTD}>
          <Text style={[{ color: theme.color }, styles.SOTDtext]}>
            Nổi bật hôm nay
          </Text>
          <FlatList
          data={album1}
          renderItem={({ item }) => <SlideAblum1 item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={false}
        />
          <View></View>
        </View>
        <View style={styles.playlist}>
          <TouchableOpacity>
            <Text style={[styles.playlistText, { color: theme.color }]}>
              Có thể bạn muốn nghe
            </Text>
          </TouchableOpacity>
          {/* <FlatList
          data={silderMusic2}
          renderItem={({ item }) => <SlideImage2 item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={false}
        /> */}
        </View>
        <View style={styles.playlist}>
          <TouchableOpacity>
            <Text style={[styles.playlistText, { color: theme.color }]}>
              Vừa Nghe Vừa Lak
            </Text>
          </TouchableOpacity>
          {/* <FlatList
          data={MusicList3}
          renderItem={({ item }) => <SlideImage2 item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={false}
        /> */}
        </View>
        <View style={styles.playlist}>
          <TouchableOpacity>
            <Text style={[styles.playlistText, { color: theme.color }]}>
              Chill
            </Text>
          </TouchableOpacity>
          {/* <FlatList
            data={MusicList4}
            renderItem={({ item }) => <SlideImage2 item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={false}
          /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    title: {
      paddingLeft: 10,
      paddingTop: 10,
      paddingBottom: 10,
    },
    titleText: {
      fontSize: 24,
      fontWeight: "600",
      letterSpacing: 3,
    },
    content: {
      // paddingLeft: 10,
      // paddingRight: 10,
      marginBottom: 40,
    },
    SOTDtext: {
      fontSize: 18,
      fontWeight: "600",
      letterSpacing: 1,
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 10,
    },
    playlistText: {
      fontSize: 18,
      fontWeight: "600",
      letterSpacing: 1,
      paddingLeft: 10,
      marginBottom: 10,
    },
    playlist: {
      marginTop: 10,
      marginBottom: 10,
    },
  });

export default Home;

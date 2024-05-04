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
import SlideAlbum2 from "../../../../components/SlideAlbum2";

import themeContext from "../../../../theme/themeContext";
import { FIREBASE_DB } from "../../../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useFetchMusic } from "../../../../GlobalSongState";

const Home = () => {
  const theme = useContext(themeContext);
  // const [albumList, setAlbum] = useState([]);
  // const [headerAlbum, setHeaderAlbum] = useState([]);
  // const [album1, setAlbum1] = useState([]);
  // const [album2, setAlbum2] = useState([]);
  // const [album3, setAlbum3] = useState([]);

  const{headerAlbum1, album11, album21, album31} = useFetchMusic();
  // setHeaderAlbum(headerAlbum1)




  // const fetchAlbum = async () => {
  //   const albumTmp = [];

  //   const AlbumList = await getDocs(collection(FIREBASE_DB, "AlbumList"));
  //   AlbumList.forEach((doc) => {
  //     albumTmp.push({
  //       name: doc.data().name,
  //       image: doc.data().image,
  //       albumId: doc.data().album,
  //       musicList: doc.data().musicList
  //     });
  //   });
    
  //   setAlbum(albumTmp);
  //   setHeaderAlbum(
  //     albumTmp.filter((item) => item.albumId === "Nổi Bật Hôm Nay")
  //   );
  //   setAlbum1(
  //     albumTmp.filter((item)=>item.albumId==="Có Thể Bạn Muốn Nghe")
  //   )
  //   setAlbum2(
  //     albumTmp.filter((item)=>item.albumId==="Vừa Nghe Vừa Lak")
  //   )
  //   setAlbum3(
  //     albumTmp.filter((item)=>item.albumId==="Chill")
  //   )
  // };


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
            data={headerAlbum1}
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
          <FlatList
            data={album11}
            renderItem={({ item }) => <SlideAlbum2 item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={false}
          />
        </View>
        <View style={styles.playlist}>
          <TouchableOpacity>
            <Text style={[styles.playlistText, { color: theme.color }]}>
              Vừa Nghe Vừa Lak
            </Text>
          </TouchableOpacity>
          <FlatList
            data={album21}
            renderItem={({ item }) => <SlideAlbum2 item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={false}
          />
        </View>
        <View style={styles.playlist}>
          <TouchableOpacity>
            <Text style={[styles.playlistText, { color: theme.color }]}>
              Chill
            </Text>
          </TouchableOpacity>
          <FlatList
            data={album31}
            renderItem={({ item }) => <SlideAlbum2 item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={false}
          />
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

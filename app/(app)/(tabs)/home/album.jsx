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


const Album = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const theme = useContext(themeContext)
  const AlbumName = route.params[0].name;

  const [songAlbum, setSongAlubm] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [select, setSelect] = useState(false)

  const fetchMusic = async () => {
    const song = [];
    const MusicData = await getDocs(collection(FIREBASE_DB, AlbumName));
    MusicData.forEach((doc) => {
      song.push({
        name: doc.data().name,
        image: doc.data().image,
        singer: doc.data().singer,
        id: doc.data().id,
        music:doc.data().music
      });
    });
    setSongAlubm(song);
  };

  useEffect(() => {
    fetchMusic();
    setSelect(false)
  }, []);
  const [currentSong, setCurrentSong] = useState({})
  const handleSelectSong = (song) => {
    setSelectedSong(song);
    
    setSelect(true)
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
          <Image source={route.params[0].image} style={styles.albumImg} />

          {songAlbum.map((item) => (
            <AlbumSong 
            key={item.id}
            item={item} 
            // onSelectSong={handleSelectSong}
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

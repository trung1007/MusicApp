import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import themeContext from "../../../theme/themeContext";
import { AntDesign } from "@expo/vector-icons";
import { FIREBASE_DB } from "../../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import SearchSong from "../../../components/SearchSong";
import filter from "lodash.filter";

const Search = () => {
  const theme = useContext(themeContext);
  const textInputRef = useRef(null);
  const [musicList, setMusicList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [fullData, setFullData] = useState([]);

  const handlePress = () => {
    textInputRef.current.focus();
  };

  const fetchMusic = async () => {
    const musicTmp = [];

    const MusicList = await getDocs(collection(FIREBASE_DB, "Music"));
    MusicList.forEach((doc) => {
      musicTmp.push({
        image: doc.data().img,
        singer: doc.data().singer,
        name: doc.data().title,
        lyric: doc.data().uri,
      });
    });
    setMusicList(musicTmp);
    setFullData(musicTmp);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(fullData, (music) => {
      return contains(music, formattedQuery);
    });
    setMusicList(filteredData);
  };

  const contains = ({ name, singer }, query) => {
    const nameTmp = name.toLowerCase();
    const singerTmp = singer.toLowerCase();
    if (nameTmp.includes(query) || singerTmp.includes(query)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    fetchMusic();
  }, []);

  return (
    <SafeAreaView
      style={[styles.wrapper, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.title}>
        <Text style={[{ color: theme.color }, styles.titleText]}>TÌM KIẾM</Text>
      </View>
      <View style={styles.content}>
        <Pressable style={styles.searchBar} onPress={handlePress}>
          <AntDesign name="search1" size={24} color="white" />
          <TextInput
            ref={textInputRef}
            style={styles.textInput}
            placeholder="Bạn muốn nghe gì?"
            placeholderTextColor="white"
            color="white"
            value={searchQuery}
            onChangeText={(query) => handleSearch(query)}
          />
        </Pressable>
        <FlatList
          data={musicList}
          renderItem={({ item }) => <SearchSong item={item} />}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={false}
        />
      </View>
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
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchBar: {
    height: 60,
    marginRight: 10,
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 10,
    borderRadius: 10,
  },
  textInput: {
    height: 50,
  },
});

export default Search;

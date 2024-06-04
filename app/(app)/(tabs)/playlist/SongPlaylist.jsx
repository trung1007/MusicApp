import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import themeContext from "../../../../theme/themeContext";
import { useContext, useEffect, useState, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import { AuthProvider } from "../../../../context/AuthContext";
import { Feather } from "@expo/vector-icons";
import { FIREBASE_DB } from "../../../../config/firebase";
import { getDocs, addDoc, collection } from "firebase/firestore";
import SearchSong from "../../../../components/SearchSong";
import filter from "lodash.filter";


const ModalAddSongPlaylist = ({ toggleModal }) => {
  const closeModal = () => {
    toggleModal();
  };
  const [musicList, setMusicList] = useState([]);
  const textInputRef = useRef(null);
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
        id: doc.id,
        artwork: doc.data().artwork,
        artist: doc.data().artist,
        title: doc.data().title,
        url: doc.data().url,
        // lyric: doc.data().uri,
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

  const contains = ({ title, artist }, query) => {
    const nameTmp = title.toLowerCase();
    const singerTmp = artist.toLowerCase();
    if (nameTmp.includes(query) || singerTmp.includes(query)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    fetchMusic();
  }, []);

  return (
    <Modal animationType="slide">
      <View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "gray",
            paddingBottom: 5,
          }}
        >
          <Pressable
            onPress={closeModal}
            style={{ position: "absolute", right: 10 }}
          >
            <Feather name="x" size={24} color="gray" />
          </Pressable>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "600", letterSpacing: 1 }}>
              Thêm bài hát vào playlist
            </Text>
          </View>
        </View>
        <View>
          <Pressable style={styleModal.searchBar} onPress={handlePress}>
            <AntDesign name="search1" size={24} color="white" />
            <TextInput
              ref={textInputRef}
              style={styleModal.textInput}
              placeholder="Tìm kiếm bài hát để thêm vào playlist"
              placeholderTextColor="white"
              color="white"
              value={searchQuery}
              onChangeText={(query) => handleSearch(query)}
            />
          </Pressable>
        </View>
        <FlatList
          data={musicList}
          renderItem={({ item }) => <SearchSong item={item} />}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={false}
        />
      </View>
    </Modal>
  );
};

const styleModal = StyleSheet.create({
  searchBar: {
    height: 40,
    margin: 10,
    backgroundColor: "gray",
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

const SongPlaylist = () => {
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const route = useRoute();
  const param = route.params;
  const PlaylistName = param.newPlaylist || param.PlaylistName;
  const user = AuthProvider.user;
  const [modalSongPlaylist, setModalSongPlaylist] = useState(false);
  const addSongPlaylist = () => {
    setModalSongPlaylist(!modalSongPlaylist);
  };

  useEffect(() => {});
  return (
    <View style={[{ backgroundColor: theme.backgroundColor, flex: 1 }]}>
      <View style={{ padding: 10 }}>
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
        <View style={[styles.titleView, { borderColor: theme.color }]}>
          <Text style={[styles.playlistName, { color: theme.color }]}>
            {PlaylistName}
          </Text>
        </View>
        <Text
          style={[{ fontSize: 14, letterSpacing: 3 }, { color: theme.color }]}
        >
          {user.name}
        </Text>
        <TouchableOpacity
          style={styles.addPlaylistSong}
          onPress={addSongPlaylist}
        >
          <Text
            style={[
              { color: theme.color },
              { textTransform: "uppercase", letterSpacing: 2 },
            ]}
          >
            thêm bài hát
          </Text>
        </TouchableOpacity>
        {modalSongPlaylist && (
          <ModalAddSongPlaylist toggleModal={addSongPlaylist} />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  titleView: {
    height: 200,
    width: 200,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    marginBottom: 10,
  },
  playlistName: {
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 6,
    textTransform: "uppercase",
  },
  addPlaylistSong: {
    marginTop: 10,
    width: 160,
    height: 40,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "gray",
    borderRadius: 20,
  },
});

export default SongPlaylist;

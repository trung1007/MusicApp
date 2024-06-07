import { useContext, useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import { getDocs, collection, addDoc } from "firebase/firestore";
import themeContext from "../../../../theme/themeContext";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { FIREBASE_DB } from "../../../../config/firebase";
import { AuthProvider } from "../../../../context/AuthContext";
import PlaylistSong from "../../../../components/PlaylistSong";
import { useNavigation } from "@react-navigation/native";

const ModalAddPlaylist = ({ toggleModal }) => {
  const theme = useContext(themeContext);

  const [newPlaylist, setNewPlaylist] = useState("");
  const navigation = useNavigation();

  const closeModal = () => {
    toggleModal();
  };
  const user = AuthProvider.user;
  const UserId = user.id;
  const UserPlaylistCollection = collection(
    FIREBASE_DB,
    "User",
    UserId,
    "UserAlbum"
  );

  const addPlaylist = async () => {
    if (newPlaylist != "") {
      
      addDoc(UserPlaylistCollection, { albumName: newPlaylist, musicList: [] })
      .then((docRef) => {
        navigation.navigate("SongPlaylist", { newPlaylist, PlaylistList: [], id: docRef.id });
      })
      .catch((error) => {
        console.error("Error adding playlist: ", error);
      });
    }
    
  };

  return (
    <Modal
      animationType="slide"
      style={[styles.modal_wrapper, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.modal_container}>
        <View>
          <Pressable onPress={closeModal}>
            <Feather name="x" size={24} color="gray" />
          </Pressable>
          <Text style={{ fontSize: 16, color: "gray" }}>Tên Playlist</Text>
          <TextInput
            style={styles.modal_textInput}
            onChangeText={(value) => {
              setNewPlaylist(value);
            }}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              height: 40,
              width: 200,
              backgroundColor: "red",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 40,
            }}
            onPress={addPlaylist}
          >
            <Text
              style={{
                textTransform: "uppercase",
                color: "white",
                fontWeight: "600",
              }}
            >
              tạo playlist
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const Playlist = () => {
  const theme = useContext(themeContext);

  const [modalPlaylist, setModalPlaylist] = useState(false);

  const addPlaylist = () => {
    setModalPlaylist(!modalPlaylist);
  };

  const user = AuthProvider.user;
  const UserId = user.id;
  const [allPlaylist, setAllPlaylist] = useState([]);
  const UserPlaylistCollection = collection(
    FIREBASE_DB,
    "User",
    UserId,
    "UserAlbum"
  );

  const removePlaylist = (playlistId) => {
    setAllPlaylist(allPlaylist => allPlaylist.filter(playlist => playlist.id !== playlistId));
  }
  const getPlaylist = async () => {
    const playlist_tmp = [];

    const UserPlaylist = await getDocs(UserPlaylistCollection);

    UserPlaylist.forEach((doc) => {
      const PlaylistId = doc.id;
      playlist_tmp.push({
        PlaylistName: doc.data().albumName,
        PlaylistList: doc.data().musicList,
        id: PlaylistId,
      });
    });
    setAllPlaylist(playlist_tmp);
  };

  useEffect(() => {
    if (allPlaylist.length === 0) {
      getPlaylist();
    }
    // console.log(allPlaylist);
  }, [allPlaylist]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.title}>
        <Text style={[{ color: theme.color }, styles.titleText]}>
          Playlist Cá Nhân
        </Text>
      </View>
      <ScrollView style={styles.content}>
        <Pressable
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
          onPress={addPlaylist}
        >
          <TouchableOpacity onPress={addPlaylist}>
            <View
              style={{
                backgroundColor: "gray",
                borderRadius: 10,
                width: 60,
                height: 60,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 40 }}>+</Text>
            </View>
          </TouchableOpacity>
          <Text style={{ fontSize: 20 }}>Tạo playlist</Text>
        </Pressable>
        {modalPlaylist && <ModalAddPlaylist toggleModal={addPlaylist} />}
        <View>
          {allPlaylist.map((item) => {
            return (
              <PlaylistSong
                PlaylistName={item.PlaylistName}
                key={item.id}
                id={item.id}
                PlaylistList={item.PlaylistList}
                removePlaylistFromUI = {removePlaylist}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
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
    textTransform: "uppercase",
  },
  content: {
    marginLeft: 10,
  },
  modal_wrapper: {
    flex: 1,
  },
  modal_container: {
    padding: 10,
    flex: 1,
    justifyContent: "space-between",
  },
  modal_textInput: {
    height: 40,
    borderBottomWidth: 1,
  },
});

export default Playlist;

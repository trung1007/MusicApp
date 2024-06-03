import { useContext, useState } from "react";

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

const ModalAddPlaylist = ({ toggleModal }) => {
  const theme = useContext(themeContext);

  const closeModal = () => {
    toggleModal();
  };
  return (
    <Modal
      style={[styles.modal_wrapper, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.modal_container}>
        <View>
          <Pressable onPress={closeModal}>
            <Feather name="x" size={24} color="gray" />
          </Pressable>
          <Text style={{ fontSize: 16, color: "gray" }}>Tên Playlist</Text>
          <TextInput style={styles.modal_textInput} />
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
        <View></View>
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
    justifyContent:'space-between'
  },
  modal_textInput: {
    height: 40,
    borderBottomWidth: 1,
  },
});

export default Playlist;

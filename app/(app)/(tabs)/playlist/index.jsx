import { useContext } from "react";

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { getDocs, collection, addDoc } from "firebase/firestore";
import themeContext from "../../../../theme/themeContext";
import React from "react";

const Playlist = () => {
  const theme = useContext(themeContext);

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
        >
          <TouchableOpacity>
            <View style={{backgroundColor:'gray', borderRadius:10, width:60, height:60, alignItems:'center', justifyContent:'center'}}>
              <Text style={{ fontSize:40 }}>+</Text>
            </View>
          </TouchableOpacity>
          <Text style={{fontSize:20}}>Tạo playlist</Text>
        </Pressable>
        <View>
            
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
  content:{
    marginLeft:10
  }
});

export default Playlist;

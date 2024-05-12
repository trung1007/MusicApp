import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button, SafeAreaView } from "react-native";
import { Tabs } from "expo-router";
import { SongProvider } from "../../../context/SongContext";
import SongPlayer from "../../../components/SongPlayer";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import themeContext from "../../../theme/themeContext";
import { collection, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "../../../config/firebase";



const TabLayout = () => {
  const select = SongProvider.select;
  const [song, setSong] = useState({});

  const theme = useContext(themeContext);

  
  useEffect(() => {
    if (select) {
      setSong(SongProvider.song);
    }
  }, [select]);
  console.log(select)

  return (
    <SongProvider>
      <Tabs
        screenOptions={{
          header: () => {
            return (
              <View
                style={{ height: 50, backgroundColor: theme.backgroundColor }}
              ></View>
            );
          },
          tabBarInactiveTintColor: theme.iconInActiveColor,
          tabBarActiveTintColor: theme.iconActiveColor,
          tabBarStyle: {
            backgroundColor: theme.tabBarColor,
            position: "absolute",
          },
          tabBarLabelPosition: "below-icon",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Khám phá",
            tabBarIcon: ({ color }) => (
              <Entypo name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Tìm kiếm",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="search" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Cá nhân",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
       <SongPlayer />
    </SongProvider>
  );
};
export default TabLayout;

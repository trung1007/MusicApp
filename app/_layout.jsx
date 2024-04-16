import { Slot } from "expo-router";
import { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StatusBar } from "react-native";
import { AuthProvider } from "../context/AuthContext";
import { SongProvider } from "../context/SongContext";

import themeContext from "../theme/themeContext";
import theme from "../theme/theme";
import { EventRegister } from "react-native-event-listeners";
import TrackPlayer from "react-native-track-player";

const RootLayout = () => {
  TrackPlayer.registerPlaybackService(() => require("../service.js"));
  const STYLES = ["dark-content", "light-content"];

  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);

  const changeStatusBarStyle = () => {
    const styleId = STYLES.indexOf(statusBarStyle) + 1;
    if (styleId === STYLES.length) {
      setStatusBarStyle(STYLES[0]);
    } else {
      setStatusBarStyle(STYLES[styleId]);
    }
  };

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const listener = EventRegister.addEventListener("ChangeTheme", (data) => {
      setDarkMode(data);
      console.log(data);
      changeStatusBarStyle();
    });
    return () => {
      EventRegister.removeAllListeners(listener);
    };
  }, [darkMode]);

  return (
    <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
      <AuthProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Slot />
        </SafeAreaView>
      </AuthProvider>
    </themeContext.Provider>
  );
};

export default RootLayout;

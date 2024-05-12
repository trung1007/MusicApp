import { Slot } from "expo-router";
import { useState, useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { AuthProvider } from "../context/AuthContext";
import { SongProvider } from "../context/SongContext";
import { useCallback } from "react";
import themeContext from "../theme/themeContext";
import theme from "../theme/theme";
import { EventRegister } from "react-native-event-listeners";
import TrackPlayer from "react-native-track-player";
import { setupPlayer } from "../components/TrackPlayer";
import { SplashScreen } from "expo-router";
import { useSetupTrackPlayer } from "../hooks/useSetupTrackPlayer";
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const handleTrackPlayerLoaded = useCallback(() => {
		SplashScreen.hideAsync()
	}, [])

	useSetupTrackPlayer({
		onLoad: handleTrackPlayerLoaded,
	})

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const listener = EventRegister.addEventListener("ChangeTheme", (data) => {
      setDarkMode(data);
    });
    return () => {
      EventRegister.removeAllListeners(listener);
    };
  }, [darkMode]);
  // setupPlayer();
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

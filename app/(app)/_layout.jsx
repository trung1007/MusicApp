import { useState, useEffect, useContext } from "react";
import { EventRegister } from "react-native-event-listeners";

import { View, Text, SafeAreaView, Linking, } from "react-native";
import { Stack, Slot, Link, useNavigation } from "expo-router";
import themeContext from "../../theme/themeContext";
import { StatusBar } from "expo-status-bar";

const StackLayout = () => {
  const navigation = useNavigation();
  // Linking.getInitialURL().then((url) => {
  //   console.log('initial url: ', url);
  //   if (url === 'musicapp:///notification.click') {
  //     navigation.navigate("(playlist)");
  // }
  // })
  // Linking.addEventListener('url', (event) => {
  //   console.log('url: ', event.url);
  //   if (event.url === 'musicapp:///notification.click') {
  //     navigation.navigate("(playlist)");
  // }
  // })
  const theme = useContext(themeContext);

  const [statusBar, setStatusBar] = useState("");
  useEffect(() => {
    if (theme.theme === "light") {
      setStatusBar("dark");
    }
    if (theme.theme === "dark") {
      setStatusBar("light");
    }
  }, [theme]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style={statusBar} />
      <Stack >
        <Stack.Screen
          name="index"
          options={{
            title: "",
            headerStyle: {
              height: 0,
            },
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="Login"
          options={{
            title: "",
            headerStyle: {
              height: 0,
            },
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            title: "tabs",
            headerStyle: {
              height: 0,
              padding: 10,
            },
            header: () => {
              <SafeAreaView style={{ flex: 1 }}></SafeAreaView>;
            },
          }}
        />
      </Stack>
    </SafeAreaView>
  );
};
export default StackLayout;

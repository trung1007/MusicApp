import { useState, useEffect, useContext } from "react";
import { EventRegister } from "react-native-event-listeners";

import { View, Text, SafeAreaView, StatusBar } from "react-native";
import { Stack, Slot } from "expo-router";
import themeContext from "../../theme/themeContext";


const STYLES = ["dark-content", "light-content"];
const TRANSITIONS = ["fade", "slide", "none"];

const StackLayout = () => {

  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  

  const changeStatusBarVisibility = () => setHidden(!hidden);

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
      changeStatusBarStyle();
    });
    return () => {
      EventRegister.removeAllListeners(listener);
    };
  }, [darkMode]);


  const theme = useContext(themeContext)

  return (
    

    <SafeAreaView style={{flex:1}}>
      <StatusBar
            animated={true}
            backgroundColor={theme.color}
            barStyle={statusBarStyle}
            hidden={hidden}
            
          />
      <Stack>
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
              padding:10
            },
            header:()=>{
              <SafeAreaView style={{flex:1}}>

              </SafeAreaView>
            }
          }}
        />
      </Stack>
    </SafeAreaView>
  );
};
export default StackLayout;

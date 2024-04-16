import React, { useState, useContext } from "react";
import {
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  Switch,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "../../../../theme/themeContext";
import { AntDesign } from "@expo/vector-icons";


const Setting = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [darkMode, setDarkMode] = useState(false);
  const theme = useContext(themeContext);

  return (
    <SafeAreaView
      style={[{ flex: 1 }, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={{ paddingLeft: 10 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="arrowleft" size={24} style={{color:theme.color}} />
        </TouchableOpacity>
      </View>

      <Text style={[{ color: theme.color }]}>setting</Text>
      <Switch
        value={darkMode}
        onValueChange={(value) => {
          setDarkMode(value), EventRegister.emit("ChangeTheme", value);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Setting;

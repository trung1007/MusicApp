import React, { useState, useContext } from "react";
import {
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  Switch,
  TouchableOpacity,
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
          <AntDesign
            name="arrowleft"
            size={24}
            style={{ color: theme.color }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.darkMode}>
        <Text style={[{ color: theme.color, fontSize:18, letterSpacing:1 }]}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={(value) => {
            setDarkMode(value), EventRegister.emit("ChangeTheme", value);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  darkMode:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    padding:10
  }
});

export default Setting;

import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
export default function LyricScreen({lines, currentTime}) {
    console.log("line",lines);
    // console.log("currentTime",currentTime);
  return (
    <FlatList 
    data={lines}
    showsVerticalScrollIndicator={false}
    renderItem={({item}) => <Text style={item.startMillisecond <= currentTime ? style.highlight : style.normal}>{item.content}</Text>}
    keyExtractor={item => item.lineNumber}
    />
  )

  
}


const style = StyleSheet.create({
    highlight: {
        color: 'blue',
        textAlign: 'center'
    },
    normal: {
        color: 'white',
        textAlign: 'center'
    }
})
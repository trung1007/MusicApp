import React from 'react'
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native'
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
        color: 'yellow',
        textAlign: 'center',
        width: Dimensions.get('screen').width,
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 10
    },
    normal: {
        color: 'white',
        textAlign: 'center',
        width: Dimensions.get('screen').width,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10
        
    }
})
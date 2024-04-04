import React from "react"
import { View, Text } from "react-native"
import { HomeMainFont } from "../../styles/homeStyles"

export function GameCollections(props) {
    const { sharedStyles } = props
    
    return (
        <View>
            <HomeMainFont>Game Collections</HomeMainFont>
            <Text style={sharedStyles.title}>Game Collections</Text>
        </View>
    )
}
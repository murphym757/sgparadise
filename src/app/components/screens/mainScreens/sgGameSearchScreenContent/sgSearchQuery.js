import React, { useContext, useEffect, useState } from 'react'
import { 
    View,
    Image
} from 'react-native'
import {CurrentThemeContext} from '../../../../../../assets/styles/globalTheme'
import {
    SearchGameTitle,
    SearchGameData
} from '../../index'

export default function SgSearchQuery(props) {
    const colors = useContext(CurrentThemeContext)
    let gameCharacterLength = (props.name).length
    const gameNameFont = gameCharacterLength <= 20 ? 15 : 9

    return (
        <View style={{
            flexDirection: 'column',
            flex: 1,
            marginBottom: 120
          }}>
            <Text>This is where you'll confirm your chose</Text>
        </View>
    )
}
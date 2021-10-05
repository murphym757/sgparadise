import React, { useContext, useEffect, useState } from 'react'
import { 
    View,
    Text,
    Image
} from 'react-native'
import {CurrentThemeContext} from '../../../../../../assets/styles/globalTheme'
// React Navigation
import { createStackNavigator } from '@react-navigation/stack'
import {
    SafeAreaViewContainer,
    ContentContainer,
    SearchGameTitle,
    SearchGameData,
    FontAwesomeIcon,
    faChevronLeft
} from '../../index'

export default function ConfirmAddGameScreen({navigation, route}, props) {
    const colors = useContext(CurrentThemeContext)
    const { 
        igdbGameId,
        igdbGameName,
        igdbGameCover,
        igdbGameRating,
        igdbGameAgeRating,
        igdbGameGenres,
        igdbGameScreenshots,
        igdbGameSummary,
        igdbUnixTimestamp, 
        itemId 
    } = route.params
    console.log("This is it tho" + igdbGameName)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
          }, 2500)
    })

    function confirmGameScreen() {
        return (
            <View style={{
                flexDirection: 'column',
                flex: 1,
                marginBottom: 120
            }}>
            <View style={{ alignItems: 'left', justifyContent: 'center', backgroundColor: colors.primaryColor }}>
                <FontAwesomeIcon 
                    icon={ faChevronLeft } color={colors.primaryFontColor} size={50} 
                    onPress={() => navigation.navigate('SgConsoleOptions')}
                />
            </View>
                <Text>{JSON.stringify(igdbGameId)}</Text>
                <Text>{JSON.stringify(igdbGameName)}</Text>
                <Text>{JSON.stringify(igdbGameRating)}</Text>
                <Text>{JSON.stringify(igdbGameSummary)}</Text>
                <Text>This is where youll confirm your chose</Text>
            </View>
        )
    }

    return (
        <SafeAreaViewContainer>
            {confirmGameScreen()}
        </SafeAreaViewContainer>
    )
}
import React, { useState, useEffect, useContext } from 'react';
import { 
    Text,
    View,
    Image,
    FlatList,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'
  import{
    windowHeight,
    MainFont,
    MainSubFont,
    MainHeading,
    MainHeadingButton,
    ScrollViewContainer
} from '../../../../../../../assets/styles/globalStyling'
import {CurrentThemeContext} from '../../../../../../../assets/styles/globalTheme'
// React Navigation
import { useIsFocused } from '@react-navigation/native';
import {
        SafeAreaViewContainer,
        Container,
        TouchableButton,
        TouchableButtonFont,
        TouchableButtonAlt,
        TouchableButtonFontAlt,
        CustomInputField,
        FontAwesomeIcon, faTimes
  } from '../../../index'
import { useTags } from '../../../authScreens/tagsContext'
import { firebase, gamesConfig } from '../../../../../../server/config/config'
import { useAuth } from '../../../authScreens/authContext'
  

    

export default function SgSelectedGameConfirmationScreen({route, navigation}) {
    const {
        unixTimestampConverter,
        forwardToNextPage,
        backToPreviousPage
    } = useAuth()
    const {
        gameConfirmationResults
    } = useTags()
    //let { searchBarTitle, searchType, searchQuery } = route.params
    const colors = useContext(CurrentThemeContext)
    const sgDB = firebase.firestore()
    const [isLoading, setIsLoading] = useState()
    const { 
        involvesCompanies,
        gameCover,
        gameGenre,
        gameId,
        gameModes,
        gameName,
        gameSlug,
        gameRating, 
        gameReleaseDate,
        gameSubGenre,
        gameScreenshots,
        gameStoryline,
        gameSummary,
    } = route.params
        console.log("🚀 ~ file: sgSelectedGameConfirmationScreen.js ~ line 65 ~ SgSelectedGameConfirmationScreen ~ gameCover", gameCover)
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read
    const pageDescription = `Display All of the Game's data here. In the form of a list, maybe?`
    const nextPageNumber = 'Page10'
    const passingContent = {
        gameCover: gameCover,
        gameGenre: gameGenre,
        gameId: gameId,
        gameModes: gameModes,
        gameName: gameName,
        gameSlug: gameSlug,
        gameRating: gameRating, 
        gameReleaseDate: gameReleaseDate,
        gameScreenshots: gameScreenshots,
        gameStoryline: gameStoryline,
        gameSubGenre: gameSubGenre,
        gameSummary: gameSummary,
        involvesCompanies: involvesCompanies
    }
    const navigationPass = navigation
    let tagArrayData = {
        pageDescription,
        passingContent
    }
    const buttonGroupData = {
        forwardToNextPage, 
        backToPreviousPage, 
        nextPageNumber, 
        navigationPass
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
          }, 2000)
      }, [isFocused]);

    return (
        <View style={{ flex: 1, paddingTop: windowHeight/20, paddingBottom: windowHeight/20, backgroundColor: colors.primaryColor }}>
            <SafeAreaViewContainer>
            {isLoading == undefined
                ? <ActivityIndicator size="large" hidesWhenStopped="true"/>
                : <View>
                    {gameConfirmationResults(tagArrayData, buttonGroupData, windowHeight, undefined)}
                </View>
            }
            </SafeAreaViewContainer>
        </View>
    )
}
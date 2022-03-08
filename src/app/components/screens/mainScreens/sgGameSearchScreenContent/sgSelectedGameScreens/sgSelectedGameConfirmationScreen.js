import React, { useState, useEffect, useContext } from 'react'
import { View, ActivityIndicator } from 'react-native'
// React Navigation
import { useIsFocused } from '@react-navigation/native'
import {
    confirmGameContext,
    firebase,
    PageContainer,
    SafeAreaViewContainer,
    useAuth,
    windowHeight
} from '../../../index'
  
export default function SgSelectedGameConfirmationScreen({route, navigation}) {
    const {
        backToPreviousPage,
        currentUID,
        toNewStack,
        addGameToConsoleButtonGroup
    } = useAuth()
    //let { searchBarTitle, searchType, searchQuery } = route.params
    const confirmGame = useContext(confirmGameContext)
    const [isLoading, setIsLoading] = useState()
    
    const { 
        firebaseConsoleName,
        firebaseStorageConsoleName,
        consoleName,
        gameCover,
        gameDevelopers,
        gameGenre,
        gameModes,
        gameName,
        gameNameBRZ,
        gameNameEUR,
        gameNameJPN,
        gamePublishers,
        gameRating, 
        gameReleaseDate,
        gameScreenshots,
        gameSlug,
        gameSubGenre,
        gameSummary
    } = route.params
  
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read
    const [gameUploaded, setGameUploaded] = useState(false)
    const pageDescription = `Here is all the information about ${gameName}. Is there anything you would like to change?`
    const stackName = 'Game'
    const screenName = 'sgUserStackNavbar'
    const confirmationPage = true
    const passingContent = {
        consoleName: consoleName,
        firebaseConsoleName: firebaseConsoleName,
        firebaseStorageConsoleName: firebaseStorageConsoleName,
        gameCover: gameCover,
        gameDevelopers: gameDevelopers.map(game => game[0].name),
        gameGenre: gameGenre,
        gameModes: gameModes.map(game => game.tagName),
        gameName: gameName,
        gameNameBRZ: gameNameBRZ,
        gameNameEUR: gameNameEUR,
        gameNameJPN: gameNameJPN,
        gamePublishers: gamePublishers.map(game => game[0].name),
        gameRating: gameRating, 
        gameReleaseDate: gameReleaseDate,
        gameScreenshots: gameScreenshots,
        gameSlug: gameSlug,
        gameSubGenre: gameSubGenre,
        gameSummary: gameSummary,
        gameUploadedBy: currentUID
    }
    console.log("🚀 ~ file: sgSelectedGameConfirmationScreen.js ~ line 67 ~ SgSelectedGameConfirmationScreen ~ passingContent", passingContent)
    const navigationPass = navigation
    let tagArrayData = {
        pageDescription
    }
    const buttonGroupData = {
        toNewStack, 
        backToPreviousPage, 
        stackName,
        screenName,
        passingContent, 
        navigationPass
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
          }, 2000)
      }, [isFocused]);

    return (
        <PageContainer>
            <SafeAreaViewContainer>
            {isLoading == undefined
                ? <ActivityIndicator size="large" hidesWhenStopped="true"/>
                : <View>
                    {confirmGame.gameConfirmationResults(tagArrayData, buttonGroupData, windowHeight, confirmationPage, undefined)}
                    {addGameToConsoleButtonGroup(buttonGroupData)}
                </View>
            }
            </SafeAreaViewContainer>
        </PageContainer>
    )
}
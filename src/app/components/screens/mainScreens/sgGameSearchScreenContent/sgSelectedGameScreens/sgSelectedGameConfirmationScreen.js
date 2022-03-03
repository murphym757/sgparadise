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
        forwardToNextPage,
        addGameToConsoleButtonGroup
    } = useAuth()
    //let { searchBarTitle, searchType, searchQuery } = route.params
    const confirmGame = useContext(confirmGameContext)
    const sgDB = firebase.firestore()
    const [isLoading, setIsLoading] = useState()
    
    const { 
        gameCover,
        gameDevelopers,
        gameGenre,
        gameModes,
        gameName,
        gamePublishers,
        gameRating, 
        gameReleaseDate,
        gameScreenshots,
        gameSlug,
        gameSubGenre,
        gameSummary,
        igdbConsoleId
    } = route.params
  
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read
    const [consoleName, setConsoleName] = useState()
    const [firebaseConsoleName, setFirebaseConsoleName] = useState()
    const [gameUploaded, setGameUploaded] = useState(false)
    const pageDescription = `Here is all the information about ${gameName}. Is there anything you would like to change?`
    const nextPageNumber = 'Page10'
    const confirmationPage = true
    const passingContent = {
        consoleName: consoleName,
        firebaseConsoleName: firebaseConsoleName,
        gameCover: gameCover,
        gameDevelopers: gameDevelopers.map(game => game[0].name),
        gameGenre: gameGenre,
        gameModes: gameModes.map(game => game.tagName),
        gameName: gameName,
        gamePublishers: gamePublishers.map(game => game[0].name),
        gameRating: gameRating, 
        gameReleaseDate: gameReleaseDate,
        gameScreenshots: gameScreenshots,
        gameSlug: gameSlug,
        gameSubGenre: gameSubGenre,
        gameSummary: gameSummary,
        gameUploadedBy: currentUID,
        gameUploaded: gameUploaded
    }
    console.log("🚀 ~ file: sgSelectedGameConfirmationScreen.js ~ line 67 ~ SgSelectedGameConfirmationScreen ~ passingContent", passingContent)
    const navigationPass = navigation
    let tagArrayData = {
        pageDescription
    }
    const buttonGroupData = {
        forwardToNextPage, 
        backToPreviousPage, 
        nextPageNumber,
        passingContent, 
        navigationPass
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false),
            findConsoleName(igdbConsoleId)
          }, 2000)
      }, [isFocused]);

    function findConsoleName(igdbConsoleId) {
        if (igdbConsoleId == 29) return  setConsoleName('Genesis'), setFirebaseConsoleName('sgGenesis')
        if (igdbConsoleId == 84) return  setConsoleName('SG-1000'), setFirebaseConsoleName('sg1000')
        if (igdbConsoleId == 64) return  setConsoleName('Master System'), setFirebaseConsoleName('sgMS')
        if (igdbConsoleId == 35) return  setConsoleName('Game Gear'), setFirebaseConsoleName('sgGG')
        if (igdbConsoleId == 32) return  setConsoleName('Saturn'), setFirebaseConsoleName('sgSat')
        if (igdbConsoleId == 31) return  setConsoleName('32x'), setFirebaseConsoleName('sgG32X')
        if (igdbConsoleId == 78) return  setConsoleName('Sega CD'), setFirebaseConsoleName('sgCD')
    }

    return (
        <PageContainer>
            <SafeAreaViewContainer>
            {isLoading == undefined
                ? <ActivityIndicator size="large" hidesWhenStopped="true"/>
                : <View>
                    {confirmGame.gameConfirmationResults(tagArrayData, buttonGroupData, windowHeight, confirmationPage, undefined)}
                </View>
            }
            </SafeAreaViewContainer>
        </PageContainer>
    )
}
import React, { useState, useEffect, useContext } from 'react'
import { View, ActivityIndicator } from 'react-native'
// React Navigation
import { useIsFocused } from '@react-navigation/native'
import {
    AppWideImageContext,
    confirmGameContext,
    firebase,
    PageContainer,
    SafeAreaViewContainer,
    useAuth,
    windowHeight
} from 'index'
  
export default function SgSelectedGameConfirmationScreen({route, navigation}) {
    const {
        addGameToConsoleButtonGroup,
        backToPreviousPage,
        currentUID,
        toNewStack
    } = useAuth()
    //let { searchBarTitle, searchType, searchQuery } = route.params
    const confirmGame = useContext(confirmGameContext)
    const images = useContext(AppWideImageContext)
    const [isLoading, setIsLoading] = useState()
    
    const { 
        consoleName,
        firebaseConsoleName,
        firebaseCoverUrl,
        firebaseScreenshot1Url,
        firebaseScreenshot2Url,
        firebaseScreenshot3Url,
        firebaseStorageConsoleName,
        gameCover,
        gameDevelopers,
        gameGenre,
        gameModes,
        gameName,
        gameNameBRZ,
        gameNameEUR,
        gameNameImageCount,
        gameNameJPN,
        gameNameMatchInSgDB,
        gamePublishers,
        gameRating, 
        gameReleaseDate,
        gameSlug,
        gameSubgenre,
        gameSummary,
        sortedGameName
    } = route.params
  
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read
    const [gameUploaded, setGameUploaded] = useState(false)
    const pageDescription = `Here is all the information about ${gameName}. Is there anything you would like to change?`
    const stackName = 'Game'
    const screenName = 'SgUserStackNavbar'
    const confirmationPage = true
    const passingContent = {
        consoleName,
        firebaseConsoleName,
        firebaseCoverUrl,
        firebaseScreenshot1Url,
        firebaseScreenshot2Url,
        firebaseScreenshot3Url,
        firebaseStorageConsoleName,
        gameCover,
        gameDevelopers: gameDevelopers.map(game => game[0].name),
        gameGenre,
        gameModes: gameModes.map(game => game.tagName),
        gameName,
        gameNameBRZ,
        gameNameEUR,
        gameNameImageCount,
        gameNameJPN,
        gameNameMatchInSgDB,
        gamePublishers: gamePublishers.map(game => game[0].name),
        gameRating, 
        gameReleaseDate,
        gameSgID: complexID(20),
        gameSlug,
        gameSubgenre,
        gameSummary,
        gameUploadedBy: currentUID,
    }
    
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
      }, [isFocused])


    function confirmationGameCoverImage(buttonGroupData) {
        const imageData = {
            height: 200,
            width: 150,
            marginVertical: 15,
            contentFit: 'stretch',
            borderRadius: 25,
            source: `https://images.igdb.com/igdb/image/upload/t_1080p/${buttonGroupData.passingContent.gameCover}.jpg`
        }
        return images.gameCoverImageConfirmationScreen(imageData)
    }


    function complexID(characterLength) {
        const randomString = (n, r='') => {
            while (n--) r += String.fromCharCode((r=Math.random()*62|0, r+=r>9?(r<36?55:61):48))
            return r
        }
        return randomString(characterLength)
    }

    return (
        <PageContainer>
            <SafeAreaViewContainer>
            {isLoading == undefined
                ? <ActivityIndicator size="large" hidesWhenStopped="true"/>
                : <View>
                    {confirmGame.gameConfirmationResults(tagArrayData, buttonGroupData, windowHeight, undefined, confirmationGameCoverImage)}
                    {addGameToConsoleButtonGroup(buttonGroupData)}
                </View>
            }
            </SafeAreaViewContainer>
        </PageContainer>
    )
}
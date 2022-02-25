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
        forwardToNextPage,
        backToPreviousPage
    } = useAuth()
    //let { searchBarTitle, searchType, searchQuery } = route.params
    const confirmGame = useContext(confirmGameContext)
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
  
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read
    const pageDescription = `Here is all the information about ${gameName}. Is there anything you would like to change?`
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
            setIsLoading(false)
          }, 2000)
      }, [isFocused]);

    return (
        <PageContainer>
            <SafeAreaViewContainer>
            {isLoading == undefined
                ? <ActivityIndicator size="large" hidesWhenStopped="true"/>
                : <View>
                    {confirmGame.gameConfirmationResults(tagArrayData, buttonGroupData, windowHeight, undefined)}
                </View>
            }
            </SafeAreaViewContainer>
        </PageContainer>
    )
}
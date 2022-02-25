
import React, { useState, useEffect, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import {
    confirmGameContext,
    CurrentThemeContext,
    PageContainer,
    SafeAreaViewContainer,
    useAuth,
    windowHeight,
} from '../../../index';

export default function SgSelectedGameSummaryScreen({route, navigation}) {
    const {
        forwardToNextPage,
        backToPreviousPage,
        charLimit
    } = useAuth()
    //let { searchBarTitle, searchType, searchQuery } = route.params
    const colors = useContext(CurrentThemeContext)
    const confirmGame = useContext(confirmGameContext)
    const [isLoading, setIsLoading] = useState()
    const { 
        igdbGameId,
        gameName,
        gameSlug,
        gameCover,
        gameRating,
        gameReleaseDate,
        gameStoryline,
        gameSummary,
        gameScreenshots,
        involvesCompanies
    } = route.params


    // IGDB search data (Put on confirmation page)
    const [updatedGameSummary, setUpdatedGameSummary] = useState(gameSummary)
    const pageDescription = `What is ${gameName} about, exactly?`
    const [nextPageNumber, setNextPageNumber] = useState('Page5')
    const passingContent = {
        involvesCompanies: involvesCompanies,
        gameRating: gameRating,
        gameCover: gameCover, 
        gameId: igdbGameId,
        gameName: gameName,
        gameSlug: gameSlug,
        gameReleaseDate: gameReleaseDate,
        gameStoryline: gameStoryline,
        gameSummary: updatedGameSummary,
        gameScreenshots: gameScreenshots
    }
    const navigationPass = navigation
    const buttonGroupData = {
        backToPreviousPage, 
        charLimit,
        forwardToNextPage, 
        navigationPass,
        nextPageNumber, 
        pageDescription,
        passingContent
    }

    useEffect(() => {
            return new Promise(resolve => {
                setTimeout(() => {
                  resolve(
                        setIsLoading(false),
                        setUpdatedGameSummary(charLimit(gameSummary, 500))
                        )
                        if (gameScreenshots == 0) {
                            return setNextPageNumber('Page6')
                       } else {
                            return nextPageNumber
                       }
                }, 2000)
              })
            }, [])

    return (
        <PageContainer>
            <SafeAreaViewContainer>
                {isLoading == undefined
                    ? <ActivityIndicator size="large" hidesWhenStopped="true"/>
                    : <View>
                        {confirmGame.gameSummaryResults(buttonGroupData, updatedGameSummary, setUpdatedGameSummary, windowHeight, colors)}
                    </View>
                }
            </SafeAreaViewContainer>
        </PageContainer>
    )
}
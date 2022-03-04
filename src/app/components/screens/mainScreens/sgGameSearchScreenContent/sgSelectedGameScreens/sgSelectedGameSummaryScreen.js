
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
import axios from 'axios'

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
        consoleName,
        firebaseConsoleName,
        gameCover,
        gameDevelopers,
        gameId,
        gameName,
        gamePublishers,
        gameRating,
        gameReleaseDate,
        gameScreenshots,
        gameSlug,
        gameSummary,
    } = route.params

    // IGDB search data (Put on confirmation page)
    const [updatedGameSummary, setUpdatedGameSummary] = useState(gameSummary)
    const [chosenPublishersArray, setChosenPublishersArray] = useState([])
    const [chosenDevelopersArray, setChosenDevelopersArray] = useState([])
    const pageDescription = `What is ${gameName} about, exactly?`
    const [nextPageNumber, setNextPageNumber] = useState('Page5')
    const passingContent = {
        consoleName: consoleName,
        firebaseConsoleName: firebaseConsoleName,
        gameCover: gameCover, 
        gameDevelopers: chosenDevelopersArray,
        gameId: gameId,
        gameName: gameName,
        gamePublishers: chosenPublishersArray,
        gameRating: gameRating,
        gameReleaseDate: gameReleaseDate,
        gameScreenshots: gameScreenshots,
        gameSlug: gameSlug,
        gameSummary: updatedGameSummary
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
        function searchTesting() {
            let api = axios.create({
                headers: {
                    'Accept': 'application/json',
                    "Client-ID": route.params.clientIdIGDB,
                    "Authorization": `Bearer ${route.params.accessTokenIGDB}`
                }
            })
            let gamePubParams = []
            let gameDevParams = []
            return new Promise(resolve => {
                setTimeout(() => {
                  resolve(
                    gamePublishers.map(item => gamePubParams.push(
                        api.post('https://api.igdb.com/v4/companies', `fields country,name;  where id = (${item});`, {timeout: 2000})
                        .then(res => {
                            setChosenPublishersArray(gamePublishersNameInfo => [...gamePublishersNameInfo, res.data])
                        }, [])
                        .catch(err => {
                            console.log(err);
                        })
                        .then(function () {
                            // always executed
                        }),
                    )),
                    gameDevelopers.map(item => gameDevParams.push(
                        api.post('https://api.igdb.com/v4/companies', `fields country,name;  where id = (${item});`, {timeout: 2000})
                        .then(res => {
                            setChosenDevelopersArray(gameDevelopersNameInfo => [...gameDevelopersNameInfo, res.data])
                        }, [])
                        .catch(err => {
                            console.log(err);
                        })
                        .then(function () {
                            // always executed
                        }),
                    )),
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
            }

        async function sgLoader() {
            await searchTesting()
        }
        sgLoader()
        
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
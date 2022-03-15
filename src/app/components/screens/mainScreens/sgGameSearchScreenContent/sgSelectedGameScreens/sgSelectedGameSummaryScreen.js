
import React, { useState, useEffect, useContext } from 'react'
import { View, ActivityIndicator } from 'react-native'
import {
    confirmGameContext,
    CurrentThemeContext,
    PageContainer,
    SafeAreaViewContainer,
    useAuth,
    windowHeight,
} from 'index'
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
        accessTokenIGDB,
        clientIdIGDB,
        consoleName,
        firebaseConsoleName,
        firebaseStorageConsoleName,
        gameCover,
        gameDevelopers,
        gameId,
        gameName,
        gameNameBRZ,
        gameNameEUR,
        gameNameJPN,
        gameNameMatchInSgDB,
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
    const igdbCompaniesURL = 'https://api.igdb.com/v4/companies'
    const igdbCompaniesResultsField = `fields country,name; where id =`
    const axiosTimeout = {timeout: 2000}
    const pageDescription = `What is ${gameName} about, exactly?`
    const [nextPageNumber, setNextPageNumber] = useState('Page5')
    const passingContent = {
        consoleName,
        firebaseConsoleName,
        firebaseStorageConsoleName,
        gameCover, 
        gameDevelopers: chosenDevelopersArray,
        gameId,
        gameName,
        gameNameBRZ,
        gameNameEUR,
        gameNameJPN,
        gameNameMatchInSgDB,
        gamePublishers: chosenPublishersArray,
        gameRating,
        gameReleaseDate,
        gameScreenshots,
        gameSlug,
        gameSummary: updatedGameSummary
    }
    console.log("🚀 ~ file: sgSelectedGameSummaryScreen.js ~ line 56 ~ SgSelectedGameSummaryScreen ~ passingContent", passingContent)
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
                    'Client-ID': clientIdIGDB,
                    'Authorization': `Bearer ${accessTokenIGDB}`
                }
            })
            let gamePubParams = []
            let gameDevParams = []
            return new Promise(resolve => {
                setTimeout(() => {
                  resolve(
                    gamePublishers.map(item => gamePubParams.push(
                        api.post(igdbCompaniesURL, `${igdbCompaniesResultsField}(${item});`, axiosTimeout)
                            .then(res => {
                                setChosenPublishersArray(gamePublishersNameInfo => [...gamePublishersNameInfo, res.data])
                            }, [])
                            .catch(err => {
                                console.log(err)
                            })
                            .then(function () {
                                // always executed
                            })
                    )),
                    gameDevelopers.map(item => gameDevParams.push(
                        api.post(igdbCompaniesURL, `${igdbCompaniesResultsField}(${item});`, axiosTimeout)
                            .then(res => {
                                setChosenDevelopersArray(gameDevelopersNameInfo => [...gameDevelopersNameInfo, res.data])
                            }, [])
                            .catch(err => {
                                console.log(err)
                            })
                            .then(function () {
                                // always executed
                            }) 
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
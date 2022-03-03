
import React, { useState, useEffect, useContext } from 'react'
import { View, Image, FlatList, ActivityIndicator } from 'react-native'
import { confirmGameContext, ContentContainer, PageContainerCover, CurrentThemeContext, SafeAreaViewContainer, useAuth } from '../../../index'
import axios from 'axios'

export default function SgSelectedGameCoverScreen({route, navigation}) {
    const {
        forwardToNextPage,
        backToPreviousPage,
    } = useAuth()
    //let { searchBarTitle, searchType, searchQuery } = route.params
    const colors = useContext(CurrentThemeContext)
    const confirmGame = useContext(confirmGameContext)
    const [isLoading, setIsLoading] = useState()
    const { 
        accessTokenIGDB,
        clientIdIGDB,
        gameName,
        gameReleaseDate,
        gameSlug,
        gameSummary,
        igdbConsoleId,
        igdbGameId
    } = route.params

    const [coversResults, setCoversResults] = useState([])
    const gameCover = coversResults.map(game => game.image_id)
    const [gameDevelopers, setGameDevelopersResults] = useState([])
    const [gamePublishers, setGamePublishersResults] = useState([])
    const [gameScreenshots, setGameScreenshots] = useState([])
    const [updatedGameRating, setUpdatedGameRating] = useState()
    const igdbCoversResultsField = `fields image_id; where game = (${igdbGameId});`
    const igdbScreenshotsResultsField = `fields image_id; where game = (${igdbGameId});`
    const igdbInvolvesCompaniesResultsPubField =`fields company,publisher; where publisher = true & game = (${igdbGameId});`
    const igdbInvolvesCompaniesResultsDevField =`fields company,developer; where developer = true & game = (${igdbGameId});`
    const nextPageNumber = 'Page4'
    const passingContent = {
        accessTokenIGDB: accessTokenIGDB, 
        clientIdIGDB: clientIdIGDB,
        gameCover: gameCover, 
        gameDevelopers: gameDevelopers.map(game => game.company),
        gameId: igdbGameId,
        gameName: gameName,
        gamePublishers: gamePublishers.map(game => game.company),
        gameRating: updatedGameRating,
        gameReleaseDate: gameReleaseDate,
        gameScreenshots: gameScreenshots.map(game => game.image_id),
        gameSlug: gameSlug,
        gameSummary: gameSummary,
        igdbConsoleId: igdbConsoleId

    }
    console.log("🚀 ~ file: sgSelectedGameCoverScreen.js ~ line 53 ~ SgSelectedGameCoverScreen ~ passingContent", passingContent)
    const navigationPass = navigation
    const buttonGroupData = {
        backToPreviousPage, 
        forwardToNextPage, 
        navigationPass,
        nextPageNumber,
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
            return new Promise(resolve => {
                setTimeout(() => {
                  resolve(
                    api.post('https://api.igdb.com/v4/covers', igdbCoversResultsField, {timeout: 2000})
                        .then(res => {
                            setCoversResults(res.data)
                        }, [])
                        .catch(err => {
                            console.log(err);
                        })
                        .then(function () {
                            // always executed
                        }),
                    api.post('https://api.igdb.com/v4/screenshots', igdbScreenshotsResultsField, {timeout: 2000})
                        .then(res => {
                            setGameScreenshots(res.data)
                        }, [])
                        .catch(err => {
                            console.log(err);
                        })
                        .then(function () {
                            // always executed
                        }),
                    api.post('https://api.igdb.com/v4/involved_companies', igdbInvolvesCompaniesResultsPubField, {timeout: 2000})
                        .then(res => {
                            setGamePublishersResults(res.data)
                        }, [])
                        .catch(err => {
                            console.log(err);
                        })
                        .then(function () {
                            // always executed
                        }),
                        api.post('https://api.igdb.com/v4/involved_companies', igdbInvolvesCompaniesResultsDevField, {timeout: 2000})
                        .then(res => {
                            setGameDevelopersResults(res.data)
                        }, [])
                        .catch(err => {
                            console.log(err);
                        })
                        .then(function () {
                            // always executed
                        }),
                        setIsLoading(false))
                }, 2000)
              })
            }

        async function sgLoader() {
            await searchTesting()
        }
        sgLoader()
        
    }, [])

    function gameCoverImage(buttonGroupData, updatedGameRating, setUpdatedGameRating, colors) {
        return (
            <ContentContainer>
                <FlatList
                    data={coversResults}
                    keyboardShouldPersistTaps="always" 
                    contentContainerStyle={{
                        justifyContent: 'center'
                    }}
                    scrollEnabled={false}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={{
                            width: '100%',
                            height: undefined,
                        }}>
                            <Image
                                style={{
                                    height: 500,
                                    width: 380,
                                    marginVertical: 15,
                                    resizeMode: 'stretch',
                                    borderRadius: 25,
                                }}
                                source={{
                                    uri: `https://images.igdb.com/igdb/image/upload/t_1080p/${gameCover}.jpg`,
                                }}
                                onLoadStart={() => {setIsLoading(true)}}
                                onLoadEnd={() => {setIsLoading(false)}}
                            />
                            {confirmGame.starRatingSystem(buttonGroupData, updatedGameRating, setUpdatedGameRating, colors)}
                            {confirmGame.buttonGroup(buttonGroupData)}
                            {isLoading && (
                                <ActivityIndicator size="large" />
                            )}
                        </View>
                    )}
                />
            </ContentContainer>
        )
    }

    return (
        <PageContainerCover>
            <SafeAreaViewContainer>
                {isLoading == undefined
                    ? <ActivityIndicator size="large" hidesWhenStopped="true"/>
                    : <View>
                        {gameCoverImage(buttonGroupData, updatedGameRating, setUpdatedGameRating, colors)}
                    </View>
                }
            </SafeAreaViewContainer>
        </PageContainerCover>
    )
}
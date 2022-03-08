
import React, { useState, useEffect, useContext } from 'react'
import { View, Image, FlatList, ActivityIndicator } from 'react-native'
import { axiosSearchContext, confirmGameContext, ContentContainer, PageContainerCover, CurrentThemeContext, SafeAreaViewContainer, useAuth } from '../../../index'
import axios from 'axios'

export default function SgSelectedGameCoverScreen({route, navigation}) {
    const {
        forwardToNextPage,
        backToPreviousPage,
    } = useAuth()
    //let { searchBarTitle, searchType, searchQuery } = route.params
    const colors = useContext(CurrentThemeContext)
    const confirmGame = useContext(confirmGameContext)
    const searchAxios = useContext(axiosSearchContext)
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
    const [gameNameJPNAlt, setGameNameJPNAlt] = useState([])
    const [gameNameEURAlt, setGameNameEURAlt] = useState([])
    const [gameNameBRZAlt, setGameNameBRZAlt] = useState([])
    const [consoleName, setConsoleName] = useState()
    const [firebaseConsoleName, setFirebaseConsoleName] = useState()
    const [firebaseStorageConsoleName, setFirebaseStorageConsoleName] = useState()
    const [gameScreenshots, setGameScreenshots] = useState([])
    const [updatedGameRating, setUpdatedGameRating] = useState()
    const nextPageNumber = 'Page4'
    const passingContent = {
        accessTokenIGDB: accessTokenIGDB, 
        clientIdIGDB: clientIdIGDB,
        consoleName: consoleName,
        firebaseConsoleName: firebaseConsoleName,
        firebaseStorageConsoleName: firebaseStorageConsoleName,
        gameCover: gameCover, 
        gameDevelopers: gameDevelopers.map(game => game.company),
        gameId: igdbGameId,
        gameName: gameName,
        gameNameJPN: gameNameJPNAlt.map(game => game.name),
        gameNameEUR: gameNameEURAlt.map(game => game.name),
        gameNameBRZ: gameNameBRZAlt.map(game => game.name),
        gamePublishers: gamePublishers.map(game => game.company),
        gameRating: updatedGameRating,
        gameReleaseDate: gameReleaseDate,
        gameScreenshots: gameScreenshots.map(game => game.image_id),
        gameSlug: gameSlug,
        gameSummary: gameSummary
    }
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
                    'Client-ID': clientIdIGDB,
                    'Authorization': `Bearer ${accessTokenIGDB}`
                }
            })
            return new Promise(resolve => {
                setTimeout(() => {
                  resolve(
                    searchAxios.findCover(api, igdbGameId, setCoversResults),
                    searchAxios.findScreenshots(api, igdbGameId, setGameScreenshots),
                    searchAxios.findPublishers(api, igdbGameId, setGamePublishersResults),
                    searchAxios.findDevelopers(api, igdbGameId, setGameDevelopersResults),
                    searchAxios.findGameNameJPN(api, igdbGameId, setGameNameJPNAlt),
                    searchAxios.findGameNameEUR(api, igdbGameId, setGameNameEURAlt),
                    searchAxios.findGameNameBRZ(api, igdbGameId, setGameNameBRZAlt),
                        setIsLoading(false)),
                        findConsoleName(igdbConsoleId)
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

    function findConsoleName(igdbConsoleId) {
        if (igdbConsoleId == 29) return  setConsoleName('Genesis'), setFirebaseConsoleName('sgGenesis'), setFirebaseStorageConsoleName('sgGen')
        if (igdbConsoleId == 84) return  setConsoleName('SG-1000'), setFirebaseConsoleName('sg1000'), setFirebaseStorageConsoleName(firebaseConsoleName)
        if (igdbConsoleId == 64) return  setConsoleName('Master System'), setFirebaseConsoleName('sgMS'), setFirebaseStorageConsoleName(firebaseConsoleName)
        if (igdbConsoleId == 35) return  setConsoleName('Game Gear'), setFirebaseConsoleName('sgGG'), setFirebaseStorageConsoleName(firebaseConsoleName)
        if (igdbConsoleId == 32) return  setConsoleName('Saturn'), setFirebaseConsoleName('sgSat'), setFirebaseStorageConsoleName(firebaseConsoleName)
        if (igdbConsoleId == 31) return  setConsoleName('32x'), setFirebaseConsoleName('sg32X'), setFirebaseStorageConsoleName(firebaseConsoleName)
        if (igdbConsoleId == 78) return  setConsoleName('Sega CD'), setFirebaseConsoleName('sgCD'), setFirebaseStorageConsoleName(firebaseConsoleName)
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
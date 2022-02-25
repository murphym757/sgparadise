
import React, { useState, useEffect, useContext } from 'react'
import { View, Image, FlatList, ActivityIndicator } from 'react-native'
import { confirmGameContext, ContentContainer, PageContainerCover, CurrentThemeContext, SafeAreaViewContainer, useAuth, windowHeight } from '../../../index'
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
        igdbGameId,
        gameName,
        gameSlug,
        gameReleaseDate,
        gameStoryline,
        gameSummary
    } = route.params

    const [coversResults, setCoversResults] = useState([])
    const [involvesCompanies, setInvolvesCompaniesResults] = useState([])
    const [gameScreenshots, setGameScreenshots] = useState([])
    const [updatedGameRating, setUpdatedGameRating] = useState()
    const [unixTimestamp, setUnixTimestamp]= useState()
    const igdbCoversResultsField = `fields alpha_channel,animated,checksum,game,height,image_id,url,width; where game = (${igdbGameId});`
    const igdbScreenshotsResultsField = `fields alpha_channel,animated,checksum,game,height,image_id,url,width; where game = (${igdbGameId});`
    const igdbInvolvesCompaniesResultsField =`fields company,developer,game,publisher,supporting; where game = (${igdbGameId});`

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
                    api.post('https://api.igdb.com/v4/involved_companies', igdbInvolvesCompaniesResultsField, {timeout: 2000})
                        .then(res => {
                            setInvolvesCompaniesResults(res.data)
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

    function coverData() {
        const nextPageNumber = 'Page4'
        const passingContent = {
            involvesCompanies: involvesCompanies,
            gameRating: updatedGameRating,
            gameCover: coversResults, 
            gameId: igdbGameId,
            gameName: gameName,
            gameSlug: gameSlug,
            gameReleaseDate: gameReleaseDate,
            gameStoryline: gameStoryline,
            gameSummary: gameSummary,
            gameScreenshots: gameScreenshots
        }
        const navigationPass = navigation
        const buttonGroupData = {
            backToPreviousPage, 
            forwardToNextPage, 
            navigationPass,
            nextPageNumber,
            passingContent
        }
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
                                    uri: `https://images.igdb.com/igdb/image/upload/t_1080p/${item.image_id}.jpg`,
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
                        {coverData()}
                    </View>
                }
            </SafeAreaViewContainer>
        </PageContainerCover>
    )
}
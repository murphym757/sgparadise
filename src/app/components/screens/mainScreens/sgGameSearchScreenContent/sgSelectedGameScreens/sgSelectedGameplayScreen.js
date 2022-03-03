import React, { useState, useEffect, useContext } from 'react'
import { View, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { confirmGameContext, CurrentThemeContext, PageContainer, SafeAreaViewContainer, useAuth } from '../../../index'

export default function SgSelectedGameplayScreen({route, navigation}) {
    const {
        forwardToNextPage,
        backToPreviousPage
    } = useAuth()
    //let { searchBarTitle, searchType, searchQuery } = route.params
    const colors = useContext(CurrentThemeContext)
    const confirmGame = useContext(confirmGameContext)
    const [isLoading, setIsLoading] = useState()
    const {
        gameCover,
        gameDevelopers,
        gameId,
        gameName,
        gameRating, 
        gameReleaseDate,
        gameScreenshots,
        gamePublishers,
        gameSlug,
        gameSummary,
        igdbConsoleId
    } = route.params

    const gameNameLastChar = gameName.charAt(gameName.length - 1)
    const [chosenGameplaysArray, setChosenGameplaysArray] = useState([])
    const [ imageCount, setImageCount ] = useState()
    const gameplaysNewArray = Array.from(new Set(chosenGameplaysArray)); //Removes the ability to add duplicate
    const pageDescriptionPluralForS = `Choose ${imageCount} ${confirmGame.imgWordingSelector(imageCount)} that perfectly showcases some of ${gameName}' highlights:`
    const pageDescriptionPlural = `Choose ${imageCount} ${confirmGame.imgWordingSelector(imageCount)} that perfectly showcases some of ${gameName}'s highlights:`
    const pageDescription = `To add another image, select one of the chosen images. To remove all images, press the Clear Images Button`
    const nextPageNumber = 'Page6'
    const passingContent = {
        gameCover: gameCover,
        gameDevelopers: gameDevelopers,
        gameId: gameId,
        gameName: gameName,
        gamePublishers: gamePublishers,
        gameRating: gameRating, 
        gameReleaseDate: gameReleaseDate,
        gameScreenshots: chosenGameplaysArray,
        gameSlug: gameSlug,
        gameSummary: gameSummary,
        igdbConsoleId: igdbConsoleId
    }
    const navigationPass = navigation
    const buttonGroupData = {
        forwardToNextPage, 
        backToPreviousPage, 
        nextPageNumber, 
        passingContent, 
        navigationPass
    }
    let initArray = gameScreenshots
    let deletionArray = gameplaysNewArray
    let currentGameplaysArray = [];
    currentGameplaysArray = initArray.filter(item => !deletionArray.includes(item))
    
    async function chosenGameplayData(item) {
        setChosenGameplaysArray(chosenGameplaysArray => [...chosenGameplaysArray, item])
        setImageCount(imageCount - 1 )
    }

    async function removeChosenGameplayData(item) {
        setChosenGameplaysArray(gameplaysNewArray.filter(gameplay => gameplay !== item))
        setImageCount(imageCount + 1 )
    }

    function resetChosenGameplayData(){
        setChosenGameplaysArray([])
            if(gameScreenshots.length <= 3) {
                return setImageCount(gameScreenshots.length)
            } else {
                return setImageCount(3)
            }
    }
    /*----------*/
    function chooseImagesList(){
        return (
            <FlatList
                data={currentGameplaysArray}
                keyboardShouldPersistTaps="always" 
                contentContainerStyle={{
                    justifyContent: 'space-between'
                }}
                flexDirection='column'
                numColumns={2}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={{
                        height: 110
                    }}>
                    <TouchableOpacity
                        style={{
                            margin: 3,
                            alignItems:'center',
                            justifyContent:'center',
                        }}
                        onPress={() => chosenGameplayData(item)}>
                            <Image
                                style={{
                                    height: 100,
                                    width: 180,
                                    marginVertical: 15,
                                    resizeMode: 'stretch',
                                    borderRadius: 25,
                                }}
                                source={{
                                    uri: `https://images.igdb.com/igdb/image/upload/t_1080p/${item}.jpg`,
                                }}
                                onLoadStart={() => {setIsLoading(true)}}
                                onLoadEnd={() => {setIsLoading(false)}}
                            />
                        </TouchableOpacity>
                            {isLoading && (
                                <ActivityIndicator size="large" />
                            )}
                    </View>
                )}
            />
        )
    }

    function chosenImagesList(){
        return (
            <FlatList
                data={chosenGameplaysArray}
                keyboardShouldPersistTaps="always" 
                contentContainerStyle={{
                    justifyContent: 'space-between'
                }}
                flexDirection='column'
                numColumns={2}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={{
                        height: 110
                    }}>
                    <TouchableOpacity
                        style={{
                            margin: 3,
                            alignItems:'center',
                            justifyContent:'center',
                        }}
                        onPress={() => removeChosenGameplayData(item)}>
                            <Image
                                style={{
                                    height: 100,
                                    width: 180,
                                    marginVertical: 15,
                                    resizeMode: 'stretch',
                                    borderRadius: 25,
                                    borderWidth: 7,
                                    borderColor: colors.secondaryColor,
                                }}
                                source={{
                                    uri: `https://images.igdb.com/igdb/image/upload/t_1080p/${item}.jpg`,
                                }}
                                onLoadStart={() => {setIsLoading(true)}}
                                onLoadEnd={() => {setIsLoading(false)}}
                            />
                        </TouchableOpacity>
                            {isLoading && (
                                <ActivityIndicator size="large" />
                            )}
                    </View>
                )}
            />
        )
    }

    useEffect(() => {
            return new Promise(resolve => {
                setTimeout(() => {
                  resolve(
                        setIsLoading(false))
                        if (gameScreenshots.length <= 3) {
                            return setImageCount(gameScreenshots.length)
                       } else {
                            return setImageCount(3)
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
                        {confirmGame.gameplayResults(buttonGroupData, imageCount, pageDescription, pageDescriptionPluralForS, pageDescriptionPlural, gameNameLastChar, chooseImagesList, resetChosenGameplayData, chosenImagesList)}
                    </View>
                }
            </SafeAreaViewContainer>
        </PageContainer>
    )
}
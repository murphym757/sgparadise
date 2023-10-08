import React, { useState, useEffect, useContext } from 'react'
import { View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useAuth } from 'auth/authContext'
import { AppWideImageContext } from 'main/sgImageContext'
import { confirmGameContext } from 'main/sgGameSearchScreenContent/sgSelectedGameScreens/sgSelectedGameContext'
import {
    CurrentThemeContext,
    PageContainer,
    SafeAreaViewContainer
} from 'index';

export default function SgSelectedGameplayScreen({route, navigation}) {
    //let { searchBarTitle, searchType, searchQuery } = route.params
    const [ chosenGameplaysArray, setChosenGameplaysArray ] = useState([])
    const [ imageCount, setImageCount ] = useState()
    console.log("🚀 ~ file: sgSelectedGameplayScreen.js:49 ~ SgSelectedGameplayScreen ~ imageCount", imageCount)
    const [ isLoading, setIsLoading ] = useState()
    const { 0: gameScreenshot1, 1: gameScreenshot2, 2: gameScreenshot3 } = chosenGameplaysArray
    const { backToPreviousPage, forwardToNextPage } = useAuth()
    const colors = useContext(CurrentThemeContext)
    const confirmGame = useContext(confirmGameContext)
    const gameNameLastChar = gameName.charAt(gameName.length - 1)
    const gameplaysNewArray = Array.from(new Set(chosenGameplaysArray)) //Removes the ability to add duplicate
    const images = useContext(AppWideImageContext)
    const nextPageNumber = 'Page5'
    const pageDescription = `To add another image, select one of the chosen images. To remove all images, press the Clear Images Button`
    const pageDescriptionPlural = `Choose ${imageCount} ${confirmGame.imgWordingSelector(imageCount)} that perfectly showcases some of ${gameName}'s highlights:`
    const pageDescriptionPluralForS = `Choose ${imageCount} ${confirmGame.imgWordingSelector(imageCount)} that perfectly showcases some of ${gameName}' highlights:`
    let currentGameplaysArray = []
    currentGameplaysArray = initArray.filter(item => !deletionArray.includes(item))
    let deletionArray = gameplaysNewArray
    let initArray = gameScreenshots
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
        sortedGameName
    } = route.params
    // Image Styling
    const imageData = {
        height: 100,
        width: 180,
        marginVertical: 15,
        contentFit: 'stretch',
        transition: 1000,
        borderRadius: 25,
        borderWidth: 7,
        borderColor: colors.primaryColor,
    }

    //Finds Duplicate Developers and removes them
    const uniqueDevValuesSet = new Set();
    const filteredDevs = gameDevelopers.filter((item) => {
        const isPresentInDevSet = uniqueDevValuesSet.has(item)
        uniqueDevValuesSet.add(item)
        return !isPresentInDevSet
    })

    //Finds Duplicate Publishers and removes them
    const uniquePubValuesSet = new Set();
    const filteredPubs = gamePublishers.filter((item) => {
        const isPresentInPubSet = uniquePubValuesSet.has(item)
        uniquePubValuesSet.add(item)
        return !isPresentInPubSet
    })
    const passingContent = {
        accessTokenIGDB,
        clientIdIGDB,
        consoleName,
        firebaseConsoleName,
        firebaseStorageConsoleName,
        gameCover,
        gameDevelopers: filteredDevs,
        gameId,
        gameName,
        gameNameBRZ,
        gameNameEUR,
        gameNameJPN,
        gameNameMatchInSgDB,
        gamePublishers: filteredPubs,
        gameRating,
        gameReleaseDate,
        gameScreenshot1,
        gameScreenshot2,
        gameScreenshot3,
        gameSlug,
        gameSummary,
        imagesChosen: chosenGameplaysArray.length,
        sortedGameName
    }
    const navigationPass = navigation
    const buttonGroupData = {
        backToPreviousPage,
        forwardToNextPage,
        navigationPass,
        nextPageNumber,
        passingContent
    }

    async function chosenGameplayData(item) {
        setChosenGameplaysArray(gameplaysArray => [...gameplaysArray, item])
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
    function imageCounter(){
        if(imageCount == 0) {
            return currentGameplaysArray.slice(10)
        } else {
            return currentGameplaysArray
        }
    }

    function imagesAvailable(item){
        imageData['borderWidth'] = null
        imageData['borderColor'] = null
        return images.gameSelectionPageGameplayImages(imageData, item, setIsLoading)
    }
    function imagesSelected(item){
        imageData['borderWidth'] = 7
        imageData['borderColor'] = colors.secondaryColor
        return images.gameSelectionPageGameplayImages(imageData, item, setIsLoading)
    }
    function gamplayImageList(gameplaySelection, gameplaySelectionNewGroup){
        return (
            <FlatList
                data={gameplaySelection}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{
                    justifyContent: 'space-between'
                }}
                flexDirection='column'
                numColumns={2}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={{ height: 110 }}>
                        <TouchableOpacity
                            style={{
                                margin: 3,
                                alignItems:'center',
                                justifyContent:'center',
                            }}
                            onPress={() => chosenGameplayData(item)}>
                            {gameplaySelectionNewGroup(item)}
                        </TouchableOpacity>
                        {isLoading && (
                            <ActivityIndicator size="large" />
                        )}
                    </View>
                )}
            />

        )
    }

    function chooseImagesList(){
        return gamplayImageList(imageCounter(), imagesAvailable)
    }

    function chosenImagesList(){
        return gamplayImageList(chosenGameplaysArray, imagesSelected)
    }

    function pickPageDescription(pageDescriptionPluralForS, pageDescriptionPlural, gameNameLastChar, pageDescription){
        if(imageCount == 0) {
            return confirmGame.chosenImages(pageDescription)
        } else {
            return confirmGame.chooseImages(pageDescriptionPluralForS, pageDescriptionPlural, gameNameLastChar)
        }
    }
    function pickButtons(buttonGroupData, resetChosenGameplayData){
        if(imageCount == 0) {
            return confirmGame.buttonGroupImages(buttonGroupData, resetChosenGameplayData)
        } else {
            return null
        }
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
                    : <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        {pickPageDescription(pageDescriptionPluralForS, pageDescriptionPlural, gameNameLastChar, pageDescription)}
                        {chooseImagesList()}
                        {chosenImagesList()}
                    </View>
                }
                {pickButtons(buttonGroupData, resetChosenGameplayData)}
            </SafeAreaViewContainer>
        </PageContainer>
    )
}
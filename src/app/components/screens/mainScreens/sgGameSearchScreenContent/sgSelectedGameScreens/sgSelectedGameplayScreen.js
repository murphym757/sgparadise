import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { 
    confirmGameContext, 
    CurrentThemeContext, 
    TouchableButtonDelete,
    TouchableButtonFontDelete,
    PageContainer, 
    SafeAreaViewContainer, 
    useAuth 
} from 'index'

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
    
    const gameNameLastChar = gameName.charAt(gameName.length - 1)
    const [chosenGameplaysArray, setChosenGameplaysArray] = useState([])
    const {0: gameScreenshot1, 1: gameScreenshot2, 2: gameScreenshot3 } = chosenGameplaysArray
    const [ imageCount, setImageCount ] = useState()
    const gameplaysNewArray = Array.from(new Set(chosenGameplaysArray)) //Removes the ability to add duplicate
    const pageDescriptionPluralForS = `Choose ${imageCount} ${confirmGame.imgWordingSelector(imageCount)} that perfectly showcases some of ${gameName}' highlights:`
    const pageDescriptionPlural = `Choose ${imageCount} ${confirmGame.imgWordingSelector(imageCount)} that perfectly showcases some of ${gameName}'s highlights:`
    const pageDescription = `To add another image, select one of the chosen images. To remove all images, press the Clear Images Button`
    const nextPageNumber = 'Page5'

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
        sortedGameName
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
    let currentGameplaysArray = []
    currentGameplaysArray = initArray.filter(item => !deletionArray.includes(item))
    
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
    function chooseImagesList(){
        return (
            <FlatList
                data={imageCounter()}
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
                                    url: `https://images.igdb.com/igdb/image/upload/t_1080p/${item}.jpg`,
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
                                    url: `https://images.igdb.com/igdb/image/upload/t_1080p/${item}.jpg`,
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
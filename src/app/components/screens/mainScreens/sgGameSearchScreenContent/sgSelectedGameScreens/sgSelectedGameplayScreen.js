
import React, { useState, useEffect, useContext } from 'react';
import { 
    Text,
    View,
    Image,
    FlatList,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'
  import{
    windowHeight,
    MainFont,
    MainSubFont,
    MainHeading,
    MainHeadingButton,
    ScrollViewContainer
} from '../../../../../../../assets/styles/globalStyling'
import {CurrentThemeContext} from '../../../../../../../assets/styles/globalTheme'
  import {
        SafeAreaViewContainer,
        Container,
        TouchableButton,
        TouchableButtonFont,
        TouchableButtonAlt,
        TouchableButtonFontAlt,
        CustomInputField,
        FontAwesomeIcon, faTimes
  } from '../../../index'
  import { useAuth } from '../../../authScreens/authContext'
  import axios from 'axios'
  import { Rating, AirbnbRating } from 'react-native-ratings';
  import { FlatGrid } from 'react-native-super-grid';

export default function SgSelectedGameplayScreen({route, navigation}) {
    const {
        unixTimestampConverter,
        forwardToNextPage,
        backToPreviousPage
    } = useAuth()
    //let { searchBarTitle, searchType, searchQuery } = route.params
    const colors = useContext(CurrentThemeContext)
    const [isLoading, setIsLoading] = useState()
    const { 
        clientIdIGDB, 
        accessTokenIGDB, 
        igdbConsoleId,
        igdbGameId,
        gameName,
        gameSlug,
        gameCover,
        gameRating,
        gameReleaseDate,
        gameStoryline,
        gameSummary,
        gameScreenshots,
        igdbInvolvesCompaniesResults
    } = route.params

    const gameNameLastChar = gameName.charAt(gameName.length - 1)
    const [chosenGameplaysArray, setChosenGameplaysArray] = useState([])
    const gameplaysNewArray = Array.from(new Set(chosenGameplaysArray)); //Removes the ability to add dulicate\
   
    // Adding and removing gameplays from a game
    async function chosenGameplayData(item) {
    setChosenGameplaysArray(chosenGameplaysArray => [...chosenGameplaysArray, item])
    }

    async function removeChosenGameplayData(item) {
    setChosenGameplaysArray(gameplaysNewArray.filter(gameplay => gameplay !== item))
    }

    useEffect(() => {
            return new Promise(resolve => {
                setTimeout(() => {
                  resolve(
                        setIsLoading(false))
                }, 2000)
              })
            }, [])

            
    function gammeplayResults() {
        let initArray = gameScreenshots
        console.log(currentGameplaysArray)
        let deletionArray = gameplaysNewArray
        let currentGameplaysArray = [];
        console.log(chosenGameplaysArray)
        currentGameplaysArray = initArray.filter(item => !deletionArray.includes(item))
        return (
            <Container>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {gameNameLastChar == 's'
                                ?   <MainFont>Choose 3 images that perfectly showcases some of {gameName + "'"} highlights: </MainFont>
                                :   <MainFont>Choose 3 images that perfectly showcases some of {gameName + "'s"} highlights: </MainFont>
                            } 
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
                                            uri: "https://images.igdb.com/igdb/image/upload/t_1080p/" + item.image_id + ".jpg",
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
                </View>
                {buttonGroup()}
            </Container>
          ) 
    }

    function buttonGroup() {
        const pageNumber = 'Page6'
        const passingContent = {
            igdbInvolvesCompaniesResults: igdbInvolvesCompaniesResults,
            gameRating: gameRating, 
            igdbGameId: igdbGameId,
            gameName: gameName,
            gameReleaseDate: gameReleaseDate,
            gameStoryline: gameStoryline,
            gameSummary: gameSummary,
            gameScreenshots: gameScreenshots
        }
        const navigationPass = navigation
        return (
            <View>
                <TouchableButton onPress={() => forwardToNextPage(pageNumber, passingContent, navigationPass)}>
                    <TouchableButtonFont>Next Page</TouchableButtonFont>
                </TouchableButton>
                <TouchableButtonAlt style={{}} onPress={() => backToPreviousPage(navigationPass)}>
                    <TouchableButtonFontAlt>Previous Page</TouchableButtonFontAlt>
                </TouchableButtonAlt>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, paddingTop: windowHeight/20, paddingBottom: windowHeight/20, backgroundColor: colors.primaryColor }}>
            <SafeAreaViewContainer>
            {isLoading == undefined
                ? <ActivityIndicator size="large" hidesWhenStopped="true"/>
                : <View>
                    {gammeplayResults()}
                </View>
            }
            </SafeAreaViewContainer>
        </View>
    )
}
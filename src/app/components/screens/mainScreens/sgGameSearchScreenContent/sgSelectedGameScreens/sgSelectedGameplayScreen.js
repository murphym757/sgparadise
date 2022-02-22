
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
        involvesCompanies
    } = route.params

    const gameNameLastChar = gameName.charAt(gameName.length - 1)
    const [chosenGameplaysArray, setChosenGameplaysArray] = useState([])
    const [ imageCount, setImageCount ] = useState()
    const gameplaysNewArray = Array.from(new Set(chosenGameplaysArray)); //Removes the ability to add duplicate

    // For adding and removing images from the array
    let initArray = gameScreenshots
    let deletionArray = gameplaysNewArray
    let currentGameplaysArray = [];
    currentGameplaysArray = initArray.filter(item => !deletionArray.includes(item))
    /*-------------*/
   
    // Adding and removing gameplays from a game (Plus, removing all gameplays all at once)
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

    function buttonGroup() {
        const pageNumber = 'Page6'
        const passingContent = {
            involvesCompanies: involvesCompanies,
            gameRating: gameRating, 
            gameCover: gameCover,
            gameId: igdbGameId,
            gameSlug: gameSlug,
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

    function imgWordingSelector() {
        const imgSingular = 'more image'
        const imgPlural = 'images'
        if (imageCount == 1) return imgSingular
        if (imageCount != 1) return imgPlural
    }

    function chooseImages(){
        return (
            <View> 
                {gameScreenshots.length <= 3
                    ?   <Text>Yep</Text>
                    :   <Text>YeSSSS</Text>
                }
                {gameNameLastChar == 's'
                    ?   <MainFont>Choose {imageCount} {imgWordingSelector()} that perfectly showcases some of {gameName}' highlights: </MainFont>
                    :   <MainFont>Choose {imageCount} {imgWordingSelector()} that perfectly showcases some of {gameName}'s highlights: </MainFont>
                } 
                {chooseImagesList()}
            </View>
        )
    }

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
                                    uri: `https://images.igdb.com/igdb/image/upload/t_1080p/${item.image_id}.jpg`,
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

    function chosenImages(){
        return (
            <View>
                <MainFont>To add another image, select one of the chosen images. To remove all images, press the Clear Images Button</MainFont>
                {chosenImagesList()}
                <TouchableButton style={{backgroundColor: colors.primaryColorAltLight}} onPress={() => resetChosenGameplayData()}>
                    <TouchableButtonFont style={{color: colors.primaryColor}}>Clear Images</TouchableButtonFont>
                </TouchableButton>
                {buttonGroup()}
            </View>
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
                                    uri: `https://images.igdb.com/igdb/image/upload/t_1080p/${item.image_id}.jpg`,
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
            
    function gameplayResults() { 
        return (
            <Container>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {imageCount < 1
                        ?   chosenImages()
                        :   chooseImages()
                    }
                </View>
            </Container>
          ) 
    }

    return (
        <View style={{ flex: 1, paddingTop: windowHeight/20, paddingBottom: windowHeight/20, backgroundColor: colors.primaryColor }}>
            <SafeAreaViewContainer>
            {isLoading == undefined
                ? <ActivityIndicator size="large" hidesWhenStopped="true"/>
                : <View>
                    {gameplayResults()}
                </View>
            }
            </SafeAreaViewContainer>
        </View>
    )
}
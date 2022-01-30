
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

export default function SgSelectedGameSummaryScreen({route, navigation}) {
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


    // IGDB search data (Put on confirmation page)
    const [updatedGameSummary, setUpdatedGameSummary] = useState(gameSummary)
    const [pageNumber, setPageNumber] = useState('Page5')
    console.log(gameScreenshots)

    useEffect(() => {
            return new Promise(resolve => {
                setTimeout(() => {
                  resolve(
                        setIsLoading(false))
                        if (gameScreenshots == 0) {
                            return setPageNumber('Page6')
                       } else {
                            return pageNumber
                       }
                }, 2000)
              })
            }, [])

    function searchData() {
        return (
            <Container>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <MainFont>What is this game about, exactly?</MainFont>
                </View>
                <CustomInputField
                    style={{ height:200, textAlignVertical: 'top' }}
                    multiline={true}
                    blurOnSubmit={true}
                    numberOfLines={4}
                    placeholderTextColor={colors.primaryColor}
                    onChangeText={(text) => setUpdatedGameSummary(text)}
                    value={updatedGameSummary}
                    color={colors.primaryColor}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {buttonGroup()}
            </Container>
        )
    }

    function buttonGroup() {
        const passingContent = {
            involvesCompanies: involvesCompanies,
            gameRating: gameRating, 
            gameId: igdbGameId,
            gameName: gameName,
            gameReleaseDate: gameReleaseDate,
            gameStoryline: gameStoryline,
            gameSummary: updatedGameSummary,
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
                    {searchData()}
                </View>
            }
            </SafeAreaViewContainer>
        </View>
    )
}
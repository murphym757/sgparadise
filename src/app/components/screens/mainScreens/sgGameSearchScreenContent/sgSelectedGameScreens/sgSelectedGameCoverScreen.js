
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
    MainHeadingLongTitle,
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

export default function SgSelectedGameCoverScreen({route, navigation}) {
    const {
        unixTimestampConverter,
        forwardToNextPage,
        backToPreviousPage,
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
        gameRating,
        gameReleaseDate,
        gameStoryline,
        gameSummary
    } = route.params


    // IGDB search data (Put on confirmation page)
    const [coversResults, setCoversResults] = useState([])
    const [involvesCompanies, setInvolvesCompaniesResults] = useState([])
    const [gameScreenshots, setgameScreenshots] = useState([])
    const [updatedGameRating, setUpdatedGameRating] = useState()
    const [unixTimestamp, setUnixTimestamp]= useState()
    const igdbCoversResultsField = 'fields alpha_channel,animated,checksum,game,height,image_id,url,width; where game = (' + `${igdbGameId}` + ');'
    const igdbScreenshotsResultsField = 'fields alpha_channel,animated,checksum,game,height,image_id,url,width; where game = (' + `${igdbGameId}` + ');'
    const igdbInvolvesCompaniesResultsField ='fields company,developer,game,publisher,supporting; where game = (' + `${igdbGameId}` + ');'

    useEffect(() => {
        function searchTesting() {
            let api = axios.create({
                headers: {
                    'Accept': 'application/json',
                    "Client-ID": route.params.clientIdIGDB,
                    "Authorization": "Bearer " + route.params.accessTokenIGDB
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
                            setgameScreenshots(res.data)
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
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
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
                                uri: "https://images.igdb.com/igdb/image/upload/t_1080p/" + item.image_id + ".jpg",
                            }}
                            onLoadStart={() => {setIsLoading(true)}}
                            onLoadEnd={() => {setIsLoading(false)}}
                        />
                        {generalInfo()}
                        {buttonGroup()}
                           {isLoading && (
                            <ActivityIndicator size="large" />
                        )}
                    </View>
                  )}
              />
              </View>
          ) 
    }

    function generalInfo() {
        return (
            <View>
                {gameName.length < 29
                    ?   <MainHeading>{gameName}</MainHeading>
                    :   <MainHeadingLongTitle>{gameName}</MainHeadingLongTitle>
                }
                <MainSubFont>{gameReleaseDate}</MainSubFont>
                {updatedGameRating == undefined
                    ?   <MainFont>{"Tap to rate: "}</MainFont>
                    :   <View>
                        {updatedGameRating == 1
                            ?   <MainFont>{"Tap to rate: " + updatedGameRating + " Star"}</MainFont>
                            :   <MainFont>{"Tap to rate: " + updatedGameRating + " Stars"}</MainFont>
                        }
                    </View>
                }
                
                        <AirbnbRating
                            selectedColor={colors.secondaryColor}
                            unSelectedColor={colors.primaryColorAlt}
                            ratingContainerStyle={{
                                alignItems: 'left'
                            }}
                            count={5}
                            onFinishRating={setUpdatedGameRating}
                            showRating={false}
                            reviews={["Bad", "Mediocre", "Good", "Exceptional", "Classic"]}
                            defaultRating={0}
                            size={25}
                        />
            </View>
        )
    }

    function buttonGroup() {
        const pageNumber = 'Page4'
        const passingContent = {
            involvesCompanies: involvesCompanies,
            gameRating: updatedGameRating, 
            gameId: igdbGameId,
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
        <View style={{ flex: 1, paddingTop: windowHeight/20, paddingBottom: windowHeight/40, backgroundColor: colors.primaryColor }}>
            <SafeAreaViewContainer>
            {isLoading == undefined
                ? <ActivityIndicator size="large" hidesWhenStopped="true"/>
                : <View>
                    {coverData()}
                </View>
            }
            </SafeAreaViewContainer>
        </View>
    )
}
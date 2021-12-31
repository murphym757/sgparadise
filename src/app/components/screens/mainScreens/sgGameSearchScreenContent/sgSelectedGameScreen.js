
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
} from '../../../../../../assets/styles/globalStyling'
import {CurrentThemeContext} from '../../../../../../assets/styles/globalTheme'
  import {
        SafeAreaViewContainer,
        Container,
        TouchableButton,
        TouchableButtonFont,
        CustomInputField,
        FontAwesomeIcon, faTimes
  } from '../../index'
  import { useAuth } from '../../authScreens/authContext'
  import axios from 'axios'
  import { Rating, AirbnbRating } from 'react-native-ratings';

export default function SgSelectedGameScreen({route, navigation}) {
    const {
        unixTimestampConverter
    } = useAuth()
    //let { searchBarTitle, searchType, searchQuery } = route.params
    const colors = useContext(CurrentThemeContext)
    const [isLoading, setIsLoading] = useState()
    const { 
        clientIdIGDB, 
        accessTokenIGDB, 
        igdbConsoleId,
        igdbGameId,
        igdbGameName,
        igdbGameSlug,
        igdbGameCover,
        igdbGameReleaseDate,
        igdbGameStoryline,
        igdbGameSummary,
        igdbGameNameScreenshots,
    } = route.params


    // IGDB search data (Put on confirmation page)
    const [igdbCoversResults, setIgdbCoversResults] = useState([])
    console.log(igdbCoversResults)
    const [igdbInvolvesCompaniesResults, setigdbInvolvesCompaniesResults] = useState([])
    console.log(igdbInvolvesCompaniesResults)
    const [igdbGameSelected, setigdbGameSelected] = useState(false)
    const [GameSummary, setGameSummary] = useState(igdbGameSummary)
    const [gameRating, setGameRating] = useState()
    console.log("This is how you rated: " + gameRating)
    const [igdbGameRating, setIgdbGameRating] = useState()
    const [igdbGameAgeRating, setIgdbGameAgeRating] = useState()
    const [igdbGameGenres, setIgdbGameGenres] = useState([])
    const [igdbGameScreenshots, setIgdbGameScreenshots] = useState([])
    const [igdbUnixTimestamp, setIgdbUnixTimestamp]= useState()
    const igdbCoversResultField = 'fields alpha_channel,animated,checksum,game,height,image_id,url,width; where game = (' + `${igdbGameId}` + ');'
    const igdbInvolvesCompaniesResultsField =' fields company,developer,game,publisher,supporting; where game = (' + `${igdbGameId}` + ');'

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
                    api.post('https://api.igdb.com/v4/covers', igdbCoversResultField, {timeout: 2000})
                        .then(res => {
                            setIgdbCoversResults(res.data)
                        }, [])
                        .catch(err => {
                            console.log(err);
                        })
                        .then(function () {
                            // always executed
                        }),
                    api.post('https://api.igdb.com/v4/involved_companies', igdbInvolvesCompaniesResultsField, {timeout: 2000})
                        .then(res => {
                            setigdbInvolvesCompaniesResults(res.data)
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

    function chosenGame() {
        navigation.navigate('Page3', {
            clientIdIGDB: clientIdIGDB,
            accessTokenIGDB: accessTokenIGDB, 
            igdbConsoleId: igdbConsoleId,
            gbConsoleId: gbConsoleId,
            selectedSystemLogo: selectedSystemLogo,
            searchType: searchType,
            searchQuery: igdbSearch
        })
    }

    function searchResults() {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <FlatList
                  data={igdbCoversResults}
                  keyboardShouldPersistTaps="always" 
                  contentContainerStyle={{
                      justifyContent: 'center'
                  }}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <View style={{
                        width: '100%',
                        height: undefined,
                    }}>
                        <Image
                                style={{
                                    height: 500,
                                    marginVertical: 15,
                                    resizeMode: 'stretch',
                                    borderRadius: 50,
                                }}
                                source={{
                                    uri: "https://images.igdb.com/igdb/image/upload/t_1080p/" + item.image_id + ".jpg",
                                }}
                                onLoadStart={() => {setIsLoading(true)}}
                                onLoadEnd={() => {setIsLoading(false)}}
                            />
                           {isLoading && (
                            <ActivityIndicator size="large" />
                        )}
                        <MainFont>Summary:</MainFont>
                        <CustomInputField
                            style={{ height:200, textAlignVertical: 'top',}}
                            multiline={true}
                            numberOfLines={4}
                            placeholderTextColor={colors.primaryColor}
                            onChangeText={(text) => setGameSummary(text)}
                            value={GameSummary}
                            color={colors.primaryColor}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                    </View>
                  )}
              />
              </View>
          ) 
    }

    function searchData() {
        return (
            <Container>
                <MainHeading>{igdbGameName}</MainHeading>
                <MainSubFont>{igdbGameReleaseDate}</MainSubFont>
                {gameRating == 1
                    ?   <MainFont>{"Tap to rate: " + gameRating + " Star"}</MainFont>
                    :   <MainFont>{"Tap to rate: " + gameRating + " Stars"}</MainFont>
                }
                        <AirbnbRating
                            selectedColor={colors.secondaryColor}
                            unSelectedColor={colors.primaryColorAlt}
                            ratingContainerStyle={{
                                alignItems: 'left'
                            }}
                            count={5}
                            onFinishRating={setGameRating}
                            showRating={false}
                            reviews={["Bad", "Mediocre", "Good", "Exceptional", "Classic"]}
                            defaultRating={0}
                            size={25}
                        />
                    {searchResults()}
            </Container>
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
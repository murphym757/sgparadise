import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Button, FlatList, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {CurrentThemeContext} from '../../../../../../assets/styles/globalTheme'
import { imagesConfig, gamesConfig, firebase } from '../../../../../server/config/config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import {
    searchBar
} from '../sgGameSearchScreenContent/searchIndex'

// App Styling
import {
    SafeAreaViewContainer,
    Container,
    MainFont,
    CustomInputField,
    TouchableButton,
    TouchableButtonFont
} from '../../index'

export default function AddGameScreen({navigation}) {
    const [searchType, setSearchType] = useState('sgGameSearch')
    console.log(searchType)
    const colors = useContext(CurrentThemeContext)
    const dayImages = [
        { id: '0', systemLogo: imagesConfig.sgallDayImage, systemLogoSelected: imagesConfig.sgallDayImagePicked, gbId:[6,141,31,29,5,8], igdbId: [29,84,30,78,35,64] },
        { id: '1', systemLogo: imagesConfig.sggDayImage, systemLogoSelected: imagesConfig.sggDayImagePicked, gbId: 6, igdbId: 29 },
        { id: '2', systemLogo: imagesConfig.sg1000DayImage, systemLogoSelected: imagesConfig.sg1000DayImagePicked, gbId: 141, igdbId: 84 },
        { id: '3', systemLogo: imagesConfig.sg32xDayImage, systemLogoSelected: imagesConfig.sg32xDayImagePicked, gbId: 31, igdbId: 30 },
        { id: '4', systemLogo: imagesConfig.sgcdDayImage, systemLogoSelected: imagesConfig.sgcdDayImagePicked, gbId: 29, igdbId: 78 },
        { id: '5', systemLogo: imagesConfig.sgggDayImage, systemLogoSelected: imagesConfig.sgggDayImagePicked, gbId: 5, igdbId: 35 },
        { id: '6', systemLogo: imagesConfig.sgmsDayImage, systemLogoSelected: imagesConfig.sgmsDayImagePicked, gbId: 8, igdbId: 64  },
      ];
    const nightImages = [
        { id: '0', systemLogo: imagesConfig.sgallNightImage, systemLogoSelected: imagesConfig.sgallNightImagePicked, gbId:[6,141,31,29,5,8], igdbId: [29,84,30,78,35,64] },
        { id: '1', systemLogo: imagesConfig.sggNightImage, systemLogoSelected: imagesConfig.sggNightImagePicked, gbId: 6, igdbId: 29  },
        { id: '2', systemLogo: imagesConfig.sg1000NightImage, systemLogoSelected: imagesConfig.sg1000NightImagePicked, gbId: 141, igdbId: 84 },
        { id: '3', systemLogo: imagesConfig.sg32xNightImage, systemLogoSelected: imagesConfig.sg32xNightImagePicked, gbId: 31, igdbId: 30 },
        { id: '4', systemLogo: imagesConfig.sgcdNightImage, systemLogoSelected: imagesConfig.sgcdNightImagePicked, gbId: 29, igdbId: 78 },
        { id: '5', systemLogo: imagesConfig.sgggNightImage, systemLogoSelected: imagesConfig.sgggNightImagePicked, gbId: 5, igdbId: 35 },
        { id: '6', systemLogo: imagesConfig.sgmsNightImage, systemLogoSelected: imagesConfig.sgmsNightImagePicked, gbId: 8, igdbId: 64 },
    ];
    const [gameName, setGameName] = useState('')
    const [gameDeveloper, setGameDeveloper] = useState('')
    const [gamePublisher, setGamePublisher] = useState('')
    const [gameGenre, setGameGenre] = useState('')
    const [gameEsrbRating, setGameEsrbRating] = useState('')
    const [gameUserRating, setGameUserRating] = useState('')
    const [gameReleaseDate, setGameReleaseDate] = useState('')
    const [gameReleaseYear, setGameReleaseYear] = useState('')
    const [gamePlatform, setGamePlatform] = useState('')
    const [gameSynopsis, setGameSynopsis] = useState('')
    const [gameCoverArtPopular, setGameCoverArtPopular] = useState('')
    const [gameCoverArt, setGameCoverArt] = useState('')
    const [gameGameplay1, setGameGameplay1] = useState('')
    const [gameGameplay2, setGameGameplay2] = useState('')
    const [gameGameplay3, setGameGameplay3] = useState('')
    const [gameGameplay4, setGameGameplay4] = useState('')
    const [tagsGenre1, setTagsGenre1] = useState('')
    const [tagsGenre2, setTagsGenre2] = useState('')
    const [tagsGenre3, setTagsGenre3] = useState('')
    const [tagsGenre4, setTagsGenre4] = useState('')
    const [tagsGenre5, setTagsGenre5] = useState('')
    const [tagsGenre6, setTagsGenre6] = useState('')
    const [tagsGenre7, setTagsGenre7] = useState('')
    const [tagsGenre8, setTagsGenre8] = useState('')
    const [tagsGenre9, setTagsGenre9] = useState('')
    const [tagsGenre10, setTagsGenre10] = useState('')
    const [tagsDescription1, setTagsDescription1] = useState('')
    const [tagsDescription2, setTagsDescription2] = useState('')
    const [tagsDescription3, setTagsDescription3] = useState('')
    const [tagsDescription4, setTagsDescription4] = useState('')
    const [tagsDescription5, setTagsDescription5] = useState('')
    const [tagsDescription6, setTagsDescription6] = useState('')
    const [tagsDescription7, setTagsDescription7] = useState('')
    const [tagsDescription8, setTagsDescription8] = useState('')
    const [tagsDescription9, setTagsDescription9] = useState('')
    const [tagsDescription10, setTagsDescription10] = useState('')
    const [gbConsoleId, setGbConsoleId] = useState()
    console.log(gbConsoleId)
    const [igdbConsoleId, setIgdbConsoleId] = useState()
    console.log(igdbConsoleId)
    const [sgGamesArray, setSgGamesArray] = useState([])
    console.log(sgGamesArray)
    console.log(gamesConfig.igdbClientId)
    console.log()
    useEffect(() => {
        const twitchIdUrl ='https://id.twitch.tv/oauth2/token?'
        const clientId = 'client_id=' + ""+ gamesConfig.igdbClientId + ""
        const clientSecret = '&client_secret=' + "" + gamesConfig.igdbClientSecret + ""
        const grantType = '&grant_type=client_credentials'
        axios.post(twitchIdUrl + clientId + clientSecret + grantType)
            .then(async (res) => {
                console.log(res.data)
                await AsyncStorage.setItem('igdbAccesstoken', res.data.access_token)
            })
            .catch((err) => {
                console.log(err);
            })
      })

      async function gbSearchGame() {
        const gbBaseUrl = 'https://www.giantbomb.com/api/games/'
        const gbApiUrl = '?api_key=' + gamesConfig.giantbombApiKey + ''
        const gbGameSeach = '&filter=name:streets of rage 2,'
        const gbGamePlatform = 'platforms:' + gbConsoleId + ''
        const gbdataFormat = '&format=json'
        const gbUrl = gbBaseUrl + gbApiUrl + gbGameSeach + gbGamePlatform + gbdataFormat
        axios.get(gbUrl)
        .then(async (res) => {
            console.log(res.data.results[0].api_detail_url)
        })
        .catch((err) => {
            console.log(err);
        })
      }

      async function igdbSearchGame(item) {
        const jsonValue = await AsyncStorage.getItem('igdbAccesstoken')
        const axiosUrl = "https://api.igdb.com/v4/games"
        const igdbFields = 'fields first_release_date,platforms; where first_release_date < 864345600 & platforms=(' + igdbConsoleId + ');'
        console.log(igdbFields)
        const gameSearchedName = "sonic the hedgehog"
        const parent = '"'
        const searchedGameName = ''+ parent + gameSearchedName + parent + ''
        const igdbSearchGame = 'search ' + searchedGameName + ';'
        try {
            await axios({
                url: axiosUrl,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Client-ID': gamesConfig.igdbClientId,
                    'Authorization': 'Bearer' + " " + jsonValue,
                },
                data: igdbSearchGame + igdbFields
                })
                .then(res => {
                    const genGames = res.data;
                    setSgGamesArray({
                      genGames
                    })
                  })
                  .catch(err => {
                    console.error(err);
                  });
        } catch {

        }
      }

      async function igdbFoundGame(item) {
        const jsonValue = await AsyncStorage.getItem('igdbAccesstoken')
        const axiosUrl = "https://api.igdb.com/v4/games"
        const igdbSegaSatId = 32
        const igdbSegaGenId = 29
        const igdbSega32XId = 30
        const igdbSegaGGId = 35
        const igdbSegaMSId = 64
        const igdbSegaSG1000Id = 84
        const searchedGameName = "sonic the hedgehog"
        axios({
            url: axiosUrl,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': gamesConfig.igdbClientId,
                'Authorization': 'Bearer' + " " + jsonValue,
            },
            data: 'fields age_ratings,first_release_date,genres,name,platforms,rating,rating_count,summary,tags;'
            })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.error(err)
            })
      }

       function setGameId(item) {
        setGbConsoleId(item.gbId)
        setIgdbConsoleId(item.igdbId)
            try {
                igdbSearchGame(item.igdbId)
            } catch {

           }
       }

    return (
        <SafeAreaViewContainer>
        {searchBar({navigation}, searchType)}
            <View>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={nightImages}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                    <View>
                        <TouchableOpacity onPress={() => setGameId(item)}>
                            <Image
                                style={{
                                    width: 200,
                                    height: 60
                                }}
                                source={{
                                uri: "" + item.systemLogo + "",
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    )}
                />
            </View>
            <View style={{flexDirection:'row'}}>
            </View>
            <ScrollView 
                scrollEventThrottle={16}
            >
                <Container>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <MainFont>
                            Add Game 
                        </MainFont>
                        <KeyboardAwareScrollView
                            style={{ flex: 1, width: '100%' }}
                            keyboardShouldPersistTaps="always"
                        >
                            <CustomInputField
                                placeholder='Game Name'
                                placeholderTextColor={colors.primaryColor}
                                onChangeText={(text) => setGameName(text)}
                                value={gameName}
                                color={colors.primaryColor}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                            />
                            <CustomInputField
                                placeholder='Game Developer'
                                placeholderTextColor={colors.primaryColor}
                                onChangeText={(text) => setGameDeveloper(text)}
                                value={gameDeveloper}
                                color={colors.primaryColor}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                            />
                            {Object.keys(sgGamesArray)
                                .map((object, i) => (
                                  <Text>{sgGamesArray[i]}</Text>
                            ))}
                        </KeyboardAwareScrollView>
                    </ScrollView>
                </Container>
            </ScrollView>
        </SafeAreaViewContainer>
    )
}
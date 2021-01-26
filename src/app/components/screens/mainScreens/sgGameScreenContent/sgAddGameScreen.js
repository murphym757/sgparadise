import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Button, FlatList, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import {CurrentThemeContext} from '../../../../../../assets/styles/globalTheme'
import { gamesConfig, firebase } from '../../../../../server/config/config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

// React Navigation
import { createStackNavigator } from '@react-navigation/stack'

// App Styling
import {
    SgGameSearchScreen,
    SafeAreaViewContainer,
    Container,
    MainFont,
    CustomInputField,
    TouchableButton,
    TouchableButtonFont,
    FontAwesomeIcon,
    faChevronLeft
} from '../../index'


export default function AddGameScreen({ route, navigation }) {
    const [searchType, setSearchType] = useState('sgGameSearch')
    const colors = useContext(CurrentThemeContext)
    const { igdbConsoleId, gbConsoleId, selectedSystemLogo } = route.params
    const [gameName, setGameName] = useState('')
    console.log("this is your game " + gameName)
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
    const [sgGamesArray, setSgGamesArray] = useState([])
    const [sgGamesIdsArray, setSgGamesIdsArray] = useState([])
    const [sgGamesImagesArray, setSgGamesImagesArray] = useState([])

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
        igdbSearchGame(igdbConsoleId)
      }, [igdbConsoleId])

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

      async function igdbSearchGame() {
        const jsonValue = await AsyncStorage.getItem('igdbAccesstoken')
        const axiosUrl = "https://api.igdb.com/v4/games"
        const igdbFields = 'fields first_release_date,platforms; where first_release_date < 864345600 & platforms = (' + igdbConsoleId + ');'        
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
                    setSgGamesArray(res.data)
                    setSgGamesIdsArray(res.data.map(game => game.id))
                  })
                  .catch(err => {
                    console.error(err);
                  });
        } catch {

        }
      }

      async function igdbSearchGameImage() {
        const jsonValue = await AsyncStorage.getItem('igdbAccesstoken')
        const axiosUrl = "https://api.igdb.com/v4/covers"
        const igdbFields = 'fields alpha_channel,animated,checksum,game,height,image_id,url,width; where game = (' + sgGamesIdsArray + ');'
        try {
            await axios({
            url: axiosUrl,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': gamesConfig.igdbClientId,
                'Authorization': 'Bearer' + " " + jsonValue,
            },
            data: igdbFields
            })
            .then(res => {
                setSgGamesImagesArray(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.error(err)
            })
        } catch {

        }
    }


    async function setGameImage(item) {
        try {
            igdbSearchGameImage(item)
            console.log('This is your item id' + item.id)
        } catch {

        }
       }

       function setConsole() {
           return (
            <Image
                style={{
                    width: 200,
                    height: 60
                }}
                source={{
                    uri: "" + selectedSystemLogo + "",
                }}
            />
           )
       }

        function sgGameSearch() {
            return (
                <SgGameSearchScreen 
                    searchType={searchType}
                />
            )
        }


      function sgAddGameStack() {
          return (
              <View>
                <View style={{flexDirection:'row'}}>
                </View>
                    <Container>  
                        <FlatList
                            data={sgGamesImagesArray}
                            keyboardShouldPersistTaps='always' 
                            keyExtractor={item => item.id}
                            contentContainerStyle={{
                                justifyContent: 'center',
                                flexDirection: 'row'
                            }}
                            renderItem={({ item }) => (
                            <View style={{
                                flex: 1,
                                margin: 5,
                                minWidth: 100,
                                maxWidth: 150,
                                height: 200,
                                maxHeight:304,
                            }}>
                                <TouchableOpacity onPress={() => setGameId(item)}>
                                    <Image
                                        style={{
                                            width: 150,
                                            height: 200
                                        }}
                                        source={{
                                            uri: "https://images.igdb.com/igdb/image/upload/t_1080p/" + item.image_id + ".jpg", 
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                            )}
                        />
                    </Container>
              </View>
          )
      }

      

    return (
        <SafeAreaViewContainer>
            <FontAwesomeIcon 
                icon={ faChevronLeft } color={colors.primaryFontColor} size={50} 
                onPress={() => navigation.navigate('SgConsoleList', { modal: false })}
            />
            <Text>Received params: {JSON.stringify(route.params)}</Text>
            <Text>Your here now</Text>
                {sgAddGameStack()}
                {setConsole()}
                {sgGameSearch({ navigation })}
        </SafeAreaViewContainer>
    )
}
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
    ConfirmAddGameScreen,
    SgGameSearchScreen,
    SafeAreaViewContainer,
    ContentContainer,
    Container,
    MainFont,
    CustomInputField,
    TouchableButton,
    TouchableButtonFont,
    FontAwesomeIcon,
    faChevronLeft
} from '../../index'

import {
    consoleIconList
} from './sgAPIIndex'

import { loadingScreen } from '../../authScreens/loadingScreen' //Loader


export default function AddGameScreen({ route, navigation }) {
    const colors = useContext(CurrentThemeContext)
    const [isLoading, setIsLoading] = useState(true)
    const [searchType, setSearchType] = useState('sgGameSearch')
    const { igdbConsoleId, gbConsoleId, selectedSystemLogo } = route.params
    const [sgGamesArray, setSgGamesArray] = useState([])
    const [sgGamesIdsArray, setSgGamesIdsArray] = useState([])
    const [sgGamesImagesArray, setSgGamesImagesArray] = useState([])

    useEffect(() => {
        const twitchIdUrl ='https://id.twitch.tv/oauth2/token?'
        const clientId = 'client_id=' + ""+ gamesConfig.igdbClientId + ""
        const clientSecret = '&client_secret=' + "" + gamesConfig.igdbClientSecret + ""
        const grantType = '&grant_type=client_credentials'
        setTimeout(() => {
            setIsLoading(false)
          }, 2500)
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

    return (
        <SafeAreaViewContainer>
            <Text>Moved On</Text>
        </SafeAreaViewContainer>
    )
}
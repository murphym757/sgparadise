import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Button, Image, ScrollView, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {CurrentThemeContext} from '../../../../../../assets/styles/globalTheme'
import { gamesConfig, firebase } from '../../../../../server/config/config'
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
    console.log(gamesConfig.igdbClientId)
    console.log(gamesConfig.igdbClientSecret)
    useEffect(() => {
        const twitchIdUrl ='https://id.twitch.tv/oauth2/token?'
        const clientId = 'client_id=' + ""+ gamesConfig.igdbClientId + ""
        const clientSecret = '&client_secret=' + "" + gamesConfig.igdbClientSecret + ""
        const grantType = '&grant_type=client_credentials'
        axios.post(twitchIdUrl + clientId + clientSecret + grantType)
            .then(async (res) => {
                console.log(res.data)
                await AsyncStorage.setItem('igdbAccesstoken', jsonValue)
            })
            .catch((err) => {
                console.log(err);
            })
      })

      async function searchGame() {
        try {
            const jsonValue = await AsyncStorage.getItem('igdbAccesstoken')
            const igdbAuthValue = 'Bearer' + " " + JSON.parse(jsonValue)
            console.log(igdbAuthValue)
            axios({
                url: "https://api.igdb.com/v4/games",
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Client-ID': gamesConfig.igdbClientId,
                    'Authorization': igdbAuthValue,
                },
                data: "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,rating,rating_count,release_dates,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;"
              })
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {
                    console.error(err)
                })
        } catch(err) {
            console.log(err)
        }
        
      }

    return (
        <SafeAreaViewContainer>
        {searchBar({navigation}, searchType)}
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
                        </KeyboardAwareScrollView>
                    </ScrollView>
                </Container>
            </ScrollView>
        </SafeAreaViewContainer>
    )
}
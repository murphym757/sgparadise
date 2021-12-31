
import React, { useState, useEffect, useContext } from 'react';
import { 
    Text,
    View,
    FlatList,
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
        SearchGameResults
  } from '../../index'
  import { useSearchBar } from './searchIndex'
import { useAuth } from '../../authScreens/authContext'
  import axios from 'axios'

export default function sgSearchScreen({route, navigation}) {
    const {
        unixTimestampConverter
    } = useAuth()
    const { 
        gamesFilterListName,
        sgDbSearchQuery
     } = useSearchBar()
    //let { searchBarTitle, searchType, searchQuery } = route.params
    const colors = useContext(CurrentThemeContext)
    const { clientIdIGDB, accessTokenIGDB, igdbConsoleId, gbConsoleId, selectedSystemLogo, searchType } = route.params


    // IGDB search data (Put on confirmation page)
    const [igdbGameSelected, setigdbGameSelected] = useState(false)
    const [igdbSearchResults, setIgdbSearchResults] = useState([])
    console.log(igdbSearchResults)
    const [igdbCoversResults, setIgdbCoversResults] = useState([])
    console.log(igdbCoversResults)
    let result = igdbSearchResults.map(({ id }) => id)
    console.log(result)
    const [igdbSearch, setIgdbSearch] = useState(sgDbSearchQuery)
    const [igdbGameId, setIgdbGameId] = useState()
    const [igdbGameName, setIgdbGameName] = useState()
    console.log(igdbGameName)
    const [igdbGameCover, setIgdbGameCover] = useState()
    const [igdbGameRating, setIgdbGameRating] = useState()
    const [igdbGameAgeRating, setIgdbGameAgeRating] = useState()
    const [igdbGameGenres, setIgdbGameGenres] = useState([])
    const [igdbGameScreenshots, setIgdbGameScreenshots] = useState([])
    const [igdbGameSummary, setIgdbGameSummary] = useState()
    const [igdbUnixTimestamp, setIgdbUnixTimestamp]= useState()
    const igdbSearchPlatforms = `(${JSON.stringify(route.params.igdbConsoleId)})`
    const igdbTestField = 'fields alpha_channel, animated, checksum, game, height, image_id, url, width;  where game = (' + `"${sgDbSearchQuery}"` + ');'
    const igdbSearchResultField = 'fields name, category, slug, first_release_date, rating, age_ratings, artworks, screenshots, summary, cover; search ' + `"${sgDbSearchQuery}"` + '; limit 20; where category != 5 & platforms =' + igdbSearchPlatforms + '& cover != null; '
    console.log(igdbSearchResultField) 
    const igdbCoversResultField = 'fields alpha_channel,animated,checksum,game,height,image_id,url,width;  where game = (9476);'
    
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
                    api.post('https://api.igdb.com/v4/games', igdbSearchResultField, {timeout: 2000})
                        .then(res => {
                            setIgdbSearchResults(res.data)
                        }, [])
                        .catch(err => {
                            console.log(err);
                        })
                        .then(function () {
                            // always executed
                        })
                    ),
                    api.post('https://api.igdb.com/v4/covers', igdbCoversResultField, {timeout: 2000})
                        .then(res => {
                            setIgdbCoversResults(res.data)
                        }, [])
                        .catch(err => {
                            console.log(err);
                        })
                        .then(function () {
                            // always executed
                        })
                }, 2000)
              })
            }

        async function sgLoader() {
            await searchTesting()
        }
        sgLoader()
    }, [])

    
    function foundResultsCovers() {
        let result = igdbSearchResults.map(({ id }) => id)
        const todos = [1,2,3,4,5];
        let promiseArray = [];
        for(let i=0;i<result.length;i++){
        promiseArray.push('https://jsonplaceholder.typicode.com/todos/'+result[i])
        }

        Promise.all(promiseArray)
        .then(console.log(promiseArray))
        .catch(err=>console.log(err))
    }
    
    function searchResults() {
        return (
              <FlatList
                  data={gamesFilterListName(igdbSearchResults)}
                  keyboardShouldPersistTaps="always" 
                  contentContainerStyle={{
                      justifyContent: 'center'
                  }}
                  keyExtractor={item => item.id}
                  data={igdbSearchResults.sort((a, b) => a.first_release_date - b.first_release_date)}
                  renderItem={({ item }) => (
                    <SearchGameResults>
                        <TouchableOpacity onPress={() => chosenGame(item)}>
                           <MainSubFont>{item.name}</MainSubFont>
                           <MainFont>{unixTimestampConverter(item)}</MainFont>
                        </TouchableOpacity>
                    </SearchGameResults>
                  )}
              />
          ) 
    }

    function chosenGame(item) {
        navigation.navigate('Page3', {
            igdbGameId: item.id,
            igdbGameName: item.name,
            igdbGameSlug: item.slug,
            igdbGameCover: item.cover,
            igdbGameReleaseDate: unixTimestampConverter(item),
            igdbGameSummary: item.summary,
            igdbGameNameScreenshots: item.screenshots,
            clientIdIGDB: clientIdIGDB,
            accessTokenIGDB: accessTokenIGDB, 
            igdbConsoleId: igdbConsoleId
        })
    }
    

    function searchData() {
        return (
            <Container>
                <MainHeading>{"Search results"}</MainHeading>
                {searchResults()}
            </Container>
        )
    }

    return (
        <View style={{ flex: 1, paddingTop: windowHeight/20, backgroundColor: colors.primaryColor }}>
            <SafeAreaViewContainer>
                {searchData()}
            </SafeAreaViewContainer>
        </View>
    )
}
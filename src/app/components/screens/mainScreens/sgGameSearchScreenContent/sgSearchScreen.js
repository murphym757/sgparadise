
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
  } from '../../index'
  import { useSearchBar } from './searchIndex'
  import axios from 'axios'

export default function sgSearchScreen({route, navigation}) {
    const { 
        searchBar,
        gamesFilterListName,
        testDb,
        sgDbSearchQuery
     } = useSearchBar()
    //let { searchBarTitle, searchType, searchQuery } = route.params
    const colors = useContext(CurrentThemeContext)
    const { clientIdIGDB, accessTokenIGDB, igdbConsoleId, gbConsoleId, selectedSystemLogo, searchType } = route.params
   
    // For Search Bar
    const [searchBarTitle, setSearchBarTitle] = useState('Search Games')
    const [searchQuery, setSearchQuery] = useState('') //Figure out why searchQuery is coming back as "undefined"
    const [ gameName, setGameName ] = useState('')
    const chosenDb = testDb

    // IGDB search data (Put on confirmation page)
    const [igdbGameSelected, setigdbGameSelected] = useState(false)
    const [igdbSearchResults, setIgdbSearchResults] = useState([])
    const [igdbSearch, setIgdbSearch] = useState(sgDbSearchQuery)
    const igdbSearchPlatforms = `(${JSON.stringify(route.params.igdbConsoleId)})`
    const igdbTestField = 'fields name, cover, rating, age_ratings, genres, screenshots, summary, first_release_date; search ' + `"${igdbSearch}"` + '; limit 20; where platforms =' + igdbSearchPlatforms + '& cover != null;'
    const igdbSearchResultField = 'fields name, category, slug, first_release_date, cover; search ' + `"${sgDbSearchQuery}"` + '; limit 20; where category != 5 & platforms =' + igdbSearchPlatforms + '& cover != null; '
    
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
                    )
                }, 2000)
              })
            }
    
            async function sgLoader() {
                await searchTesting()
            }
            sgLoader()
    }, [])

    function confirmSearchGame() {
        navigation.navigate('Page2', {
            clientIdIGDB: clientIdIGDB,
            accessTokenIGDB: accessTokenIGDB, 
            igdbConsoleId: igdbConsoleId,
            gbConsoleId: gbConsoleId,
            selectedSystemLogo: selectedSystemLogo,
            searchType: searchType,
            searchQuery: igdbSearch
        })
    }

    function searchData() {
        return (
            <Container>
                <MainHeading>{"Search for a game"}</MainHeading>
                {searchBar(searchBarTitle, searchType, searchQuery)}
                <TouchableButton onPress={() => confirmSearchGame()}>
                    <TouchableButtonFont>Search</TouchableButtonFont>
                </TouchableButton>
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
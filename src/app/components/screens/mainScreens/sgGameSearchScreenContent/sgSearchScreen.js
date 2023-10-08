
import React, { useState, useEffect, useContext } from 'react'
import { View } from 'react-native'
import { useSearchBar } from 'main/sgGameSearchScreenContent/searchIndex'
import { Container, CurrentThemeContext, MainHeading, SafeAreaViewContainer, TouchableButton, TouchableButtonFont, windowHeight } from 'index';
import axios from 'axios'

export default function SgSearchScreen({route, navigation}) {
    // For Search Bar
    //let { searchBarTitle, searchType, searchQuery } = route.params
    const [ gameName, setGameName ] = useState('')
    const [ homepageSearchBar, setHomepageSearchBar ] = useState(false)
    const [ searchBarTitle, setSearchBarTitle ] = useState('Search Games')
    const [ searchBarTouched, setSearchBarTouched ] = useState(true)
    const [ searchQuery, setSearchQuery ] = useState('') //Figure out why searchQuery is coming back as "undefined"
    const [ searchQueryArray, setSearchQueryArray ] = useState([])
    const { keySearchData, keySearchDataPartOfArray, clientIdIGDB, accessTokenIGDB, igdbConsoleId, gbConsoleId, selectedSystemLogo, searchType } = route.params
    const { searchBar, sgIGDBSearchQuery } = useSearchBar()
    const colors = useContext(CurrentThemeContext)

    // IGDB search data (Put on confirmation page)
    const [ igdbGameSelected, setigdbGameSelected ] = useState(false)
    const [ igdbSearch, setIgdbSearch ] = useState(sgIGDBSearchQuery)
    const [ igdbSearchResults, setIgdbSearchResults ] = useState([])
    const igdbSearchPlatforms = `(${JSON.stringify(route.params.igdbConsoleId)})`
    const igdbSearchResultField = `fields name, category, slug, first_release_date, cover; search "${sgIGDBSearchQuery}"; limit 20; where category != 5 & platforms =${igdbSearchPlatforms}& cover != null;`
    function igdbSearchDetector() {
        function searchTesting() {
            let api = axios.create({
                headers: {
                    'Accept': 'application/json',
                    "Client-ID": route.params.clientIdIGDB,
                    "Authorization": `Bearer ${route.params.accessTokenIGDB}`
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
        return sgLoader()
    }

    function sgFirebaseSearchDetector() {
        if (route.params.keySearchDataPartOfArray == true) return (setSearchQueryArray([route.params.keySearchData[0]]))
        if (route.params.keySearchDataPartOfArray == false) return (setSearchQueryArray([route.params.keySearchData]))
    }

    useEffect(() => {
        if (route.params.clientIdIGDB != null) {
            return igdbSearchDetector()
        } else {
            return sgFirebaseSearchDetector()
        }
    }, [])

    function confirmSearchGame() {
        if(route.params.clientIdIGDB != null) {
            return (
                navigation.navigate('Page2', {
                    accessTokenIGDB: accessTokenIGDB,
                    clientIdIGDB: clientIdIGDB,
                    gbConsoleId: gbConsoleId,
                    igdbConsoleId: igdbConsoleId,
                    searchQuery: igdbSearch,
                    searchType: searchType,
                    selectedSystemLogo: selectedSystemLogo,
                })
            )
        }
    }

    function searchData() {
        return (
            <Container>
                <MainHeading>{"Search for a game"}</MainHeading>
                {searchBar(searchBarTitle, searchType, searchQuery, searchBarTouched, homepageSearchBar)}
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
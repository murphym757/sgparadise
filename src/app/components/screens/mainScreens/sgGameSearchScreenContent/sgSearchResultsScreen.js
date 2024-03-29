
import React, { useState, useEffect, useContext } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { Container, CurrentThemeContext, MainFont, MainHeading, MainSubFont, SafeAreaViewContainer, SearchGameResults, windowHeight } from 'index'
import { useAuth } from 'auth/authContext'
import { useSearchBar } from 'main/sgGameSearchScreenContent/searchIndex'
import axios from 'axios'

export default function sgSearchResultsScreen({route, navigation}) {
    //let { searchBarTitle, searchType, searchQuery } = route.params
    const { clientIdIGDB, accessTokenIGDB, igdbConsoleId, gbConsoleId, selectedSystemLogo, searchType } = route.params
    const { gamesFilterListName, sgIGDBSearchQuery } = useSearchBar()
    const { unixTimestampConverter } = useAuth()
    const colors = useContext(CurrentThemeContext)

    // IGDB search data (Put on confirmation pag
    const [igdbSearchResults, setIgdbSearchResults] = useState([])
    const igdbSearchPlatforms = `(${JSON.stringify(route.params.igdbConsoleId)})`
    const igdbSearchResultField = `fields name, category, slug, first_release_date, alternative_names, rating, age_ratings, artworks, screenshots, summary, cover; search "${sgIGDBSearchQuery}"; limit 20; where category != 5 & platforms =${igdbSearchPlatforms}& cover != null;`
    
    useEffect(() => {
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
        sgLoader()
    }, [])

    function searchResults() {
        return (
            <FlatList
                data={gamesFilterListName(igdbSearchResults.sort((a, b) => a.first_release_date - b.first_release_date))}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{
                    justifyContent: 'center'
                }}
                keyExtractor={item => item.id}
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
            accessTokenIGDB: accessTokenIGDB,
            clientIdIGDB: clientIdIGDB,
            gameName: item.name,
            gameReleaseDate: unixTimestampConverter(item),
            gameSlug: item.slug,
            gameSummary: item.summary,
            igdbConsoleId: igdbConsoleId,
            igdbGameId: item.id
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
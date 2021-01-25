import React, { useState, useEffect } from 'react'
import { 
    View, 
    Text, 
    Button, 
    Image, 
    ScrollView, 
    SafeAreaView 
} from 'react-native'
import axios from 'axios'
import {
    TestImageDB,
    SearchBar,
    SgSearchQuery
} from '../../index'

export default function SgGameSearchScreen({navigation, route}, props) {
    const testGamesDb = TestImageDB.results
    const searchType = props.searchType
    const [ searchQuery, setSearchQuery ] = useState('')
    const [userSearchSelected, setUserSearchSelected] = useState(false)
    const [addGameSelected, setAddGameSelected] = useState(false)

    function filterList(testGamesDb) {
            return testGamesDb.filter(
            (testGame) =>
                testGame.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
                testGame.publisher
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
                testGame.releaseYear
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
                testGame.platform
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            );
        }

        function onSearch() {
            return (searchQuery) => setSearchQuery(searchQuery)
        }

        function resetSearchQuery() {
            setSearchQuery('')
        }

       function sgGameSearchbar() {
            return (
                <SearchBar 
                    searchType={searchType}
                />
            )
        }
        
  return (
    <SafeAreaView style={{ flex: 1 }}>
        {sgGameSearchbar({ navigation })}
        <ScrollView 
            scrollEventThrottle={16}
        >
            <View style={{ flex: 1 }}>
                <Text>
                    Add Games
                </Text>
            </View>
            <View>
                {filterList(testGamesDb).map((testGame, index) => (
                    <SgSearchQuery 
                        key={index} 
                        name={testGame.name} 
                        publisher={testGame.publisher}
                        platform={testGame.platform}
                        releaseDate={testGame.releaseDate}
                        rating={testGame.userRating}
                        coverArt={testGame.gameImages.coverArt}
                        gameplayImage={testGame.gameImages.gameplay[0]}
                    />
                ))}
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}
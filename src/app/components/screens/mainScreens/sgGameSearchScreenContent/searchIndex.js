import React, { useContext, useEffect, useState } from 'react'
import { 
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native'
import {CurrentThemeContext} from '../../../../../../assets/styles/globalTheme'
import {
    CustomInputField,
    TouchableButton,
    TouchableButtonFont,
    FooterView,
    FooterFont,
    FooterLink
  } from '../../../../../../assets/styles/authScreensStyling'

  import{
    MainFont,
    MainSubFont,
    MainHeading
} from '../../../../../../assets/styles/globalStyling'

  import { TestImageDB } from '../../index'

const SearchContext = React.createContext()

export function useSearchBar() {
    return useContext(SearchContext)
}

export function SearchBarProvider({ children, navigation }) {
    const colors = useContext(CurrentThemeContext)
    const testDb = TestImageDB.results
    const [ gameName, setGameName ] = useState('')
    const [ sgDbSearchQuery, setSgDbSearchQuery ] = useState('')
    console.log("this is sgDbSearchQuery " + sgDbSearchQuery)
    const [ addGameSearchQuery, setAddGameSearchQuery ] = useState('') 
    console.log("this is addGameSearchQuery " + addGameSearchQuery)

    function searchBar(searchBarTitle, searchType, searchQuery) {
        function onSearchFinder() {
            if (searchType == 'sgDBSearch') return (searchQuery) => setSgDbSearchQuery(searchQuery)
            return (searchQuery) => setAddGameSearchQuery(searchQuery)
        }
        
        function searchBarState() {
            if (searchType == 'sgDBSearch') return sgDbSearchQuery
            return addGameSearchQuery
        }
       return <View>
                <CustomInputField
                    placeholderTextColor={colors.primaryColor}
                    placeholder={searchBarTitle}
                    onChangeText={setSgDbSearchQuery}
                    value={searchBarState()}
                    color={colors.primaryColor}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
       </View>
    }

    function gamesFilterListName(chosenDb) {
        return chosenDb.filter(
        (chosenItem) =>
            chosenItem.name //Looks thorough database for anything matching the same "Name"
                .toLowerCase()
                .includes(sgDbSearchQuery.toLowerCase())
        );
    }

    const value = {
        searchBar,
        gamesFilterListName,
        sgDbSearchQuery,
        testDb,
        gameName
    }

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    )
}
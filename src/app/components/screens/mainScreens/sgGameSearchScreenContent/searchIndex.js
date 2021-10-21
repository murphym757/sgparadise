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

  import { TestImageDB } from '../../index'

const SearchContext = React.createContext()

export function useSearchBar() {
    return useContext(SearchContext)
}

export function SearchBarProvider({ children }) {
    const colors = useContext(CurrentThemeContext)
    const testingTesting = TestImageDB.results
    const [ sgDbSearchQuery, setSgDbSearchQuery ] = useState('')
    const [ addGameSearchQuery, setAddGameSearchQuery ] = useState('') 

    function dbSelector() {
        return gamesFilterListName(testingTesting)
    }

    function searchBar(searchBarTitle, searchType, searchQuery) {
        function onSearchFinder() {
            if (searchQuery == '') {  
                if (searchType == 'sgDBSearch') {
                    return (searchQuery) => setSgDbSearchQuery(searchQuery)
                } else {
                    return (searchQuery) => setAddGameSearchQuery(searchQuery)
                }
            } else {
                if (searchType == 'sgDBSearch') {
                    setSgDbSearchQuery(searchQuery)
                } else {
                    setAddGameSearchQuery(searchQuery)
                }
            }
            
        }
        
        function searchBarState() {
            if (searchType == 'sgDBSearch') {
                return sgDbSearchQuery
            } else {
                return addGameSearchQuery
            }
        }
       return <View>
                <CustomInputField
                    placeholderTextColor={colors.primaryColor}
                    placeholder={searchBarTitle}
                    onChangeText={onSearchFinder()}
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

    function searchResults() {
        return (
              <FlatList
                  data={dbSelector()}
                  keyboardShouldPersistTaps="always" 
                  contentContainerStyle={{
                      justifyContent: 'center'
                  }}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <View style={{
                        flexDirection: 'column',
                        flex: 1,
                        marginBottom: 120
                    }}>
                        <TouchableOpacity>
                           <Text>{item.name}</Text>
                        </TouchableOpacity>
                    </View>
                  )}
              />
          ) 
    }

    const value = {
        searchBar,
        searchResults
    }

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    )
}
import React, { useContext, useEffect, useState } from 'react'
import { 
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native'
import { 
    faSearch,
    faTimes,
    FontAwesomeIcon,
    CustomInputField,
    CurrentThemeContext,
    TestImageDB,
    CustomSearchBarContainer,
    CustomSearchBarTextInput, 
    ViewTopRow,
} from 'index'

const SearchContext = React.createContext()

export function useSearchBar() {
    return useContext(SearchContext)
}

export function SearchBarProvider({ children, navigation }) {
    const colors = useContext(CurrentThemeContext)
    const testDb = TestImageDB.results
    const [ gameName, setGameName ] = useState('')
    const [ sgIGDBSearchQuery, setsgIGDBSearchQuery ] = useState('')
    const [ sgFirebaseSearchQuery, setsgFirebaseSearchQuery ] = useState('')

    function searchBar(searchBarTitle, searchType, searchQuery, searchBarTouched, setSearchBarTouched, homepageSearchBar) {
        function searchBarState() {
            if (searchType == 'sgIGDBSearch') return sgIGDBSearchQuery
            if (searchType == 'sgFirebaseSearch') return sgFirebaseSearchQuery
        }
        function searchBarQuery() {
            if (searchType == 'sgIGDBSearch') return setsgIGDBSearchQuery
            if (searchType == 'sgFirebaseSearch') return setsgFirebaseSearchQuery
        }

        function resetSearchBarQuery() {
            setSearchBarTouched(false)
            if (searchType == 'sgIGDBSearch') return setsgIGDBSearchQuery('')
            if (searchType == 'sgFirebaseSearch') return setsgFirebaseSearchQuery('')
        }

        
        return <View>
                    {searchBarTouched == true
                        ?   <CustomSearchBarContainer>
                                <ViewTopRow style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{ alignItems: 'left', justifyContent: 'center', backgroundColor: colors.primaryColor, paddingRight: 10 }}>
                                        <FontAwesomeIcon 
                                            icon={ faSearch } color={colors.primaryColorAlt} size={25}
                                        />
                                    </View>
                                    <CustomSearchBarTextInput
                                        style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', paddingRight: 190}}
                                        placeholderTextColor={colors.primaryColorAlt}
                                        placeholder={searchBarTitle}
                                        onChangeText={searchBarQuery()}
                                        value={searchBarState()}
                                        underlineColorAndroid="transparent"
                                        autoCapitalize="none"
                                    />
                                    {homepageSearchBar == true
                                        ?   <TouchableOpacity onPress={() => resetSearchBarQuery()} style={{ alignItems: 'right', justifyContent: 'center', backgroundColor: colors.primaryColor }}>
                                                <View>
                                                    <FontAwesomeIcon icon={ faTimes } color={colors.primaryColorAlt} size={25} />
                                                </View>
                                            </TouchableOpacity>
                                        :   <View/>
                                    }
                                </ViewTopRow>
                            </CustomSearchBarContainer>
                        :   <View style={{ alignItems: 'left', justifyContent: 'center', backgroundColor: colors.primaryColor, paddingVertical: 25 }}>
                                <FontAwesomeIcon 
                                    icon={ faSearch } color={colors.primaryColorAlt} size={25}
                                />
                            </View>
                    }
        </View>
    }

    function gamesFilterListName(chosenDb) {
        return chosenDb.filter(
            (chosenItem) =>
                chosenItem.name //Looks thorough database for anything matching the same "Name"
                    .toLowerCase()
                    .includes(sgIGDBSearchQuery.toLowerCase())
        )
    }

    const value = {
        searchBar,
        gamesFilterListName,
        sgIGDBSearchQuery,
        testDb,
        gameName
    }

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    )
}
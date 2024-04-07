import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import { faSearch, FontAwesomeIcon, CurrentThemeContext, CustomSearchBarContainer, CustomSearchBarTextInput, ViewTopRow } from 'index'

const SearchContext = React.createContext()

export function useSearchBar() {
    return useContext(SearchContext)
}

export function SearchBarProvider({ children, navigation }) {
    const [ gameName, setGameName ] = useState('')
    const [ sgFirebaseSearchQuery, setsgFirebaseSearchQuery ] = useState('')
    const [ sgIGDBSearchQuery, setsgIGDBSearchQuery ] = useState('')
    const colors = useContext(CurrentThemeContext)

    function searchBar(searchBarTitle, searchType, searchQuery, searchBarTouched, setSearchBarTouched, homepageSearchBar) {
        function searchBarState() {
            if (searchType == 'sgIGDBSearch') return sgIGDBSearchQuery
            if (searchType == 'sgFirebaseSearch') return sgFirebaseSearchQuery
        }
        function searchBarQuery() {
            if (searchType == 'sgIGDBSearch') return setsgIGDBSearchQuery
            if (searchType == 'sgFirebaseSearch') return setsgFirebaseSearchQuery
        }

        /* Commented out for further research. Decision to remove this will come at a later date
        function resetSearchBarQuery() {
            setSearchBarTouched(false)
            if (searchType == 'sgIGDBSearch') return setsgIGDBSearchQuery('')
            if (searchType == 'sgFirebaseSearch') return setsgFirebaseSearchQuery('')
        }
        */


        return (
            <View>
                {searchBarTouched == true
                    ?   <CustomSearchBarContainer>
                            <ViewTopRow style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{ alignItems: 'flex-start', justifyContent: 'center', backgroundColor: colors.primaryColor, paddingRight: 10 }}>
                                    <FontAwesomeIcon
                                        icon={ faSearch } color={colors.primaryColorAlt} size={25}
                                    />
                                </View>
                                <CustomSearchBarTextInput
                                    style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', paddingRight: 190}}
                                    placeholderTextColor={colors.primaryColorAlt}
                                    placeholder={searchBarTitle}
                                    clearButtonMode="while-editing"
                                    onChangeText={searchBarQuery()}
                                    value={searchBarState()}
                                    underlineColorAndroid="transparent"
                                    autoCapitalize="none"
                                />
                                {/*Commented out for further research. Decision to remove this will come at a later date
                                    homepageSearchBar == true
                                    ?   <Pressable onPress={() => resetSearchBarQuery()} style={{ alignItems: 'right', justifyContent: 'center', backgroundColor: colors.primaryColor }}>
                                            <View>
                                                <FontAwesomeIcon icon={ faTimes } color={colors.primaryColorAlt} size={25} />
                                            </View>
                                        </Pressable>
                                    :   <View/>
                                */}
                            </ViewTopRow>
                        </CustomSearchBarContainer>
                    :   <View style={{ alignItems: 'flex-start', justifyContent: 'center', backgroundColor: colors.primaryColor, paddingVertical: 25 }}>
                            <FontAwesomeIcon
                                icon={ faSearch } color={colors.primaryColorAlt} size={25}
                            />
                        </View>
                }
            </View>
        )
    }

    function gamesFilterListName(chosenDb) {
        return chosenDb.filter(
            (chosenItem) =>
                chosenItem.name //Looks thorough database for anything matching the same "Name"
                    .toLowerCase()
                    .includes(sgIGDBSearchQuery.toLowerCase())
        )
    }

    const value = { gameName, gamesFilterListName, searchBar, sgIGDBSearchQuery }

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    )
}
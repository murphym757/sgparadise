import React, { useContext, useEffect, useState } from 'react'
import { 
    Text
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

export function searchBar({navigation}, searchType) {
    const colors = useContext(CurrentThemeContext)
    const onSearch = props.onSearch
    const searchQuery = props.searchQuery
    const resetSearchQuery = props.resetSearchQuery
    const searchType = props.searchType
    const [ sgDbSearchQuery, setSgDbSearchQuery ] = useState('')
    const [ addGameSearchQuery, setAddGameSearchQuery ] = useState('')

    function onSearch(dbSearch) {
        if ({searchType} == 'sgDBSearch' || {searchType} == '') {
            return (sgDbSearchQuery) => setSgDbSearchQuery(sgDbSearchQuery)
        } else {
            return (addGameSearchQuery) => setAddGameSearchQuery(addGameSearchQuery)
        }
        
    }
    function searchBarState(dbSearch) {
        if ({searchType} == 'sgDBSearch' || {searchType} == '') {
            return sgDbSearchQuery
        } else {
            return addGameSearchQuery
        }
    }

    function searchScreenType({navigation}) {
        if ({searchType} == 'sgDBSearch' || {searchType} == '') {
            return navigation.navigate('SgSearchHome')
        } else {
            return navigation.navigate('SgSearchGame')
        }
        
    }

    return (
        <CustomInputField
            placeholderTextColor={colors.primaryColor}
            placeholder='Search Games'
            onKeyPress={() => searchScreenType({navigation})}
            onChangeText={onSearch()}
            value={searchBarState(dbSearch)}
            color={colors.primaryColor}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
        />
    )
}
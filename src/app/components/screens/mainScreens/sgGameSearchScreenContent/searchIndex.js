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
    const [ sgDbSearchQuery, setSgDbSearchQuery ] = useState('')
    const [ addGameSearchQuery, setAddGameSearchQuery ] = useState('')

    function onSearch(searchType) {
        if ({searchType} == 'sgDBSearch' || {searchType} == '') {
            return (sgDbSearchQuery) => setSgDbSearchQuery(sgDbSearchQuery)
        } else {
            return (addGameSearchQuery) => setAddGameSearchQuery(addGameSearchQuery)
        }
        
    }
    function searchBarState(searchType) {
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
            value={searchBarState(searchType)}
            color={colors.primaryColor}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
        />
    )
}
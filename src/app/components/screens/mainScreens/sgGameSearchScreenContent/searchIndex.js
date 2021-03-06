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

export default function SearchBar({navigation}, props) {
    const colors = useContext(CurrentThemeContext)
    const searchType = props.searchType
    const [ sgDbSearchQuery, setSgDbSearchQuery ] = useState('')
    console.log(sgDbSearchQuery)
    const [ addGameSearchQuery, setAddGameSearchQuery ] = useState('')
    console.log(addGameSearchQuery)
    function onSearchFinder() {
        if ({searchType} == 'sgDBSearch' || {searchType} == '') {
            return (searchQuery) => setSgDbSearchQuery(searchQuery)
        } else {
            return (searchQuery) => setAddGameSearchQuery(searchQuery)
        }
        
    }
    function searchBarState() {
        if ({searchType} == 'sgDBSearch' || {searchType} == '') {
            return sgDbSearchQuery
        } else {
            return addGameSearchQuery
        }
    }

    return (
        <CustomInputField
            placeholderTextColor={colors.primaryColor}
            placeholder='Search Games'
            onChangeText={onSearchFinder()}
            value={searchBarState()}
            color={colors.primaryColor}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
        />
    )
}
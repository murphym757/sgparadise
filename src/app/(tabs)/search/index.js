import React, { useContext } from "react"
import { useLocalSearchParams, Link } from "expo-router"
import { Text, View } from "react-native"
import { CurrentThemeContext } from 'index'
import { PageStructureContext } from '../reuseableComponents/pageStructure'

export default function PageContentGamePage() {
    const colors = useContext(CurrentThemeContext)
    const pageStructure = useContext(PageStructureContext)
    const pageTitle = 'Index page of Search Tab'
    const isNextPage = false
    const backHeaderTitle = 'Search'
    const params = useLocalSearchParams()
  const { 
    passedProp,
  } = params
    function pageContent() {
        return (
            <View>
                <Text style={{color: colors.primaryFontColor}}>{pageTitle}</Text>
                <Text style={{color: colors.primaryFontColor}}>{passedProp}</Text>
            </View>
        )
    }

    return pageStructure.pageStackStructure(isNextPage, backHeaderTitle, pageContent())
}
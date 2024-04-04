import React, { useContext } from "react"
import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"
import { CurrentThemeContext } from 'index'
import { PageStructureContext } from '../reuseableComponents/pageStructure'

export default function PageContentGamePage() {
    const colors = useContext(CurrentThemeContext)
    const pageStructure = useContext(PageStructureContext)
    const pageTitle = 'Index page of Account Tab'
    const isNextPage = false
    const backHeaderTitle = 'Search'
    function pageContent() {
        return (
            <View>
                <Text style={{color: colors.primaryFontColor}}>{pageTitle}</Text>
            </View>
        )
    }

    return pageStructure.pageStackStructure(isNextPage, backHeaderTitle, pageContent())
}
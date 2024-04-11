import React, { useState, useContext } from "react"
import { useLocalSearchParams, Link } from "expo-router"
import { Text, View, StyleSheet, ScrollView } from "react-native"
import { Searchbar } from "react-native-paper"
import { CurrentThemeContext, Container, algoliaConfig } from 'index'
import { customRefinementContext } from 'main/sgGameSearchScreenContent/sgAlgoliaComponents/sgAlgoliaRefinementContext'
import { InfiniteHits, Hit } from 'main/sgGameSearchScreenContent/sgAlgoliaComponents/sgAlgoliaSearchHitsContext'
import { InstantSearch } from 'react-instantsearch-core'
import { ModalButton } from 'auth/sgModal'
import { SearchBox } from 'main/sgGameSearchScreenContent/sgAlgoliaComponents/sgAlgoliaSearchBarContext'
import { useAuth } from 'auth/authContext'
import algoliasearch from 'algoliasearch'
import { PageStructureContext } from '../reuseableComponents/pageStructure'

export default function PageContentGamePage() {
  const colors = useContext(CurrentThemeContext)
  const pageStructure = useContext(PageStructureContext)
  const customRefinements = useContext(customRefinementContext)
  const [searchQuery, setSearchQuery] = useState('')
  const isNextPage = false
  const backHeaderTitle = 'Search'
  const params = useLocalSearchParams()
  const { 
    passedProp,
  } = params
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 24,
    },
    main: {
        flex: 1,
        justifyContent: "center",
        maxWidth: 960,
        marginHorizontal: "auto",
    },
    title: {
        color: colors.primaryColorAlt,
        fontFamily: 'SpartanBlack',
        fontSize: 64,
    },
    subtitle: {
        fontSize: 36,
        color: colors.secondaryColor,
    },
  })  

  function sgAlgolia() {
    const searchClient = algoliasearch(algoliaConfig.appId, algoliaConfig.apiKey);
    return (
        <InstantSearch searchClient={searchClient} indexName="games" style={{ flex: 1 }}>
            
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    {sgAlgoliaConsoleRefinements()}
                </View>
                <View style={{flex: 10 }}>
                    <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
                        {sgAlgoliaHits()}
                    </ScrollView>
                </View>
            </View>
        </InstantSearch>
    )
  }

  function sgAlgoliaConsoleRefinements() {
    return (
        <customRefinements.refinementConsoleList colors={colors} />
    )
  }
  function sgAlgoliaHits() {
    return (
        <InfiniteHits hitComponent={Hit} />
    )
}

  function searchBar(prop) {
    return (
      <Searchbar
        placeholder={prop}
        onChangeText={setSearchQuery}
        value={passedProp !== undefined ?passedProp :searchQuery}
        iconColor={colors.primaryColorAlt}
        inputStyle={{color: colors.primaryColor}}
        style={{backgroundColor: colors.secondaryColor}}
      />
    )
  }

  function pageContent() {
      return (
          <View style={styles.container}>
            {searchBar('Search Game')}
            <Text style={{color: colors.primaryFontColor}}>{passedProp}</Text>
            {sgAlgolia()}
          </View>
      )
  }

    return pageStructure.pageStackStructure(isNextPage, backHeaderTitle, pageContent())
}
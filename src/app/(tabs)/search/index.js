import React, { useState, useContext, useRef } from "react"
import { useLocalSearchParams, Link } from "expo-router"
import { View, StyleSheet, ScrollView } from "react-native"
import { Searchbar, Button, Modal, Portal, Text } from "react-native-paper"
import { CurrentThemeContext, Container, algoliaConfig } from 'index'
import { customRefinementContext } from 'main/sgGameSearchScreenContent/sgAlgoliaComponents/sgAlgoliaRefinementContext'
import { InfiniteHits, Hit } from 'main/sgGameSearchScreenContent/sgAlgoliaComponents/sgAlgoliaSearchHitsContext'
import { InstantSearch } from 'react-instantsearch-core'
import { ModalButton } from 'auth/sgModal'
import { SearchBox } from 'main/sgGameSearchScreenContent/sgAlgoliaComponents/sgAlgoliaSearchBarContext'
import { useAuth } from 'auth/authContext'
import algoliasearch from 'algoliasearch'
import { PageStructureContext } from '../reuseableComponents/pageStructure'
import { responsivePxSize } from 'assets/styles/globalStyling'

export default function PageContentGamePage() {
  const colors = useContext(CurrentThemeContext)
  const pageStructure = useContext(PageStructureContext)
  const customRefinements = useContext(customRefinementContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [visible, setVisible] = useState(false)
  const isNextPage = false
  const backHeaderTitle = 'Search'
  const params = useLocalSearchParams()
  const listRef = useRef(null)
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

  //* algolia searchArea
  function sgAlgoliaCustomSearchBar(searchBarProp) {
    return (
        <SearchBox 
          colors={colors}
          gamePageLinkProp={passedProp} 
          gamePageLinkPressed={false} 
          gamePageLinkPressedSearchable={'tec toy'} 
          searchBarTitle={searchBarProp} 
          onChange={scrollToTop} 
        />
    )
  }
  function searchBarModalButton(fontSizeProp) {
    return (
      <ModalButton refinementColors={colors} fontSizeProp={fontSizeProp} />
  )
  }

  function sgSearchArea(searchBarProp) {
    return (
      <View style={{flexDirection: "row", justifyContent: "center"}}>
        <View style={{flex: 7}}>
          {sgAlgoliaCustomSearchBar(searchBarProp)}
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          {searchBarModalButton(30)}
        </View> 
      </View>
    )
  }

  //* algolia console refinements
  function sgConsoleRefinements() {
    return (
      <Container style={{flex: 1, flexDirection: "row", justifyContent: 'center'}}>
        <customRefinements.refinementConsoleList colors={colors} />
      </Container>
    )
  }
  //* algolia hits
  function sgHits() {
    return (
      <View style={{flex: 10 }}>
        <InfiniteHits 
          hitComponent={Hit}
          title="Games"
          />
      </View>
    )
  }
  
  function sgAlgolia(searchBarProp) {
    const searchClient = algoliasearch(algoliaConfig.appId, algoliaConfig.apiKey)
    return (
        <InstantSearch searchClient={searchClient} indexName="games" style={{ flex: 1 }}>
            {sgSearchArea(searchBarProp)}
            <View style={{flex: 1}}>
              {sgConsoleRefinements()}
              {sgHits()}
            </View>
        </InstantSearch>
    )
  }

  function scrollToTop() {
    listRef.current?.scrollToOffset({ animated: false, offset: 0 });
  }
  
  function pageContent() {
      return (
          <View style={styles.container}>
            <Text style={{color: colors.primaryFontColor}}>{passedProp}</Text>
            {sgAlgolia('Search Game')}
          </View>
      )
  }

    return pageStructure.pageStackStructure(isNextPage, backHeaderTitle, pageContent())
}
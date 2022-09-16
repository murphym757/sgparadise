import React, { useRef, useState, useContext } from 'react';
import { SafeAreaView, StatusBar, Text, Button, Image, FlatList, TouchableOpacity } from 'react-native'
import { SearchBox } from './sgAlgoliaSearchBarContext'
import { InfiniteHits } from './sgMeilisearchHitsContext'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-hooks';
import { Hits } from 'react-instantsearch-dom';
import { 
    algoliaConfig,
    CustomSearchBarContainer,
    CustomSearchBarTextInput, 
    MainFont
} from 'index'

export function SearchArea(props) {
    const listRef = useRef(null);

  function scrollToTop() {
    listRef.current?.scrollToOffset({ animated: false, offset: 0 });
  }
    function sgAlgolia() {
        const searchClient = algoliasearch(algoliaConfig.appId, algoliaConfig.apiKey);
        return (
            <InstantSearch searchClient={searchClient} indexName="games">
                <SearchBox onChange={scrollToTop} />
                <InfiniteHits hitComponent={Hit} />
            </InstantSearch>
        )
    {/*
        const client = algoliasearch(algoliaConfig.appId, algoliaConfig.apiKey)
        const Hit = ({ hit }) => <Highlight attribute="name" hit={hit} />;
        return <View>
                    <InstantSearch indexName="games" searchClient={client}>
                    <SearchBox />
                    <View style={{paddingTop: 200}}><InfiniteHits hitComponent={Hit}/></View>

                    </InstantSearch>
        </View>
    */}
        
    }
    function Hit({ hit }) {
        return (
          <MainFont>{hit.gameName}</MainFont>
        );
      }

  return (
    <SafeAreaView>
    <StatusBar style="light" />
        {sgAlgolia()}
    </SafeAreaView>
  );
}
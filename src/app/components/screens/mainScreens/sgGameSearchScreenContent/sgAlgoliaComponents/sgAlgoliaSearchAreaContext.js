import React, { useRef, useState, useContext } from 'react';
import { View, SafeAreaView, StatusBar, Text, Button, Image, FlatList, TouchableOpacity } from 'react-native'
import { SearchBox } from './sgAlgoliaSearchBarContext'
import { InfiniteHits } from './sgMeilisearchHitsContext'
import Filters from './sgAlgoliaRefinementList'
import algoliasearch from 'algoliasearch'
import { InstantSearch } from 'react-instantsearch-hooks';
import { Hits } from 'react-instantsearch-dom';
import { 
    algoliaConfig,
    CurrentThemeContext,
    CustomSearchBarContainer,
    CustomSearchBarTextInput, 
    MainFont,
    MainSubFont,
    homeScreenGenreContext,
    FontAwesomeIcon,
    faStar,
    faSearch,
    ViewTopRow
} from 'index'

export function SearchArea(props) {
  const colors = useContext(CurrentThemeContext) 
  const genreSpecFunc = useContext(homeScreenGenreContext)
  const listRef = useRef(null);
  const [isModalOpen, setModalOpen] = useState(false);


  function scrollToTop() {
    listRef.current?.scrollToOffset({ animated: false, offset: 0 });
  }
    function sgAlgolia() {
        const searchClient = algoliasearch(algoliaConfig.appId, algoliaConfig.apiKey);
        return (
          <InstantSearch searchClient={searchClient} indexName="games">
            <CustomSearchBarContainer>
              <ViewTopRow style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{ alignItems: 'left', justifyContent: 'center', backgroundColor: colors.primaryColor, paddingRight: 10 }}>
                    <FontAwesomeIcon 
                        icon={ faSearch } color={colors.primaryColorAlt} size={25}
                    />
                  </View>
                  <SearchBox onChange={scrollToTop} />
                </ViewTopRow>
            </CustomSearchBarContainer>
            <Filters 
              isModalOpen={isModalOpen}
              onToggleModal={() => setModalOpen((isOpen) => !isOpen)}
              onChange={scrollToTop} 
            />
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

    function sgAlgoliaDeleteObject() {
      const searchClient = algoliasearch(algoliaConfig.appId, algoliaConfig.apiKey);
      const index = searchClient.initIndex('games');
      index.deleteObject('pac-man-2-the-new-adventures (Genesis)').then(({ hits }) => {
        console.log(hits);
      });
    }

    function Hit({ hit }) { 
      const gameNameValue = hit.gameName
      const gameSubGenreValue = hit.gameSubgenre
      const coverLink = hit.gameCover
      const coverHeight = 75
      const coverWidth = 50
        return (
          <View style={{flexDirection: "row"}}>
            <View style={{}}>
              {genreSpecFunc.detailedGameCover(coverLink, coverHeight, coverWidth)}
            </View>
            <View style={{paddingLeft: 25}}>
              <View>
                {genreSpecFunc.charLengthSet(gameNameValue, gameNameValue.length, 35, 35)}
              </View>
              <View style={{flexDirection: "row", paddingVertical: 10}}>
                <MainFont>{hit.gameReleaseDate}</MainFont>
                <MainSubFont> / </MainSubFont>
                {genreSpecFunc.charLengthSet(gameSubGenreValue, gameSubGenreValue.length, 17, 15)}
                <MainSubFont> / </MainSubFont>
                <MainFont>{hit.gameRating} <FontAwesomeIcon icon={ faStar } color={colors.secondaryFontColor} size={12} /></MainFont>
              </View>
              <View>
                <MainFont>Sega Genesis</MainFont>
              </View>
            </View>
        </View>
        );
      }

  return (
    <SafeAreaView>
    <StatusBar style="light" />
        {sgAlgolia()}
    </SafeAreaView>
  );
}
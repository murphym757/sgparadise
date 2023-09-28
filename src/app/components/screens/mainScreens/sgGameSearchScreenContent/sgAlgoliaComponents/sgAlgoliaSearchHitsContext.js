import React, { forwardRef, useState, useContext } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { useInfiniteHits, usePagination } from 'react-instantsearch-hooks';
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
  ViewTopRow, 
  AppWideImageContext,
} from 'index'

export const InfiniteHits = forwardRef(
  ({ hitComponent: Hit, ...props }, ref) => {
    const colors = useContext(CurrentThemeContext)
    const { hits, isLastPage, showMore } = useInfiniteHits(props);
    const [ gameSelected, setGameSelected ] = useState('')

    async function chosenAlgoliaGame(item) {
      setGameSelected(item.gameName)
      passDataToNextPage(item)
  }

    // Links to the game page
    function passDataToNextPage(item) {
      const navPass = props.nav
      const consoleName = item.consoleName
      const gameName = item.gameSlug
      return (
        navPass.navigate('sgGamePageSearch', {
              collectionName: 'sgAPI',
              gamesCollection: 'games',
              consoleName: "sg" + consoleName,
              gameName,
              gameGenre: item.gameGenre,
              gameImageCount: item.firebaseGameNameImageCount,
              back2Search: true
          })
      )
    }

    return (
      <FlatList
        ref={ref}
        data={hits} 
        ListHeaderComponent={() => (hits.length === 0
          ? <Text>The list is empty</Text>  
          : null)
        }
        keyExtractor={(item) => item.objectID}
        ItemSeparatorComponent={() => <View style={{borderBottomWidth: 1, borderColor: colors.primaryColorLight}} />}
        onEndReached={() => {
          if (!isLastPage) {
            showMore();
          }
        }}
        renderItem={({ item }) => (
          <View style={{paddingHorizontal: 18, paddingVertical: 25}}>
            <TouchableOpacity onPress={() => chosenAlgoliaGame(item)}>
              <Hit hit={item} />
            </TouchableOpacity>
          </View>
        )}
      />
    );
  }
);

export function Hit({ hit }) {
  function gameCoverSearch() {
    const imageData = {
      height: 75,
      width: 50,
      contentFit: 'stretch',
      borderRadius: 5,
      transition: 1000
    }
    return images.detailedGameCover(imageData, coverLink)
  }
  const colors = useContext(CurrentThemeContext) 
  const genreSpecFunc = useContext(homeScreenGenreContext)
  const images = useContext(AppWideImageContext)
  const gameNameValue = hit.gameName
  const gameSubGenreValue = hit.gameSubgenre
  const coverLink = hit.gameCover
    return (
      <View style={{flexDirection: "row"}}>
        <View style={{}}>
          {gameCoverSearch()}
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
            <MainFont>{hit.gameRating} <FontAwesomeIcon icon={ faStar } color={colors.secondaryColor} size={12} /></MainFont>
          </View>
          <View>
            <MainFont>{hit.consoleName}</MainFont>
          </View>
        </View>
    </View>
    );
  }
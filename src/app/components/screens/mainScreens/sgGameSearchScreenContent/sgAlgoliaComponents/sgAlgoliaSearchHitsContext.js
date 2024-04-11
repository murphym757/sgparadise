import React, { forwardRef, useState, useContext } from 'react'
import { StyleSheet, View, FlatList, Text, Pressable } from 'react-native'
import { Link } from 'expo-router'
import { AppWideImageContext } from 'main/sgImageContext'
import { homeScreenGenreContext } from 'main/sgHomeScreenContext'
import { useInfiniteHits, usePagination } from 'react-instantsearch-core'
import { 
  algoliaConfig,
  CurrentThemeContext,
  CustomSearchBarContainer,
  CustomSearchBarTextInput, 
  MainFont,
  MainSubFont,
  FontAwesomeIcon,
  faStar,
  ViewTopRow
} from 'index'

export const InfiniteHits = forwardRef(
  ({ hitComponent: Hit, ...props }, ref) => {
    const colors = useContext(CurrentThemeContext)
    const { hits, isLastPage, showMore } = useInfiniteHits(props);
    const [ gameSelected, setGameSelected ] = useState('')

    async function chosenAlgoliaGame(item) {
      props.pageLinkToGame(item.gameName)
      console.log('Chosen Algolia Game: ', item.gameName)
  }

  //* Link Function
  //TODO: Change the nextPagePath to the correct path (i.e. the game page path)
    function pageLinkToSearch(passedProp, item) {
      const nextPagePath = "/home/next-page-gamePage"
      const linkContent = 'Go to Search page'
      const pageTitle = 'Search'
      const linkedDataSearch = {
          nextPagePath,
          linkContent
      }
      return (
          <Link 
              href={{
                  pathname: nextPagePath, 
                  params: { 
                      backHeaderTitle: pageTitle,
                      gameSlug: item.gameSlug
                  }
              }} 
              style={{color: colors.primaryFontColor}}>
                {passedProp}
          </Link>
      )
    }
  //*-----Link Function-----*//

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
        ListHeaderComponent={() => (
            hits.length === 0
              ? <Text>The list is empty</Text>  
              : null
          )
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
            <Pressable>
              {pageLinkToSearch(<Hit hit={item} />, item)}
            </Pressable>
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
import React, { forwardRef, useState, useContext } from 'react';
import { View, FlatList, Text, Pressable } from 'react-native';
import { Link } from 'expo-router'
import { AppWideImageContext } from 'main/sgImageContext'
import { homeScreenGenreContext } from 'main/sgHomeScreenContext'
import { useInfiniteHits } from 'react-instantsearch-core';
import { CurrentThemeContext, MainFont, MainSubFont, FontAwesomeIcon, faStar } from 'index';

export const InfiniteHits = forwardRef(
  ({ hitComponent: Hit, ...props }, ref) => {
    const colors = useContext(CurrentThemeContext)
    const { hits, isLastPage, showMore } = useInfiniteHits(props)

    //* Link Function
    //TODO: Change the nextPagePath to the correct path (i.e. the game page path)
      function pageLinkToGame(passedProp, item) {
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
        showsVerticalScrollIndicator={false}
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
              {pageLinkToGame(<Hit hit={item} />, item)}
            </Pressable>
          </View>
        )}
      />
    );
  }
);

function gameCoverHit(images, coverLink) {
  const imageData = {
    height: 75,
    width: 50,
    contentFit: 'stretch',
    borderRadius: 5,
    transition: 1000
  }
  return images.detailedGameCover(imageData, coverLink)
}

function gameDetailsHit(hit, genreSpecFunc, gameNameValue, gameSubGenreValue, colors) {
    function gameDetailLine1() {
      return (
        <View>
          {genreSpecFunc.charLengthSet(gameNameValue, gameNameValue.length, 35, 35)}
        </View>
      )
    }
    function gameDetailLine2() {
      return (
        <View style={{flexDirection: "row", paddingVertical: 10}}>
          <MainFont>{hit.gameReleaseDate}</MainFont>
          <MainSubFont> / </MainSubFont>
          {genreSpecFunc.charLengthSet(gameSubGenreValue, gameSubGenreValue.length, 17, 15)}
          <MainSubFont> / </MainSubFont>
          <MainFont>{hit.gameRating} <FontAwesomeIcon icon={ faStar } color={colors.secondaryColor} size={12} /></MainFont>
        </View>
      )
    }
    function gameDetailLine3() {
      return (
        <View>
          <MainFont>{hit.consoleName}</MainFont>
        </View>
      )
    }
  return (
    <View style={{paddingLeft: 25}}>
      {gameDetailLine1()}
      {gameDetailLine2()}
      {gameDetailLine3()}
    </View>
  )
}

export function Hit({ hit }) {
  const colors = useContext(CurrentThemeContext) 
  const genreSpecFunc = useContext(homeScreenGenreContext)
  const images = useContext(AppWideImageContext)
  const gameNameValue = hit.gameName
  const gameSubGenreValue = hit.gameSubgenre
  const coverLink = hit.gameCover
    return (
      <View style={{flexDirection: "row"}}>
          {gameCoverHit(images, coverLink)}
          {gameDetailsHit(hit, genreSpecFunc, gameNameValue, gameSubGenreValue, colors)}
    </View>
    );
  }
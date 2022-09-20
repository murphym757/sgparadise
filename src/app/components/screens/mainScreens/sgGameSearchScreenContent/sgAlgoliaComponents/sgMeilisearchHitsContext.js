import React, { forwardRef, useState, useContext } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { useInfiniteHits } from 'react-instantsearch-hooks';
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
  ViewTopRow
} from 'index'

export const InfiniteHits = forwardRef(
  ({ hitComponent: Hit, ...props }, ref) => {
    const colors = useContext(CurrentThemeContext)
    const { hits, isLastPage, showMore } = useInfiniteHits(props);
    const [ gameSelected, setGameSelected ] = useState('')

    async function chosenAlgoliaGame(item) {
      setGameSelected(item.gameName)
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
        ItemSeparatorComponent={() => <View style={{borderBottomWidth: 1, borderColor: colors.secondaryFontColor}} />}
        onEndReached={() => {
          if (!isLastPage) {
            showMore();
          }
        }}
        renderItem={({ item }) => (
          <View style={{paddingHorizontal: 18, paddingVertical: 25}}>
            <TouchableOpacity
              onPress={() => chosenAlgoliaGame(item)}>
              <Hit hit={item} />
            </TouchableOpacity>
          </View>
        )}
      />
    );
  }
);
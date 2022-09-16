import React, { forwardRef } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { useInfiniteHits } from 'react-instantsearch-hooks';

export const InfiniteHits = forwardRef(
  ({ hitComponent: Hit, ...props }, ref) => {

    const { hits, isLastPage, showMore } = useInfiniteHits(props);

    return (
      <FlatList
        ref={ref}
        data={hits} 
        ListHeaderComponent={() => (hits.length === 0
          ? <Text>The list is empty</Text>  
          : null)
        }
        keyExtractor={(item) => item.objectID}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onEndReached={() => {
          if (!isLastPage) {
            showMore();
          }
        }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Hit hit={item} />
          </View>
        )}
      />
    );
  }
);

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  item: {
    padding: 18,
  },
});
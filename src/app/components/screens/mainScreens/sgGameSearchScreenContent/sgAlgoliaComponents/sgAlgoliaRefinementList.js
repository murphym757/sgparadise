import React, { useContext } from 'react'
import {
  Button,
  StyleSheet,
  SafeAreaView,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useClearRefinements,
  useCurrentRefinements,
  useRefinementList,
} from 'react-instantsearch-hooks';
import { 
  CurrentThemeContext, 
  MainFontPills, 
  MainHeading,
  ViewContainer,
  ContentContainer,
  MainFont,
  MainSubFont,
  AlgoliaSearchListLabelText,
  AlgoliaSearchTitleText,
} from 'index'

export default function Filters({ isModalOpen, onToggleModal, onChange }) {
  const colors = useContext(CurrentThemeContext)
  const { canRefine: canClear, refine: clear } = useClearRefinements();
  const { items: currentRefinements } = useCurrentRefinements();
  const totalRefinements = currentRefinements.reduce(
    (acc, { refinements }) => acc + refinements.length,
    0
  );
  const styles = StyleSheet.create({
    title: {
      alignItems: 'center',
    },
    list: {
      marginTop: 32,
    },
    listTitle: {
      color: colors.primaryFontColor
    },
    item: {
      paddingVertical: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderColor: colors.primaryColorLight,
      alignItems: 'center',
    },
    itemCount: {
      backgroundColor: colors.primaryColorLight,
      borderRadius: 24,
      paddingVertical: 4,
      paddingHorizontal: 8,
      marginLeft: 4,
    },
    itemCountText: {
      color: colors.secondaryColor,
      fontWeight: '800',
    },
    filterListButtonContainer: {
      flexDirection: 'row',
    },
    filterListButton: {
      flex: 1,
      alignItems: 'center',
      marginTop: 18,
    },
    filtersButton: {
      paddingVertical: 18,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    filtersButtonText: {
      fontSize: 18,
      textAlign: 'center',
    },
  });

  function searchableList(title, searchAttribute) {
    const listTitle = title
    const attributeName = searchAttribute
    const { items, refine } = useRefinementList({ attribute: attributeName });
    return (
      <View style={styles.list}>
      <Text style={styles.listTitle}>{listTitle}</Text>
        {items.map((item) => {
          return (
            <TouchableOpacity
              key={item.label}
              style={styles.item}
              onPress={() => {
                refine(item.label);
                onChange();
              }}
            >
              <AlgoliaSearchListLabelText style={{fontFamily: item.isRefined ? 'SpartanBlack' : 'SpartanRegular'}}>
                {item.label}
              </AlgoliaSearchListLabelText>
              <View style={styles.itemCount}>
                <Text style={styles.itemCountText}>{item.count}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    )
  }

  function refinementListRender() {
    return (
      <View>
        <TouchableOpacity style={styles.filtersButton} onPress={onToggleModal}>
          <Text style={styles.filtersButtonText}>Filters</Text>
          {totalRefinements > 0 && (
            <View style={styles.itemCount}>
              <Text style={styles.itemCountText}>{totalRefinements}</Text>
            </View>
          )}
        </TouchableOpacity>

        <Modal animationType="slide" visible={isModalOpen}>
          <SafeAreaView>
            <ViewContainer>
              <ContentContainer>
                <AlgoliaSearchTitleText>Games</AlgoliaSearchTitleText>
              </ContentContainer>
              {searchableList('Consoles', 'gameSubgenre')}
              {searchableList('Consoles', 'gameGenre')}
              {searchableList('Consoles', 'gameName')}
            </ViewContainer>
            <View style={styles.filterListButtonContainer}>
              <View style={styles.filterListButton}>
                <Button
                  title="Clear all"
                  color="#252b33"
                  disabled={!canClear}
                  onPress={() => {
                    clear();
                    onChange();
                    onToggleModal();
                  }}
                />
              </View>
              <View style={styles.filterListButton}>
                <Button
                  onPress={onToggleModal}
                  title="See results"
                  color="#252b33"
                />
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    )
  }

  return (
    <View>
      {refinementListRender()}
    </View>
  );
}
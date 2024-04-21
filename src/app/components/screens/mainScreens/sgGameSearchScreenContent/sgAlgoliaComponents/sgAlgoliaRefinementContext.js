import React from 'react'
import { Button, ScrollView, Text, Pressable, View } from 'react-native'
import { useClearRefinements, useRefinementList } from 'react-instantsearch-core'
import { AlgoliaSearchListLabelText, MainSubFont } from 'index'
import { responsivePxSize } from 'assets/styles/globalStyling'
import { Chip } from 'react-native-paper'

function customRefinementListButtons(colors, setModalVisible, modalVisible) {
  const { canRefine: canClear, refine: clear } = useClearRefinements();
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{
        flex: 1,
        alignItems: 'center',
        marginTop: responsivePxSize(18)
      }}>
        <Button
          title="Clear all"
          color={colors.primaryFontColor}
          disabled={!canClear}
          onPress={() => {
            clear();
            () => setModalVisible(!modalVisible)
          }}
        />
      </View>
      <View style={{
        flex: 1,
        alignItems: 'center',
        marginTop: responsivePxSize(18)
      }}>
        <Button
          onPress={() => setModalVisible(!modalVisible)}
          title="See results"
          color={colors.primaryFontColor}
        />
    </View>
  </View>
  )
}

function refinementChipIcon(itemLabel) {
  const chipsList = [
    //Action
      {itemLabel: `Beat 'em Up`, iconName: 'kabaddi'},
      {itemLabel: 'Fighting', iconName: 'hand-front-left-outline'},
      {itemLabel: 'Platformer', iconName: 'align-vertical-distribute'},
      {itemLabel: 'Shooter', iconName: 'crosshairs-gps'},
    //Educational
      {itemLabel: 'Art', iconName: 'palette'},
      {itemLabel: 'Child Friendly', iconName: 'baby'},
      {itemLabel: 'Religious', iconName: 'church'},
      {itemLabel: 'Trivia', iconName: 'head-question'},
    //RPG
      {itemLabel: 'JRPG', iconName: 'compass-rose'},
      {itemLabel: 'Open World', iconName: 'earth'},
      {itemLabel: 'Tactical', iconName: 'strategy'},
    //Simulation
      {itemLabel: 'Boating', iconName: 'sail-boat'},
      {itemLabel: 'Business', iconName: 'briefcase'},
      {itemLabel: 'City Builder', iconName: 'city'},
      {itemLabel: 'Flight', iconName: 'airplane'},
      {itemLabel: 'Life', iconName: 'heart-pulse'},
      {itemLabel: 'Trains', iconName: 'train'},
    //Sports
      {itemLabel: 'Baseball', iconName: 'baseball'},
      {itemLabel: 'Basketball', iconName: 'basketball'},
      {itemLabel: 'Boxing', iconName: 'boxing-glove'},
      {itemLabel: 'Cricket', iconName: 'cricket'},
      {itemLabel: 'Football', iconName: 'football'},
      {itemLabel: 'Golf', iconName: 'golf'},
      {itemLabel: 'Hockey', iconName: 'hockey-puck'},
      {itemLabel: 'Karate', iconName: 'karate'},
      {itemLabel: 'Olympics', iconName: 'medal'},
      {itemLabel: 'Pool-Billiards', iconName: 'billiards'},
      {itemLabel: 'Racing', iconName: 'flag-checkered'},
      {itemLabel: 'Rugby', iconName: 'rugby'},
      {itemLabel: 'Skateboarding', iconName: 'skateboard'},
      {itemLabel: 'Soccer', iconName: 'soccer-field'},
      {itemLabel: 'Tennis', iconName: 'tennis'},
      {itemLabel: 'Wrestling', iconName: 'weight-lifter'},
    //Strategy
      {itemLabel: 'Board Game', iconName: 'chess'},
      {itemLabel: 'Gambling', iconName: 'dice-5'},
      {itemLabel: 'Point and Click', iconName: 'mouse'},
      {itemLabel: 'Puzzle', iconName: 'puzzle'},
      {itemLabel: 'Tower Defense', iconName: 'tower-beach'},
      {itemLabel: 'Turn Based', iconName: 'timer-sand'},
    //Genre
      {itemLabel: 'Action', iconName: 'bomb'},
      {itemLabel: 'Educational', iconName: 'school'},
      {itemLabel: 'RPG', iconName: 'sword-cross'},
      {itemLabel: 'Simulation', iconName: 'sprout'},
      {itemLabel: 'Sports', iconName: 'basketball-hoop'},
      {itemLabel: 'Strategy', iconName: 'chess-queen'},
  ];
  
  // Find the corresponding iconName for the given itemLabel
  const iconObject = chipsList.find(item => item.itemLabel === itemLabel);

  // Return the iconName if found, otherwise return a default icon name
  return iconObject ? iconObject.iconName : 'gamepad-variant'; // You can change 'default-icon' to your desired default
}



function refinementChip(itemLabel, isRefined, refine, colors) {
  const iconName = refinementChipIcon(itemLabel); // Get the icon name
  
  return (
    <Chip 
      selected={isRefined ? true : false}
      selectedColor={colors.secondaryColor} // Icon Color, as well as the color the moment it is selected
      closeIcon={'close'}
      textStyle={{color: isRefined ? colors.secondaryColor : colors.secondaryColor}}
      style={{
        backgroundColor: isRefined ? colors.primaryColor : colors.primaryColorLight,
        borderColor: isRefined ? colors.secondaryColor : colors.primaryColorLight, 
        marginHorizontal: responsivePxSize(4)}
      }
      icon={iconName} 
      onPress={() => {refine(itemLabel)}}>{itemLabel}</Chip>
  );
}


function customRefinementList(title, searchAttribute, colors) {
  const listTitle = title
  const attributeName = searchAttribute
  const { items, refine } = useRefinementList({ attribute: attributeName, sortBy: ['name:asc'] })

  return (
    <View>
      <MainSubFont style={{color: colors.primaryFontColor, paddingBottom: 5}}>{listTitle}</MainSubFont>
      <ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {items.map((item) => {
          return (
            <Pressable
              key={item.label}
              style={{
                paddingVertical: responsivePxSize(12),
                padding: 4
                
              }}
              onPress={() => {
                refine(item.label);
              }}
            >
            {refinementChip(item.label, item.isRefined, refine, colors)}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  )
}

function refinementConsoleList(props) {
  const { items, refine } = useRefinementList({ attribute: 'consoleName', sortBy: ['name:asc'] })
  const colors = props.colors
  return (
    <View>
      <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {items.map((item) => {
          return (
            <Pressable
              key={item.label}
              style={{
                paddingHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: responsivePxSize(1),
                borderColor: colors.primaryColor,
                alignItems: 'center',
              }}
              onPress={() => {
                refine(item.label);
              }}
            >
              <View style={{justifyContent: 'center', paddingHorizontal: responsivePxSize(24)}}>
                <AlgoliaSearchListLabelText style={{fontFamily: item.isRefined ? 'SpartanBlack' : 'SpartanRegular'}}>
                  {item.label}
                </AlgoliaSearchListLabelText>
                <View style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: colors.primaryColor,
                  borderRadius: responsivePxSize(24),
                  paddingVertical: responsivePxSize(4),
                }}>
                  <Text style={{color: colors.secondaryColor, fontWeight: '800'}}>{item.count}</Text>
                </View>
              </View>
          </Pressable>
        );
      })}
      </ScrollView>
    </View>
  )
}


export const customRefinements = {
  customRefinementListButtons,
  customRefinementList,
  refinementConsoleList
}

export const customRefinementContext = React.createContext(customRefinements)
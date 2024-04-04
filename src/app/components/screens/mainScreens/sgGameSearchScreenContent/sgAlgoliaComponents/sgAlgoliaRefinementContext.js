import React from 'react'
import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useClearRefinements, useRefinementList } from 'react-instantsearch-core';
import { RFValue } from "react-native-responsive-fontsize";
import { AlgoliaSearchListLabelText, windowHeight } from 'index';

function responsivePxSize(pixelSize){
  return (
      RFValue(pixelSize, windowHeight)
  )
}

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

function customRefinementList(title, searchAttribute, colors) {
  const listTitle = title
  const attributeName = searchAttribute
  const { items, refine } = useRefinementList({ attribute: attributeName })

  return (
    <View style={{marginTop: responsivePxSize(32)}}>
      <Text style={{color: colors.primaryFontColor}}>{listTitle}</Text>
      <ScrollView style={{height: responsivePxSize(150)}}>
        {items.map((item) => {
          return (
            <TouchableOpacity
              key={item.label}
              style={{
                paddingVertical: responsivePxSize(12),
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: responsivePxSize(1),
                borderColor: colors.primaryColorLight,
                alignItems: 'center',
              }}
              onPress={() => {
                refine(item.label);
              }}
            >
              <AlgoliaSearchListLabelText style={{fontFamily: item.isRefined ? 'SpartanBlack' : 'SpartanRegular'}}>
                {item.label}
              </AlgoliaSearchListLabelText>
            
              <View style={{
                backgroundColor: colors.primaryColorLight,
                borderRadius: responsivePxSize(24),
                paddingVertical: responsivePxSize(4),
                paddingHorizontal: responsivePxSize(8),
                marginLeft: responsivePxSize(4),
              }}>
                <Text style={{color: colors.secondaryColor, fontWeight: '800'}}>{item.count}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  )
}

function refinementConsoleList(props) {
  const { items, refine } = useRefinementList({ attribute: 'consoleName' })
  const colors = props.colors
  return (
    <View>
      <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {items.map((item) => {
          return (
            <TouchableOpacity
              key={item.label}
              style={{
                paddingVertical: responsivePxSize(12),
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
          </TouchableOpacity>
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
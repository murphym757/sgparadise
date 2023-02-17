import React from 'react'
import {
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
  Text,
  TouchableOpacity,
  View,
  Image,
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


function customRefinementListButtons(colors, setModalVisible, modalVisible) {
  const { canRefine: canClear, refine: clear } = useClearRefinements();
  return (
    <View style={{flexDirection: 'row'}}>
    <View style={{
      flex: 1,
      alignItems: 'center',
      marginTop: 18
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
      marginTop: 18
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
  const { items, refine } = useRefinementList({ attribute: attributeName });

  return (
    <View style={{marginTop: 32}}>
    <Text style={{color: colors.primaryFontColor}}>{listTitle}</Text>
    <ScrollView style={{height: 150}}>
      {items.map((item) => {
        return (
          <TouchableOpacity
            key={item.label}
            style={{
              paddingVertical: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
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
              borderRadius: 24,
              paddingVertical: 4,
              paddingHorizontal: 8,
              marginLeft: 4,
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
  const { items, refine } = useRefinementList({ attribute: 'consoleName' });
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
              paddingVertical: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderColor: colors.primaryColor,
              alignItems: 'center',
            }}
            onPress={() => {
              refine(item.label);
            }}
          >
            <View style={{justifyContent: 'center', paddingHorizontal: 24}}>
              <AlgoliaSearchListLabelText style={{fontFamily: item.isRefined ? 'SpartanBlack' : 'SpartanRegular'}}>
                {item.label}
              </AlgoliaSearchListLabelText>
              <View style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: colors.primaryColor,
                borderRadius: 24,
                paddingVertical: 4,
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
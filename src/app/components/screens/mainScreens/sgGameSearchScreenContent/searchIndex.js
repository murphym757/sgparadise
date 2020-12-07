import React, { useContext, useEffect, useState } from 'react'
import { 
    View,
    Text,
    Animated,
    TouchableOpacity,
    Dimensions, 
    Keyboard, 
    TouchableWithoutFeedback,
} from 'react-native'
import {
    SafeAreaViewContainer,
    Container,
    MainFont,
    CustomInputField,
    TouchableButton,
    TouchableButtonFont
} from '../../index'
import {CurrentThemeContext} from '../../../../../../assets/styles/globalTheme'

export function sgSearchBarForm() {
    const padding = 16;
    const deviceWidth = Dimensions.get('window').width
    const searchFullWidth = deviceWidth - padding * 2; // Search Bar width when unfocused
    const searchShrinkWidth = deviceWidth - padding - 64; // Search Bar width when focused
    const AnimatedTouchable  = Animated.createAnimatedComponent(TouchableOpacity)
    const colors = useContext(CurrentThemeContext)
    const [ searchBar, setSearchBar ] = useState({
        inputLength: new Animated.Value(searchFullWidth),
        cancelPosition: new Animated.Value(0),
        opacity: new Animated.Value(0),
        touchedSearchBar: false,
        touchedSearchBarStatus: 0
      })
    
      function onFocus() {
        Animated.parallel([
          Animated.timing(searchBar.inputLength, {
            toValue: searchShrinkWidth,
            duration: 250
          }),
          Animated.timing(searchBar.cancelPosition, {
            toValue: 16,
            duration: 400
          }),
          Animated.timing(searchBar.opacity, {
            toValue: 1,
            duration: 250
          })
        ]).start(() => searchBarActive(true), searchBarStateInit());
      }
    
      function onBlur() {
        // If the user types anything into the search bar,it will not return to it normal length until it is empty. 
        if(searchQuery === '' && searchBar.touchedSearchBar === false) {
          Animated.parallel([
            Animated.timing(searchBar.inputLength, {
              toValue: searchFullWidth,
              duration: 250
            }),
            Animated.timing(searchBar.cancelPosition, {
              toValue: 0,
              duration: 250
            }),
            Animated.timing(searchBar.opacity, {
              toValue: 0,
              duration: 100
            })
          ]).start(() => Keyboard.dismiss());
        } else {
          Animated.parallel([,
            Animated.timing(searchBar.cancelPosition, {
              toValue: 0,
              duration: 250
            }),
            Animated.timing(searchBar.opacity, {
              toValue: 0,
              duration: 100
            })
            
          ]);
        }
      }

    return  (
        <View>
        <CustomInputField
        placeholder='Search Games'
        placeholderTextColor={colors.primaryColor}
        onChangeText={(text) => setSearchBar(text)}
        value={searchBar}
        color={colors.primaryColor}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
    />
        </View>
    )
}


import React, { useRef, useState, useContext } from 'react';
import { useSearchBox } from 'react-instantsearch-hooks';
import { RFValue } from "react-native-responsive-fontsize";
import { 
    CurrentThemeContext,
    CustomSearchBarContainer,
    CustomSearchBarTextInput, 
    windowHeight
} from 'index'

export function SearchBox(props) {
  const colors = useContext(CurrentThemeContext) 
  const { query, refine } = useSearchBox(props);
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef(null);
  const testingTesting = props.gamePageLinkPressed
  console.log("🚀 ~ file: sgAlgoliaSearchBarContext.js:17 ~ SearchBox ~ testingTesting:", testingTesting)
  

  function setQuery(newQuery) {
    setInputValue(newQuery);
    refine(newQuery);
  }

  function setQueryNow() {
    refine(props.gamePageLinkProp);
  }

  // Track when the InstantSearch query changes to synchronize it with
  // the React state.
  // We bypass the state update if the input is focused to avoid concurrent
  // updates when typing.
  if (query !== inputValue && !inputRef.current?.isFocused()) {
    setInputValue(query);
  }
  

  function searchBarSelectior() {
    if (props.gamePageLinkPressed === true) {
      <CustomSearchBarTextInput
        ref={inputRef}
        value={setQueryNow()}
        onChangeText={setQuery}
        style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', paddingRight: 190}}
        placeholderTextColor={colors.primaryColorAlt}
        placeholder={props.gamePageLinkProp}
        clearButtonMode="while-editing"
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        autoCompleteType="off"
    />
    } else {
      <CustomSearchBarTextInput
        ref={inputRef}
        value={inputValue}
        onChangeText={setQuery}
        style={{
          flex: 1, 
          flexDirection: 'row', 
          justifyContent: 'center', 
          alignItems: 'flex-start', 
          fontSize: RFValue(20, windowHeight),
          paddingRight: 190}}
        placeholderTextColor={colors.primaryColorAlt}
        placeholder={props.searchBarTitle}
        clearButtonMode="while-editing"
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        autoCompleteType="off"
    />
    }
  }

  function defaultSearchBar() {
    return (
      <CustomSearchBarTextInput
        ref={inputRef}
        value={inputValue}
        onChangeText={setQuery}
        style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', paddingRight: 190}}
        placeholderTextColor={colors.primaryColorAlt}
        placeholder={props.searchBarTitle}
        clearButtonMode="while-editing"
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        autoCompleteType="off"
    />
    )
  }

  function linkedSearchBar() {
    return (
      <CustomSearchBarTextInput
        ref={inputRef}
        value={setQueryNow()}
        editable={false}
        style={{
          flex: 1, 
          flexDirection: 'row', 
          justifyContent: 'center', 
          alignItems: 'flex-start', 
          fontSize: RFValue(20, windowHeight),
          paddingRight: 190}}
        placeholderTextColor={colors.primaryColorAlt}
        placeholder={props.gamePageLinkProp}
        clearButtonMode="while-editing"
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        autoCompleteType="off"
    />
    )
  }

  return (
    props.gamePageLinkPressed === false
      ? defaultSearchBar() 
      : linkedSearchBar()
    
  );
}
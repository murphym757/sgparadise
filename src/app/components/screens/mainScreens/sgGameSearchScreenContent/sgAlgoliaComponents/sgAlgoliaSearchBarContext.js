import React, { useRef, useState, useContext } from 'react';
import { useSearchBox } from 'react-instantsearch-hooks';
import { 
    CurrentThemeContext,
    CustomSearchBarContainer,
    CustomSearchBarTextInput, 
} from 'index'

export function SearchBox(props) {
  const colors = useContext(CurrentThemeContext) 
  const { query, refine } = useSearchBox(props);
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef(null);
  const searchBarTitle = 'Search Games'

  function setQuery(newQuery) {
    setInputValue(newQuery);
    refine(newQuery);
  }

  // Track when the InstantSearch query changes to synchronize it with
  // the React state.
  // We bypass the state update if the input is focused to avoid concurrent
  // updates when typing.
  if (query !== inputValue && !inputRef.current?.isFocused()) {
    setInputValue(query);
  }

  return (
    <CustomSearchBarTextInput
        ref={inputRef}
        value={inputValue}
        onChangeText={setQuery}
        style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', paddingRight: 190}}
        placeholderTextColor={colors.primaryColorAlt}
        placeholder={searchBarTitle}
        clearButtonMode="while-editing"
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        autoCompleteType="off"
      />
  );
}
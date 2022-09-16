import React, { useRef, useState, useContext } from 'react';
import { useSearchBox } from 'react-instantsearch-hooks';
import { 
    CustomSearchBarContainer,
    CustomSearchBarTextInput, 
} from 'index'

export function SearchBox(props) {
  const { query, refine } = useSearchBox(props);
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef(null);

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
    <CustomSearchBarContainer>
      <CustomSearchBarTextInput
        ref={inputRef}
        value={inputValue}
        onChangeText={setQuery}
        clearButtonMode="while-editing"
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        autoCompleteType="off"
      />
    </CustomSearchBarContainer>
  );
}
import { useContext, useEffect, useRef, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, useIsFocused, View } from 'react-native';
import { useSearchBar } from 'main/sgGameSearchScreenContent/searchIndex'
import { SearchBox } from 'main/sgGameSearchScreenContent/sgAlgoliaComponents/sgAlgoliaSearchBarContext'
import { InfiniteHits, Hit } from 'main/sgGameSearchScreenContent/sgAlgoliaComponents/sgAlgoliaSearchHitsContext'
import Filters from 'main/sgGameSearchScreenContent/sgAlgoliaComponents/sgAlgoliaRefinementList'
import algoliasearch from 'algoliasearch'
import { InstantSearch } from 'react-instantsearch-hooks'
import {
    algoliaConfig,
    Container, 
    CurrentThemeContext,
    CustomSearchBarContainer,
    faSearch,
    faStar,
    FontAwesomeIcon,
    homeScreenGenreContext,
    MainFont,
    MainSubFont,
    ScrollViewContainer,
    ViewTopRow
} from 'index'

export default function SearchHome({navigation}) {
    const { 
        searchBar,  
        gamesFilterListName,
        testDb,
        } = useSearchBar()
    const colors = useContext(CurrentThemeContext)
    const isFocused = useIsFocused //Needs to be outside of the useEffect to properly be read
    const [isLoading, setIsLoading] = useState(true)
    const listRef = useRef(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const chosenDb = testDb
    

    useEffect(() => {
        function loadingTime() {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(
                    setIsLoading(false),
                )
              }, 2000)
            }, [])
        }
        async function sgLoader() {
            await loadingTime()
        }
        sgLoader()
    }, [isFocused])

    const consoleList = [
        'Genesis', 
        'SG-1000', 
        'Master System', 
        'Game Gear', 
        'Saturn', 
        '32X', 
        'CD']


    function preLoadedData() {
        return (
            <View style={{ flex: 1 }}>
                <MainFont style={{paddingVertical: 25}}>
                    Page loading
                </MainFont>
            </View>
        )
    }

    function goToGame(item) {
        return (
            <View></View>
        )
    }

    function consoleFlatList() {
        return (
            <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={consoleList.sort()}
            keyboardShouldPersistTaps="always"
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity style={{  
                    margin: 3,
                    borderWidth: 1,
                    borderRadius: 20,
                    alignItems:'center',
                    justifyContent:'center',
                    height:50, 
                    padding: 3,
                    marginTop: 3,
                    marginBottom: 10
                    }}
                    onPress={() => goToGame(item)}>
                    <View style={{
                        margin: 10,
                        flexDirection: "row", justifyContent: "center"
                    }}>
                        <MainFont style={{paddingHorizontal: 5}}>{item}</MainFont>
                    </View>
                </TouchableOpacity>
            )}
        />
        )
    }

    function loadedData() {
        return (
            <View style={{ flex: 1 }}>
            {homepageSearchSection()}
            {sgAlgolia()}
                <MainFont style={{paddingVertical: 25}}>
                    Search Goes Here
                </MainFont>
                <MainFont style={{paddingVertical: 25}}>
                    Use opensea an example for sitewide updates. However, start with the app's search area
                </MainFont>
                <MainFont style={{paddingVertical: 25}}>
                    IMPORTANT------Include a filter button that will appear on top of the data on the screen. Again, reference Opensea.
                </MainFont>
            </View>
        )
    }

    function searchResults() {
        return (
            <View>
                <FlatList
                    data={gamesFilterListName(chosenDb)}
                    keyboardShouldPersistTaps="always" 
                    contentContainerStyle={{
                        justifyContent: 'center'
                    }}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                    <View style={{
                        flexDirection: 'column',
                        flex: 1
                    }}>
                        <TouchableOpacity onPress={() => chosenGame(item)}>
                            <MainFont>{item.name}</MainFont>
                        </TouchableOpacity>
                    </View>
                    )}
                />
            </View>
        ) 
    }

    function homepageSearchSection() {
        return (
            <View>
                <ScrollViewContainer showsVerticalScrollIndicator={false}>
                    {searchResults()}
                </ScrollViewContainer>
            </View>
        )
    }

    // Algolia Search Bar and Modal
    function scrollToTop() {
        listRef.current?.scrollToOffset({ animated: false, offset: 0 });
      }
        function sgAlgolia() {
            const searchClient = algoliasearch(algoliaConfig.appId, algoliaConfig.apiKey);
            return (
              <InstantSearch searchClient={searchClient} indexName="games">
                <CustomSearchBarContainer>
                  <ViewTopRow style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{ alignItems: 'left', justifyContent: 'center', backgroundColor: colors.primaryColor, paddingRight: 10 }}>
                        <FontAwesomeIcon 
                            icon={ faSearch } color={colors.primaryColorAlt} size={25}
                        />
                      </View>
                      <SearchBox onChange={scrollToTop} />
                    </ViewTopRow>
                </CustomSearchBarContainer>
                <Filters 
                  isModalOpen={isModalOpen}
                  onToggleModal={() => setModalOpen((isOpen) => !isOpen)}
                  onChange={scrollToTop} 
                />
                <InfiniteHits hitComponent={Hit} />
              </InstantSearch>
            )
        }
    /*----------------------------*/

    function sgAlgoliaDeleteObject() {
        const searchClient = algoliasearch(algoliaConfig.appId, algoliaConfig.apiKey);
        const index = searchClient.initIndex('games');
        index.deleteObject('pac-man-2-the-new-adventures (Genesis)').then(({ hits }) => {
          console.log(hits);
        });
      }

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <Container>
            {isLoading !== true
                ?   <View>
                {consoleFlatList()}
                <ScrollView scrollEventThrottle={16}>
                    {loadedData()}
                </ScrollView>
                </View>
                :  <View>
                    {preLoadedData()} 
                </View>
            }
        </Container>
    </SafeAreaView>
  )
}
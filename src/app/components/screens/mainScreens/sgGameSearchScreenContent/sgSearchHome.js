import { useContext, useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    useIsFocused,
    Alert,
    Modal,
    StyleSheet,
    Text,
    Pressable,
    View,
} from 'react-native';
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
    FontAwesomeIcon,
    MainFont,
    ModalButton,
    ViewTopRow,
    windowHeight,
} from 'index';

export default function SgSearchHome({navigation}) {
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
        'CD'
    ]

    // Algolia Search Bar and Modal
    function scrollToTop() {
        listRef.current?.scrollToOffset({ animated: false, offset: 0 });
      }
    function sgAlgolia() {
        const searchClient = algoliasearch(algoliaConfig.appId, algoliaConfig.apiKey);
        return (
            <InstantSearch searchClient={searchClient} indexName="games">
            {sgAlgoliaCustomSearchBar()}
            <View style={{position: 'relative'}}>
                <ScrollView style={{paddingBottom: windowHeight + 5000}} showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
                    {sgAlgoliaHits()}
                </ScrollView>
            </View>
            <View style={{paddingTop: windowHeight - 200, position: 'absolute', alignSelf: 'flex-end'}}>
                {sgAlgoliaFilters()}
            </View>
            </InstantSearch>
        )
    }
    function sgAlgoliaCustomSearchBar() {
        return (
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
        )
    }
    function sgAlgoliaFilters() {
        return (
            <ModalButton />
        )
    }
    function sgAlgoliaHits() {
        return (
            <InfiniteHits hitComponent={Hit} nav={navigation} />
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

    // Filter Image (Should appear on top of the data on page in the lower right corner, just above the navbar)
      function headerLogo() {
        const logoLink = 'https://reactnative.dev/img/tiny_logo.png'
        return (
            <View style={{
                width: '100%',
            }}>
                <Image
                    style={{
                        height: 45,
                        width: 45,
                        resizeMode: 'stretch',
                        borderRadius: 5,
                    }}
                    source={{
                        url: logoLink,
                    }}
                />
            </View>
        )
    }
    /*----------------------------*/
    
    /*----------------------------*/

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
        console.log(item)
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
                    height:45, 
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
            <View>
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


  return (
    <SafeAreaView style={{ flex: 1 }}>
        <Container>
            {isLoading !== true
                ?   <View>
                {loadedData()}
                </View>
                :  <View>
                    {preLoadedData()} 
                </View>
            }
        </Container>
    </SafeAreaView>
  )
}
import React, { useContext, useEffect, useRef, useState } from 'react'
import { SafeAreaView, ScrollView, TouchableOpacity, useIsFocused, View } from 'react-native'
import { algoliaConfig, Container, CurrentThemeContext, CustomSearchBarContainer, faSearch, FontAwesomeIcon, MainFont, ViewTopRow } from 'index'
import { customRefinementContext } from 'main/sgGameSearchScreenContent/sgAlgoliaComponents/sgAlgoliaRefinementContext'
import { InfiniteHits, Hit } from 'main/sgGameSearchScreenContent/sgAlgoliaComponents/sgAlgoliaSearchHitsContext'
import { InstantSearch } from 'react-instantsearch-hooks'
import { ModalButton } from 'auth/sgModal'
import { SearchBox } from 'main/sgGameSearchScreenContent/sgAlgoliaComponents/sgAlgoliaSearchBarContext'
import { useAuth } from 'auth/authContext'
import algoliasearch from 'algoliasearch'

export default function SgSearchHome({navigation, route}) {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ isModalOpen, setModalOpen ] = useState(false);
    const { backArrow } = useAuth()
    const { gamePageLinkPressed, gameDataToBePassed } = route.params
    const backNeeded = true
    const colors = useContext(CurrentThemeContext)
    const colorsPassThrough = colors
    const customRefinements = useContext(customRefinementContext)
    const isFocused = useIsFocused //Needs to be outside of the useEffect to properly be read
    const listRef = useRef(null);

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
        '32X',
        'CD',
        'Game Gear',
        'Genesis',
        'Master System',
        'Saturn',
        'SG-1000',
    ]


    // Algolia Search Bar and Modal
    function scrollToTop() {
        listRef.current?.scrollToOffset({ animated: false, offset: 0 });
    }

    function sgAlgolia() {
        const searchClient = algoliasearch(algoliaConfig.appId, algoliaConfig.apiKey);
        return (
            <InstantSearch searchClient={searchClient} indexName="games" style={{ flex: 1 }}>
                {sgAlgoliaCustomSearchBar()}
                <View style={{position: 'relative', flex: 1}}>
                    <View>
                        {sgAlgoliaConsoleRefinements()}
                    </View>
                    <Container style={{ flex: 1 }}>
                        <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
                            {sgAlgoliaHits()}
                        </ScrollView>
                    </Container>
                </View>
                {gamePageLinkPressed === false
                    ?    <View style={{flex: 1, position: 'absolute', alignSelf: 'flex-end'}}>
                            <Container style={{ flex: 1 }}>
                                {sgAlgoliaFilters()}
                            </Container>
                        </View>
                    :   <View></View>
                }
            </InstantSearch>
        )
    }

    function sgAlgoliaCustomSearchBar() {
        return (
            <CustomSearchBarContainer>
                <ViewTopRow style={{flex: 1, flexDirection: 'row'}}>
                {gamePageLinkPressed === false
                    ?   <View style={{ alignItems: 'flex-start', justifyContent: 'center', backgroundColor: colors.primaryColor, paddingRight: 10 }}>
                            <FontAwesomeIcon
                                icon={ faSearch } color={colors.primaryColorAlt} size={25}
                            />
                        </View>
                    :   <View>
                            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                {backArrow(colorsPassThrough, backNeeded)}
                            </TouchableOpacity>
                    </View>
                }
                    <SearchBox gamePageLinkProp={gameDataToBePassed} gamePageLinkPressed={gamePageLinkPressed} gamePageLinkPressedSearchable={'tec toy'} searchBarTitle={'Search Games'} onChange={scrollToTop} />
                </ViewTopRow>
            </CustomSearchBarContainer>
        )
    }

    function sgAlgoliaConsoleRefinements() {
        return (
            <customRefinements.refinementConsoleList colors={colors} />
        )
    }

    function sgAlgoliaFilters() {
        return (
            <ModalButton refinementColors={colors} />
        )
    }

    function sgAlgoliaHits() {
        return (
            <InfiniteHits hitComponent={Hit} nav={navigation} />
        )
    }
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

    function loadedData() {
        return (
            <View style={{ flex: 1 }}>
                {sgAlgolia()}
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoading !== true
                ?   <View style={{ flex: 1 }}>
                {loadedData()}
                </View>
                :  <View>
                    {preLoadedData()}
                </View>
            }
        </SafeAreaView>
    )
}
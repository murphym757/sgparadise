import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, Button, FlatList, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
import { AppWideImageContext } from 'main/sgImageContext'
import { useTags } from 'auth/tagsContext'
import { useSearchBar } from 'main/sgGameSearchScreenContent/searchIndex'
import axios from 'axios'
// React Navigation
import { createStackNavigator } from '@react-navigation/stack'
import { useIsFocused } from '@react-navigation/native';
import { modalConfirmation, searchGameIcon } from '../sgGameScreenContent/sgAPIIndex'
import {
    Container,
    CurrentThemeContext,
    CustomInputField,
    faChevronLeft,
    faFilter,
    firebase,
    FontAwesomeIcon,
    MainFont,
    MainHeading,
    MainHeadingButton,
    SafeAreaViewContainer,
    ScrollViewContainer,
    TestImageDB,
    windowHeight,
} from 'index';

export default function SgIGDBGameSearchScreen({route, navigation}, props) {
    const [ chosenGenre, setChosenGenre ] = useState()
    const [ isLoading, setIsLoading ] = useState(true)
    const [ modalSelected, setModalSelected ] = useState(route.params?.modal)
    const [ searchBarTitle, setSearchBarTitle ] = useState('Search Games')
    const [ searchFilterSelected, setSearchFilterSelected ] = useState(false)
    const [ searchQuery, setSearchQuery ] = useState('')
    const [ searchType, setSearchType ] = useState('sgIGDBSearch')
    const [ sgConsoleIcons, setSgConsoleIcons ] = useState([])
    const { searchBar, searchResults } = useSearchBar()
    const { selectedSystemLogo } = route.params
    const { selectedTags, tagsSelection } = useTags()
    const colors = useContext(CurrentThemeContext)
    const images = useContext(AppWideImageContext)
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be readconst [modalSelected, setModalSelected] = useState(route.params?.modal)
    const Root = createStackNavigator();
    const sgDB = firebase.firestore()
    const tagData = sgConsoleIcons
    const testGamesDb = TestImageDB.results

    function unixTimestampConverter(item) {
        const dateObject = new Date(milliseconds)
        const humanDateFormat = dateObject.toLocaleString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })
        const milliseconds = unixTimestamp * 1000
        const unixTimestamp = item.first_release_date
    }

    // IGDB search data (Put on confirmation page)

    const [ gameName, setIgdbGameName ] = useState()
    const [ gameSummary, setIgdbGameSummary ] = useState()
    const [ igdbGameAgeRating, setIgdbGameAgeRating ] = useState()
    const [ igdbGameCover, setIgdbGameCover ] = useState()
    const [ igdbGameGenres, setIgdbGameGenres ] = useState([])
    const [ igdbGameId, setIgdbGameId ] = useState()
    const [ igdbGameRating, setIgdbGameRating ] = useState()
    const [ igdbGameScreenshots, setIgdbGameScreenshots ] = useState([])
    const [ igdbGameSelected, setIgdbGameSelected ] = useState(false)
    const [ igdbSearch, setIgdbSearch ] = useState("Sonic")
    const [ igdbSearchResults, setIgdbSearchResults ] = useState([])
    const [ igdbUnixTimestamp, setIgdbUnixTimestamp ]= useState()
    const igdbSearchPlatforms = `(${JSON.stringify(route.params.igdbConsoleId)})`
    const igdbTestField = `fields name, cover, rating, age_ratings, genres, screenshots, summary, first_release_date; search "${igdbSearch}"; limit 20; where platforms =${igdbSearchPlatforms}& cover != null;`
    function igdbGameData(item) {
        setIgdbGameAgeRating(item.age_ratings)
        setIgdbGameCover(item.cover)
        setIgdbGameId(item.id)
        setIgdbGameName(item.name)
        setIgdbGameRating(item.rating)
        setIgdbGameScreenshots(item.screenshots)
        setIgdbGameSelected(true)
        setIgdbGameSummary(item.summary)
        setIgdbUnixTimestamp(item.first_release_date)
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
        const subscriber = sgDB
            .collection('sgAPI').doc('sgTags').collection('genreTags').orderBy('tagName', 'asc')
            .onSnapshot(querySnapshot => {
                const consoles = []
                querySnapshot.forEach(documentSnapshot => {
                        consoles.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    })
                })
            setSgConsoleIcons(genreTags)
        });
        if(isFocused){
            setModalSelected(false)
        }
        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, [isFocused])

    async function igdbSearchFuction() {
        let api = axios.create({
            headers: {
                'Accept': 'application/json',
                "Client-ID": route.params.clientIdIGDB,
                "Authorization": `Bearer ${route.params.accessTokenIGDB}`
            }
        })
        api.post('https://api.igdb.com/v4/games', igdbTestField)
            .then(res => {
                setIgdbSearchResults(res.data)
            }, [])
            .catch(err => {
                console.log(err);
            })
            .then(function () {
                // always executed
            });
    }

    function filterList(testGamesDb) {
        return testGamesDb.filter(
        (testGame) =>
            testGame.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
            testGame.publisher
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
            testGame.releaseYear
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
            testGame.platform
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
    }

    function onSearch() {
        return (searchQuery) => setSearchQuery(searchQuery)
    }

    function resetSearchQuery() {
        setSearchQuery('')
    }

    function setGameId(item) {
        navigation.navigate('SgGameModal')
        setGameName(item.name)
    }

    function resetGameId() {
        navigation.navigate('SgGameSearch')
        setIgdbGameAgeRating({ ...igdbGameAgeRating })
        setIgdbGameCover({ ...igdbGameCover })
        setIgdbGameGenres({ ...igdbGameGenres })
        setIgdbGameId({ ...igdbGameId })
        setIgdbGameName({ ...gameName })
        setIgdbGameRating({ ...igdbGameRating })
        setIgdbGameScreenshots({ ...igdbGameScreenshots })
        setIgdbGameSummary({ ...gameSummary })
        setIgdbUnixTimestamp({ ...igdbUnixTimestamp })
    }

    function confirmSetGameId(){
        navigation.navigate('SgAddGameConfirm', {
            gameCover:gameCover,
            gameName: gameName,
            gameSummary: gameSummary,
            igdbGameAgeRating: igdbGameAgeRating,
            igdbGameGenres: igdbGameGenres,
            igdbGameId: igdbGameId,
            igdbGameRating: igdbGameRating,
            igdbGameScreenshots: igdbGameScreenshots,
            igdbUnixTimestamp: igdbUnixTimestamp
        })
            setModalSelected(true)
    }

    function setGameConfirmation(item) {
        const resetConfirmation = resetGameId(item)
        const setConfirmation = confirmSetGameId(item)
        return modalConfirmation(resetConfirmation, setConfirmation)
    }

    function sgModalScreen() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primaryColor }}>
                {setGameConfirmation()}
            </View>
        );
    }

    function sgGSRenderItem(item) {
        return (
            <View style={{
                flexDirection: 'column',
                flex: 1,
                marginBottom: 120
            }}>
                <TouchableOpacity onPress={() => setGameId(item)}>
                    {searchGameIcon(colors, item)}
                </TouchableOpacity>
            </View>
        )
    }

    function SgGameStack() {
        const currentSearchDB = filterList(testGamesDb)
        return (
            <FlatList
                data={currentSearchDB}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{
                    justifyContent: 'center'
                }}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    sgGSRenderItem(item)
                )}
            />
        )
    }


    function sgDBGameSearch() {
        return (
            <SafeAreaView style={{ flex: 1,  backgroundColor: colors.primaryColor }}>
                <View>
                    <CustomInputField
                        placeholderTextColor={colors.primaryColor}
                        placeholder='Search Games'
                        onChangeText={onSearch()}
                        value={searchQuery}
                        color={colors.primaryColor}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <ScrollView
                        scrollEventThrottle={16}
                    >
                        <View style={{ flex: 1 }}>
                            <MainFont>
                                Add Games
                            </MainFont>
                            <Button title="Get data from Twitch API" onPress={() => igdbSearchFuction()}/>
                            <Button title="Add Game here" onPress={() => confirmSetGameId()}/>
                            <MainFont>Home Screen</MainFont>
                                <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        scrollEnabled={false}
                                        data={igdbSearchResults.sort((a, b) => a.first_release_date - b.first_release_date)}
                                        keyboardShouldPersistTaps="always"
                                        keyExtractor={item => item.id}
                                        renderItem={({ item }) => (
                                        <View>
                                            <TouchableOpacity onPress={() => igdbGameData(item)}>
                                                <MainFont>{item.name}</MainFont>
                                            </TouchableOpacity>
                                        </View>
                                        )}
                                    />
                        </View>
                        <View>
                            {SgGameStack()}
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }


    function sgSearchGameStack() {
        const ModalStack = createStackNavigator()
        const sgModal = modalSelected == true
        ? null
        : <ModalStack.Screen name="SgGameModal" component={sgModalScreen} />
            return (
                <ModalStack.Navigator mode="modal"
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: colors.primaryColor,
                            elevation: 0,
                            shadowOpacity: 0,
                            borderBottomWidth: 0
                        },
                        headerTintColor: colors.primaryFontColor,
                        style: {
                            shadowColor: 'transparent',
                        },
                    }}
                >
                    <ModalStack.Screen
                        name="SgDBGameSearch"
                        component={sgDBGameSearch}
                        options={{ headerShown: false }}
                    />
                    {sgModal}
                </ModalStack.Navigator>
            )
    }

    function resetAll() {
        setChosenGenre(null)
        navigation.goBack()
    }

    function confirmGenreSelection(item){
        navigation.navigate('Page1')
        setChosenGenre(item)
    }

    function searchBarGoBack() {
        return (
                <View style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity onPress={() => resetAll()}>
                        <View style={{ marginTop: 10, alignItems: 'flex-start', justifyContent: 'center', backgroundColor: colors.primaryColor }}>
                            <FontAwesomeIcon
                                icon={ faChevronLeft } color={colors.primaryFontColor} size={50}
                            />
                        </View>
                        </TouchableOpacity>
                    <View style={{
                        width: 300
                    }}>
                        {searchBar(searchBarTitle, searchType, searchQuery)}
                    </View>
                    <TouchableOpacity onPress={() => setSearchFilterSelected(true)}>
                    <View style={{ paddingLeft: 10, marginTop: 20, alignItems: 'right', justifyContent: 'center', backgroundColor: colors.primaryColor }}>
                        <FontAwesomeIcon
                            icon={ faFilter } color={colors.primaryFontColor} size={30}
                        />
                    </View>
                </TouchableOpacity>
                </View>
        )
    }

    function setDBWithGenre(item) {
        setSearchQuery(item)
    }



    function genreTagCollection() {
        return (
                <FlatList
                    columnWrapperStyle={{justifyContent: 'space-between'}}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                    data={tagData}
                    keyboardShouldPersistTaps="always"
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 3,
                            borderRadius: 10,
                            width: 100 * 2,
                            height: 100,
                            backgroundColor: colors.secondaryColor,
                        }}
                        onPress={() => confirmGenreSelection(item)}>
                            <MainHeadingButton style={{justifyContent: 'center', alignItems: 'center',}}>{item}</MainHeadingButton>
                            <View style={{ justifyContent: 'center', alignItems: 'center', margin: 7 }}>
                                <FontAwesomeIcon
                                    icon={ item.tagIcon } color={colors.primaryColorLight} size={35}
                                />
                            </View>
                    </TouchableOpacity>
                    )}
                />
            )
        }
    function chooseConsoleImage() {
        const imageData = {
            height: 60,
            weight: 200,
            source: selectedSystemLogo,
            Transition: 1000
        }
        return images.igdbConsoleListImage(imageData)
    }
    function chooseGameOptions() {
        return(
            <SafeAreaViewContainer>
                {searchBarGoBack()}
                {isLoading == undefined
                    ?   <ActivityIndicator size="large" hidesWhenStopped="true"/>
                    :   <View>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                {chooseConsoleImage()}
                                <MainFont>Test</MainFont>
                                {isLoading && (
                                    <ActivityIndicator size="small" />
                                )}
                            </View>
                            <Container>
                                {selectedTags(tagData)}
                                <ScrollViewContainer>
                                    <View style={{paddingBottom: windowHeight/8}}>
                                        <MainFont>This is where youll confirm your chose</MainFont>
                                        {searchResults()}
                                        {genreTagCollection()}
                                        {searchFilterSelected == false
                                            ?   <MainFont>Ocean Drive</MainFont>
                                            :   tagsSelection(tagData)
                                        }
                                    </View>
                                </ScrollViewContainer>
                            </Container>
                        </View>
                }
            </SafeAreaViewContainer>
        )
    }

    function addGamePage1() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primaryColor }}>
                <MainHeading>{"Page 1"}</MainHeading>
            </View>
        );
    }
    function addGamePage2() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primaryColor }}>
                <MainHeading>{"Page 2"}</MainHeading>
            </View>
        );
    }
    function addGamePage3() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primaryColor }}>
                <MainHeading>{"Page 3"}</MainHeading>
            </View>
        );
    }
    function addGamePage4() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primaryColor }}>
                <MainHeading>{"Page 4"}</MainHeading>
            </View>
        );
    }
    function addGamePage5() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primaryColor }}>
                <MainHeading>{"Page 5"}</MainHeading>
            </View>
        );
    }

    return (
        <Root.Navigator headerMode="none" initialRouteName="Home">
            <Root.Screen name="Home" component={chooseGameOptions} />
            <Root.Screen name="Page1" component={addGamePage1} />
            <Root.Screen name="Page2" component={addGamePage2} />
            <Root.Screen name="Page3" component={addGamePage3} />
            <Root.Screen name="Page4" component={addGamePage4} />
            <Root.Screen name="Page5" component={addGamePage5} />
        </Root.Navigator>
    )
}


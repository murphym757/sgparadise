import React, { useState, useEffect, useContext } from 'react'
import { 
    View, 
    Text, 
    Button, 
    Image,
    FlatList, 
    ScrollView, 
    SafeAreaView,
    TouchableOpacity 
} from 'react-native'
import axios from 'axios'
// React Navigation
import { createStackNavigator } from '@react-navigation/stack'
import {
    modalConfirmation,
    searchGameIcon
} from '../sgGameScreenContent/sgAPIIndex'
import {
    ConfirmAddGameScreen,
    SafeAreaViewContainer,
    ContentContainer,
    TestImageDB,
    MainFont,
    SearchBar,
    SgSearchQuery,
    SearchGameTitle,
    SearchGameData,
    FontAwesomeIcon,
    faChevronLeft
} from '../../index'
import {CurrentThemeContext} from '../../../../../../assets/styles/globalTheme'
import {
    CustomInputField
  } from '../../../../../../assets/styles/authScreensStyling'

export default function SgIGDBGameSearchScreen({route, navigation}, props) {
    const colors = useContext(CurrentThemeContext)
    const { selectedSystemLogo } = route.params
    console.log("This is it tho" + selectedSystemLogo)
    const testGamesDb = TestImageDB.results
    const searchType = props.searchType
    console.log(searchType)
    const postDataIGDB = "fields *;"
    const [searchQuery, setSearchQuery] = useState('')
    const [modalSelected, setModalSelected] = useState(route.params?.modal)

    function unixTimestampConverter(item) {
        const unixTimestamp = item.first_release_date
        const milliseconds = unixTimestamp * 1000
        const dateObject = new Date(milliseconds)
        const humanDateFormat = dateObject.toLocaleString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })
    }

    // IGDB search data (Put on confirmation page)
    const [igdbGameSelected, setigdbGameSelected] = useState(false)
    const [igdbSearchResults, setIgdbSearchResults] = useState([])
    const [igdbSearch, setIgdbSearch] = useState("Sonic")
    const [igdbGameId, setIgdbGameId] = useState()
    const [igdbGameName, setIgdbGameName] = useState()
    console.log(igdbGameName)
    const [igdbGameCover, setIgdbGameCover] = useState()
    const [igdbGameRating, setIgdbGameRating] = useState()
    const [igdbGameAgeRating, setIgdbGameAgeRating] = useState()
    const [igdbGameGenres, setIgdbGameGenres] = useState([])
    const [igdbGameScreenshots, setIgdbGameScreenshots] = useState([])
    const [igdbGameSummary, setIgdbGameSummary] = useState()
    const [igdbUnixTimestamp, setIgdbUnixTimestamp]= useState()
    const igdbSearchPlatforms = "(" + JSON.stringify(route.params.igdbConsoleId) + ") "
    const igdbTestField = 'fields name, cover, rating, age_ratings, genres, screenshots, summary, first_release_date; search ' + '"' + igdbSearch + '"' + '; limit 20; where platforms =' + igdbSearchPlatforms + '& cover != null;'

    function igdbGameData(item) {
        setIgdbGameId(item.id)
        setIgdbGameName(item.name)
        setIgdbGameCover(item.cover)
        setIgdbGameRating(item.rating)
        setIgdbGameAgeRating(item.age_ratings)
        setIgdbGameScreenshots(item.screenshots)
        setIgdbGameSummary(item.summary)
        setIgdbUnixTimestamp(item.first_release_date)
        setigdbGameSelected(true)
    }
    
    

    useEffect(() => {
        setModalSelected(false)
    }, [])

    async function igdbSearchFuction() {
        let api = axios.create({
            headers: {
                'Accept': 'application/json',
                "Client-ID": route.params.clientIdIGDB,
                "Authorization": "Bearer " + route.params.accessTokenIGDB
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
        setIgdbGameId({ ...igdbGameId }) 
        setIgdbGameName({ ...igdbGameName })
        setIgdbGameCover({ ...igdbGameCover }) 
        setIgdbGameRating({ ...igdbGameRating }) 
        setIgdbGameAgeRating({ ...igdbGameAgeRating }) 
        setIgdbGameGenres({ ...igdbGameGenres }) 
        setIgdbGameScreenshots({ ...igdbGameScreenshots }) 
        setIgdbGameSummary({ ...igdbGameSummary }) 
        setIgdbUnixTimestamp({ ...igdbUnixTimestamp }) 
    }

    function confirmSetGameId(){
        navigation.navigate('SgAddGameConfirm', { 
            igdbGameId: igdbGameId,
            igdbGameName: igdbGameName,
            igdbGameCover: igdbGameCover,
            igdbGameRating: igdbGameRating,
            igdbGameAgeRating: igdbGameAgeRating,
            igdbGameGenres: igdbGameGenres,
            igdbGameScreenshots: igdbGameScreenshots,
            igdbGameSummary: igdbGameSummary,
            igdbUnixTimestamp: igdbUnixTimestamp
        })
        console.log("It worked :)")
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

    function sgGameStack() {
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

    function setConsole() {
        return (
            <Image
                style={{
                    width: 200,
                    height: 60
                }}
                source={{
                    uri: "" + selectedSystemLogo + "",
                }}
            />
        )
    }

    function sgDBGameSearch() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryColor }}>
            <FontAwesomeIcon 
                            icon={ faChevronLeft } color={colors.primaryFontColor} size={50} 
                            onPress={() => navigation.navigate({
                                name: 'SgConsoleList',
                                merge: true,
                              })}
                        />
                    {igdbGameSelected == "floop"
                        ?   <Text>You've selected {igdbGameName}, buddy</Text>
                        :   <View>
                        
                        <Text>Received params: {JSON.stringify(route.params)}</Text>
                        <Text>Your here nows</Text>
                            {setConsole()}
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
                                    <Text>
                                        Add Games
                                    </Text>
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
                                                        <Text>{item.name}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                )}
                                            />
                                </View>
                                <View>
                                    {sgGameStack()}
                                </View>
                            </ScrollView>
                        </View>
                    }
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
     
  return (
        <SafeAreaViewContainer>
            sgSearchGameStack()
        </SafeAreaViewContainer>
  );
}


import React, { useState, useEffect, useContext } from 'react'
import { View, Button, Image, FlatList, TouchableOpacity } from 'react-native'
import { useAuth } from 'auth/authContext'
import { useSearchBar } from 'main/sgGameSearchScreenContent/searchIndex'
import { SearchArea } from 'main/sgGameSearchScreenContent/sgAlgoliaComponents/sgAlgoliaSearchAreaContext'
import { loadingScreen } from 'auth/loadingScreen'
import {
    ContentContainer,
    CurrentThemeContext,
    SafeAreaViewContainer,
    ScrollViewContainer,
    Container,
    SgHomeActionGames,
    MainHeadingLongTitle,
    firebaseSearchContext,
    homeScreenDatesContext,
    homeScreenSpotlightGamesContext,
    faStar,
    FontAwesomeIcon,
    homeScreenGenreContext,
    homeScreenActionContext,
    MainFont,
    MainFontPills,
    MainHeading,
    GeneralFontColor,
    TouchableButton,
    TouchableButtonFont,
    ViewTopRow,
    windowHeight
} from 'index'
import { useIsFocused } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

export default function SgHomeScreen({ navigation, route }) {
    const { 
        currentUser, 
        currentUID, 
        displayData,
        toNewSection,
        sgFirebaseGamesCollectionSubGenre,
        sgFirebaseConsolesCollection,
        sgFirebaseGenreCollection,
        sgDB } = useAuth()

    const { 
        searchBar,  
        gamesFilterListName,
        testDb,
        } = useSearchBar()
    const colors = useContext(CurrentThemeContext)
    const date = useContext(homeScreenDatesContext)
    const spotlights = useContext(homeScreenSpotlightGamesContext)
    const sgGameSearch = useContext(firebaseSearchContext)
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read
    const [isLoading, setIsLoading] = useState(true)
    const [searchBarTouched, setSearchBarTouched] = useState(false)
    const [homepageSearchBar, setHomepageSearchBar] = useState(true)
    const [userInfo, setUserInfo] = useState()
    const [collectionName, setCollectionName] = useState('sgAPI')
    const [gameIndex, setGameIndex] = useState()
    // For Spotlight Section
    const [spotlightGameConsoleName, setSpotlightGameConsoleName] = useState()
     // For the Spotlight Game
     const [spotlightArray, setSpotlightArray] = useState([])
     const [spotlightArrayTitle, setSpotlightArrayTitle] = useState('')
     const [spotlightArrayTagLine, setSpotlightArrayTagLine] = useState('')
     // For the consoles section
     const [consoleArray, setConsoleArray] = useState([])
     const [consoleArrayTitle, setConsoleArrayTitle] = useState('')
    // For the 1st Section
    const [gamesArray, setGamesArray] = useState([])
    const [gamesArrayTitle, setGamesArrayTitle] = useState('')
    const [gamesArrayDescription, setGamesArrayDescription] = useState('')
    // For the 2nd Section
    const [gamesArray2, setGamesArray2] = useState([])
    const [gamesArrayTitle2, setGamesArrayTitle2] = useState('')
    const [gamesArrayDescription2, setgamesArrayDescription2] = useState('')
    // For the 3rd Section
    const [gamesArray3, setgamesArray3] = useState([])
    const [gamesArrayTitle3, setgamesArrayTitle3] = useState('')
    const [gamesArrayDescription3, setgamesArrayDescription3] = useState('')
    // For the 4th Section
    const [gamesArray4, setgamesArray4] = useState([])
    const [gamesArrayTitle4, setgamesArrayTitle4] = useState('')
    const [gamesArrayDescription4, setgamesArrayDescription4] = useState('')
    // For the 5th Section
    const [gamesArray5, setgamesArray5] = useState([])
    const [gamesArrayTitle5, setgamesArrayTitle5] = useState('')
    const [gamesArrayDescription5, setgamesArrayDescription5] = useState('')

    const [genreArray, setGenreArray] = useState([])
    const [genreArrayTitle, setGenreArrayTitle] = useState('')

    // Search Area
    const [searchActive, setSearchActive] = useState(false)


    // For Search Bar
    const [searchType, setSearchType] = useState('sgIGDBSearch')
    const [searchBarTitle, setSearchBarTitle] = useState('Search Games')
    const [searchBarCancel, setSearchBarCancel] = useState('Search Games')
    const [searchQuery, setSearchQuery] = useState('')
    const genreSpecFunc = useContext(homeScreenGenreContext)
    const actionGenreContext = useContext(homeScreenActionContext)
    const chosenDb = testDb
    const navigationPass = navigation
    const toGameData = {
        navigationPass,
        nextPage: 'sgGamePage'
    }
    const toConsoleList = {
        navigationPass,
        nextPage: 'SgAddGameConfirm'
    }

    // Retrieves data before the page loads
    const passingSectionData = {
        navigation, 
        findLaymanConsoleName, 
        genreSpecFunc, 
        FontAwesomeIcon, 
        faStar, 
        colors
    }

    const spotlightData = {
        setSpotlightGameConsoleName, 
        setSpotlightArray, 
        setSpotlightArrayTitle, 
        setSpotlightArrayTagLine, 
        sgFirebaseGamesCollectionSubGenre, 
        genreSpecFunc
    }

    /*----------- */

    function dope() {
        const consoleData = {
            setConsoleArray, setConsoleArrayTitle, sgFirebaseConsolesCollection, genreSpecFunc
        }
        const gameData1 = {
            setGamesArray, setGamesArrayTitle, setGamesArrayDescription, sgFirebaseGamesCollectionSubGenre, genreSpecFunc
        }
        const gameData2 = {
            setGamesArray2, setGamesArrayTitle2, setgamesArrayDescription2, sgFirebaseGamesCollectionSubGenre, genreSpecFunc
        }
        const gameData3 = {
            setGenreArray, setGenreArrayTitle, sgFirebaseGenreCollection, genreSpecFunc
        }
        const passingGameData3 = {}
        const passingGameData4 = {}
        const passingGameData5 = {}
        const d = new Date();
        let month = d.getMonth();
        if (month == 0) return date.mayGames(consoleData, gameData1, gameData2, gameData3)
        if (month == 1) return null
        if (month == 2) return null
        if (month == 3) return null
        if (month == 4) return date.mayGames(consoleData, gameData1, gameData2, gameData3)
        if (month == 5) return date.mayGames(consoleData, gameData1, gameData2, gameData3)
        if (month == 6) return null
        if (month == 7) return null
        if (month == 8) return date.mayGames(consoleData, gameData1, gameData2, gameData3)
        if (month == 9) return date.mayGames(consoleData, gameData1, gameData2, gameData3)
        if (month == 10) return date.mayGames(consoleData, gameData1, gameData2, gameData3)
        if (month == 11) return date.mayGames(consoleData, gameData1, gameData2, gameData3)
        if (month == 12) return date.mayGames(consoleData, gameData1, gameData2, gameData3)
    }

    useEffect(() => {
        function loadingTime() {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(
                    setUserInfo(currentUID),
                    setIsLoading(false),
                    udemyLoop1(10)
                )
                dope()
                spotlights.findWeekofYear(spotlightData, gamesArray)
              }, 2000)
              arrayOfFunctions()
            }, [])
        }
        async function sgLoader() {
            await loadingTime()
        }
        sgLoader()
        if(currentUID !== undefined) 
            return 
                displayData(collectionName)
               
    }, [isFocused])

    function arrayOfFunctions() {
        const turtleSoup = [0, 1]
        const random = Math.floor(Math.random() * turtleSoup.length);
        return setGameIndex(random)
    }

    function findLaymanConsoleName(consoleName) {
        if (consoleName == 'sgGenesis') return 'Sega Genesis'
        if (consoleName == 'sg1000') return 'Sega SG-1000'  
        if (consoleName == 'sgMS') return 'Sega Master System'
        if (consoleName == 'sgGG') return 'Sega Game Gear'
        if (consoleName == 'sgSat') return 'Sega Saturn'
        if (consoleName == 'sg32X') return 'Sega 32X'
        if (consoleName == 'sgCD') return 'Sega CD'
    }

    function udemyLoop1(n) {
        for(let i = 0; i < n; i++) {
            console.log(i)
        }
        return
    }

    /*
// pass a function to map
const map1 = array1.map(x => findLaymanConsoleName(x).substring(5))

console.log(map1);

const str = 'AppDividend';
console.log('Original String:', str);

const newStr = str.substring(5)
console.log('After removing the first character:', newStr);
*/

async function sgFirebaseGamesCollection(passingData) {
    const subscriber = sgDB
        .collection(collectiveGameData.collectionName)
        .doc(collectiveGameData.consoleName)
        .collection(collectiveGameData.gamesCollection)
        .orderBy(collectiveGameData.gamesCollectionOrderBy, collectiveGameData.gamesCollectionOrderDirection)
        .limit(collectiveGameData.gamesCollectionOrderLimit)
        .onSnapshot(querySnapshot => {
            const games = []
            querySnapshot.forEach(documentSnapshot => {
                games.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
                })
            })
    
            collectiveGameData.setupGameData(games)
        })
    return () => subscriber()
}
    

    async function sgFirebaseGamesCollection(passingData) {
        const subscriber = sgDB
            .collection(collectiveGameData.collectionName)
            .doc(collectiveGameData.consoleName)
            .collection(collectiveGameData.gamesCollection)
            .orderBy(collectiveGameData.gamesCollectionOrderBy, collectiveGameData.gamesCollectionOrderDirection)
            .limit(collectiveGameData.gamesCollectionOrderLimit)
            .onSnapshot(querySnapshot => {
                const games = []
                querySnapshot.forEach(documentSnapshot => {
                    games.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                    })
                })
        
                collectiveGameData.setupGameData(games)
            })
        return () => subscriber()
    }
    
    function searchResults() {
        return (
            <View>
                <MainFont>Show search page options here</MainFont>
                <SearchArea />
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

    /*-----------*/
    // Links to the search page
    function confirmViewGames() {
        navigation.navigate('SgConsoleList',{
            searchType: searchType
        })
    }

    // Buttons 
    function homepageButtonLayout() {
        if (currentUser !== null) return (
            <View>
                <TouchableButton onPress={() => toNewSection(toConsoleList.nextPage, toConsoleList.navigationPass)}>
                    <TouchableButtonFont>Add Game</TouchableButtonFont>
                </TouchableButton>
                <TouchableButton onPress={() => confirmViewGames()}>
                    <TouchableButtonFont>View All Games</TouchableButtonFont>
                </TouchableButton>
            </View>
        )
        if (currentUser === null) return (
            <View>
                <GeneralFontColor>Not Logged In</GeneralFontColor>
                <GeneralFontColor onPress={() => navigation.navigate('SgAddGameConfirm',{ itemId: 86})}>
                    TO Games
                </GeneralFontColor>
                <TouchableButton
                    onPress={() => navigation.navigate('Auth', { screen: 'SgAuthStack' })}>
                    <TouchableButtonFont>Log in</TouchableButtonFont>
                </TouchableButton>
            </View>
        )
    }
    /*-----------*/
    // Renders on page
    function consolesSection() {
        Object.assign(passingSectionData, {gamesArray: consoleArray})
        return actionGenreContext.consolesListSet(passingSectionData)
    }

    function spotlightSection() {
        Object.assign(passingSectionData, {gamesArray: spotlightArray, consoleName: spotlightGameConsoleName})
        return actionGenreContext.spotlightGamesGen(passingSectionData)
    }
    function actionSection() {
        Object.assign(passingSectionData, {gamesArray})
        return actionGenreContext.beatEmUpListGameSet(passingSectionData)
    }

    function actionsasSection() {
        Object.assign(passingSectionData, {gamesArray: gamesArray2})
        return actionGenreContext.platformersListGameSet(passingSectionData)
    }
    /*-----------*/

    function homepageHeader() {
        return (
            <View>
                {searchBarTouched == false
                    ?   <View>
                            <ViewTopRow>
                                <View style={{paddingTop: 30, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                                    <MainFont style={{alignItems: 'left', justifyContent: 'center'}}>Logo goes here</MainFont>
                                </View>
                            </ViewTopRow>
                            <ViewTopRow>
                                <View style={{paddingRight: 100, alignItems: 'right', justifyContent: 'center'}}>
                                    <TouchableOpacity onPress={() => setSearchBarTouched(true)}>
                                        {searchBar(searchBarTitle, searchType, searchQuery, searchBarTouched, setSearchBarTouched, homepageSearchBar)}
                                    </TouchableOpacity>
                                </View>
                            </ViewTopRow>
                        </View>
                    :   <View style={{}}>
                            <ViewTopRow>
                                <View style={{paddingTop: 30, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                                    <MainFont style={{alignItems: 'left', justifyContent: 'center'}}>Logo goes here</MainFont>
                                </View>
                            </ViewTopRow>
                            <TouchableOpacity style={{}} onPress={() => setSearchBarTouched(true)}>
                                {searchBar(searchBarTitle, searchType, searchQuery, searchBarTouched, setSearchBarTouched, homepageSearchBar)}
                            </TouchableOpacity>
                        </View>
                }
            </View>
        )
    }

    function homepageMainSection() {
        return (
            <View style={{paddingBottom: 200}}>
                {homepageHeader()}
                <ScrollViewContainer showsVerticalScrollIndicator={false}>
                    {actionSection()}
                    {actionsasSection()}
                    {homepageButtonLayout()}
                </ScrollViewContainer>
            </View>
        )
    }

    function homepageSearchSection() {
        return (
            <View>
                {homepageHeader()}
                <ScrollViewContainer showsVerticalScrollIndicator={false}>
                    {searchResults()}
                    {sgGameSearch.searchTagsCollection(consolesSection, searchActive, setSearchActive)}
                </ScrollViewContainer>
            </View>
        )
    }

  return (
    <SafeAreaViewContainer>
        {isLoading !== true 
            ?   <Container style={{paddingBottom: windowHeight/5}}>
                    {searchBarTouched == false
                        ?   homepageMainSection()
                        :   homepageSearchSection()
                    }
                </Container>
            :   <ContentContainer>
                    {loadingScreen()}
                </ContentContainer>
        }
    </SafeAreaViewContainer>
  )
}
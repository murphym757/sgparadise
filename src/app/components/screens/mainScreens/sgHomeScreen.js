import React, { useState, useEffect, useContext } from 'react'
import { View, Button, Image, FlatList, TouchableOpacity } from 'react-native'
import { useAuth } from 'auth/authContext'
import { useSearchBar } from 'main/sgGameSearchScreenContent/searchIndex'
import { loadingScreen } from 'auth/loadingScreen'
import {
    ContentContainer,
    CurrentThemeContext,
    SafeAreaViewContainer,
    ScrollViewContainer,
    Container,
    SgHomeActionGames,
    MainHeadingLongTitle,
    homeScreenDatesContext,
    homeScreenSpotlightGamesContext,
    faStar,
    FontAwesomeIcon,
    homeScreenGenreContext,
    homeScreenActionContext,
    MainFont,
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
        sgDB } = useAuth()

    const { 
        searchBar,  
        gamesFilterListName,
        testDb,
        } = useSearchBar()
    const colors = useContext(CurrentThemeContext)
    const date = useContext(homeScreenDatesContext)
    const spotlights = useContext(homeScreenSpotlightGamesContext)
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read
    const [isLoading, setIsLoading] = useState(true)
    const [userInfo, setUserInfo] = useState()
    const [collectionName, setCollectionName] = useState('sgAPI')
    const [gameIndex, setGameIndex] = useState()
    // For Spotlight Section
    const [spotlightGameName, setSpotlightGameName] = useState('')
    console.log("🚀 ~ file: sgHomeScreen.js ~ line 53 ~ SgHomeScreen ~ spotlightGameName", spotlightGameName)
     // For the Spotlight Game
     const [spotlightArray, setSpotlightArray] = useState([])
     const [spotlightArrayTitle, setSpotlightArrayTitle] = useState('')
     const [spotlightArrayTagLine, setSpotlightArrayTagLine] = useState('')
    // For the 1st Section
    const [gamesArray, setgamesArray] = useState([])
    const [gamesArrayTitle, setgamesArrayTitle] = useState('')
    const [gamesArrayDescription, setgamesArrayDescription] = useState('')
    // For the 2nd Section
    const [gamesArray2, setgamesArray2] = useState([])
    const [gamesArrayTitle2, setgamesArrayTitle2] = useState('')
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
    // For Search Bar
    const [searchType, setSearchType] = useState('sgIGDBSearch')
    const [searchBarTitle, setSearchBarTitle] = useState('Search Games')
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

    //For Udemy, please ignore this
    function logItems(n) {
        for(let i=0; i < n; i++) {
            console.log(i)
        }
    }

    /*----------- */

    function dope() {
        const spotlightData = {
            setSpotlightArray, setSpotlightArrayTitle, setSpotlightArrayTagLine, sgFirebaseGamesCollectionSubGenre, genreSpecFunc
        }
        const gameData1 = {
            setgamesArray, setgamesArrayTitle, setgamesArrayDescription, sgFirebaseGamesCollectionSubGenre, genreSpecFunc
        }
        const gameData2 = {
            setgamesArray2, setgamesArrayTitle2, setgamesArrayDescription2, sgFirebaseGamesCollectionSubGenre, genreSpecFunc
        }
        const passingGameData3 = {}
        const passingGameData4 = {}
        const passingGameData5 = {}
        const d = new Date();
        let month = d.getMonth();
        if (month == 0) return null
        if (month == 1) return null
        if (month == 2) return null
        if (month == 3) return null
        if (month == 4) return date.mayGames(spotlightData, gameData1, gameData2)
        if (month == 5) return null
        if (month == 6) return null
        if (month == 7) return null
        if (month == 8) return null
        if (month == 9) return null
        if (month == 10) return null
        if (month == 11) return null
        if (month == 12) return null
    }

    useEffect(() => {
        function loadingTime() {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(
                    setUserInfo(currentUID),
                    setIsLoading(false)
                )
                console.log('i fire once')
                dope()
                spotlights.findWeekofYear(setSpotlightGameName)
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
                displayData(collectionName),
                logItems(10)
               
    }, [isFocused])

    function arrayOfFunctions() {
        const turtleSoup = [0, 1]
        const random = Math.floor(Math.random() * turtleSoup.length);
        return setGameIndex(random)
    }

    function findLaymanConsoleName(consoleName) {
        if (consoleName == 'sgGenesis') return 'Sega Genesis'
        if (consoleName == 'sg1000') return 'Sega 1000'  
        if (consoleName == 'sgMS') return 'Sega Master System'
        if (consoleName == 'sgGG') return 'Sega Game Gear'
        if (consoleName == 'sgSat') return 'Sega Saturn'
        if (consoleName == 'sg32X') return 'Sega 32X'
        if (consoleName == 'sgCD') return 'Sega Cd'
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

    async function sgFirebaseGamesCollectionSubGenre(collectiveGameData, spotlightGame) {
        if (collectiveGameData.gameRefSpecificRelatedData != null) {
            const subscriber = sgDB
            .collection(collectiveGameData.collectionName)
            .doc(collectiveGameData.consoleName)
            .collection(collectiveGameData.gamesCollection)
            .orderBy(collectiveGameData.gamesCollectionOrderBy, collectiveGameData.gamesCollectionOrderDirection)
            .limit(collectiveGameData.gamesCollectionOrderLimit)
            .where(collectiveGameData.gameRefSpecificData, '==', collectiveGameData.gameRefSpecificRelatedData)
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
        } else {
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
        
    }
    
    function searchResults() {
        return (
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
                    onPress={() => navigation.navigate('Auth', { screen: 'sgAuthStack' })}>
                    <TouchableButtonFont>Log in</TouchableButtonFont>
                </TouchableButton>
            </View>
        )
    }
    /*-----------*/
    // Renders on page
    function spotlightSection() {
        Object.assign(passingSectionData, {gamesArray: spotlightArray})
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


  return (
    <SafeAreaViewContainer>
        {isLoading !== true 
            ?   <Container style={{paddingBottom: windowHeight/5}}>
                    <MainFont>Logo goes here</MainFont>
                    {searchBar(searchBarTitle, searchType, searchQuery)}
                    <ScrollViewContainer 
                    showsVerticalScrollIndicator={false}>
                        {searchResults()}
                        {spotlightSection()}
                        {actionSection()}
                        {actionsasSection()}
                        {homepageButtonLayout()}
                    </ScrollViewContainer>
                </Container>
            :   <ContentContainer>
                    {loadingScreen()}
                </ContentContainer>
        }
    </SafeAreaViewContainer>
  )
}
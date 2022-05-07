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
    faStar,
    FontAwesomeIcon,
    homeScreenGenreContext,
    homeScreenActionContext,
    MainFont,
    GeneralFontColor,
    TouchableButton,
    TouchableButtonFont,
    ViewTopRow
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
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read
    const [isLoading, setIsLoading] = useState(true)
    const [userInfo, setUserInfo] = useState()
    const [collectionName, setCollectionName] = useState('sgAPI')
    const [gameIndex, setGameIndex] = useState()
    const [gamesArray, setgamesArray] = useState([])
    console.log("🚀 ~ file: sgHomeActionGames.js ~ line 24 ~ SgHomeActionGames ~ gamesArray", gamesArray)
    const [gamesArrayTitle, setgamesArrayTitle] = useState('')
    const [gamesArrayDescription, setgamesArrayDescription] = useState('')
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

    //For Udemy, please ignore this
    function logItems(n) {
        for(let i=0; i < n; i++) {
            console.log(i)
        }
    }

    /*----------- */

    useEffect(() => {
        function loadingTime() {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(
                    setUserInfo(currentUID),
                    setIsLoading(false)
                    )
              }, 2000)
              arrayOfFunctions(),
              beatEmUpList()
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

    function detailedGameImage(item) {
        return (
            <View style={{
                width: '100%',
            }}>
                <Image
                    style={{
                        height: 150,
                        width: 125,
                        resizeMode: 'stretch',
                        borderRadius: 5,
                    }}
                    source={{
                        uri: `${item.firebaseCoverUrl}`,
                    }}
                />
            </View>
        )
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

    async function sgFirebaseGamesCollectionSubGenre(collectiveGameData) {
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

    // Retrieves data before the page loads
    function beatEmUpList() {
        const consoleName = 'sgGenesis'
        const gameRefSpecificRelatedData = 'Beat ‘em Up'
        const passingGameData = {
            setgamesArray,
            setgamesArrayTitle,
            setgamesArrayDescription,
            consoleName,
            gameRefSpecificRelatedData
        }
            return (
                sgFirebaseGamesCollectionSubGenre(genreSpecFunc.dataCollector(passingGameData))
            )
    }

    // Renders on page
    function actionSection() {
        const passingSectionData = {
            navigation, 
            findLaymanConsoleName, 
            genreSpecFunc, 
            gamesArray, 
            FontAwesomeIcon, 
            faStar, 
            colors
        }
        return actionGenreContext.beatEmUpListGameSet(passingSectionData)
    }


  return (
    <SafeAreaViewContainer>
        {isLoading !== true 
            ?   <Container style={{paddingBottom: 150}}>
            <MainFont>Logo goes here</MainFont>
                    {searchBar(searchBarTitle, searchType, searchQuery)}
                    <ScrollViewContainer>
                        {searchResults()}
                        {actionSection()}
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
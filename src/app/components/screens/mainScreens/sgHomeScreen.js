import React, { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity } from 'react-native'
import { AppWideImageContext } from 'main/sgImageContext'
import { firebaseSearchContext } from 'main/sgHomeScreenGames/sgHomeSearchScreen'
import { homeScreenActionContext } from 'main/sgHomeScreenGames/sgHomeActionGames'
import { homeScreenDatesContext } from 'main/sgHomeScreenGames/sgHomeDates'
import { homeScreenGenreContext } from 'main/sgHomeScreenContext'
import { homeScreenSpotlightGamesContext } from 'main/sgHomeScreenGames/sgSpotlightedGames'
import { loadingScreen } from 'auth/loadingScreen'
import { useAuth } from 'auth/authContext'
import { useSearchBar } from 'main/sgGameSearchScreenContent/searchIndex'
import {
    ContentContainer,
    CurrentThemeContext,
    SafeAreaViewContainer,
    ScrollViewContainer,
    Container,
    faStar,
    FontAwesomeIcon,
    MainFont,
    GeneralFontColor,
    TouchableButton,
    TouchableButtonFont,
    ViewTopRow,
    windowHeight,
} from 'index';
import { useIsFocused } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

export default function SgHomeScreen({ navigation, route }) {
    const { 
        backArrow,
        currentUID, 
        currentUser, 
        displayData,
        sgDB,
        sgFirebaseConsolesCollection,
        sgFirebaseGamesCollectionSubGenre,
        sgFirebaseGenreCollection,
        toNewSection
    } = useAuth()

    // For Spotlight Section
    const [collectionName, setCollectionName] = useState('sgAPI')
    const [gameArrayTest, setGameArrayTest] = useState([])
    console.log("🚀 ~ file: sgHomeScreen.js:47 ~ SgHomeScreen ~ gameArrayTest:", gameArrayTest)
    const [gameIndex, setGameIndex] = useState()
    const [homepageSearchBar, setHomepageSearchBar] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [searchBarTouched, setSearchBarTouched] = useState(false)
    const [userInfo, setUserInfo] = useState()
    const { searchBar } = useSearchBar()
    const colors = useContext(CurrentThemeContext)
    const colorsPassThrough = colors
    const date = useContext(homeScreenDatesContext)
    const images = useContext(AppWideImageContext)
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read
    const sgGameSearch = useContext(firebaseSearchContext)
    const spotlights = useContext(homeScreenSpotlightGamesContext)
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
    console.log("🚀 ~ file: sgHomeScreen.js:82 ~ SgHomeScreen ~ gamesArray3:", gamesArray3)
    const [gamesArrayTitle3, setgamesArrayTitle3] = useState('')
    const [gamesArrayDescription3, setgamesArrayDescription3] = useState('')
    // For the 4th Section
    const [gamesArray4, setgamesArray4] = useState([])
    console.log("🚀 ~ file: sgHomeScreen.js:87 ~ SgHomeScreen ~ gamesArray4:", gamesArray4)
    const [gamesArrayTitle4, setgamesArrayTitle4] = useState('')
    const [gamesArrayDescription4, setgamesArrayDescription4] = useState('')
    // For the 5th Section
    const [gamesArray5, setgamesArray5] = useState([])
    const [gamesArrayTitle5, setgamesArrayTitle5] = useState('')
    const [gamesArrayDescription5, setgamesArrayDescription5] = useState('')

    const [gamesArray6, setgamesArray6] = useState([])
    const [gamesArrayTitle6, setgamesArrayTitle6] = useState('')
    const [gamesArrayDescription6, setgamesArrayDescription6] = useState('')

    const [genreArray, setGenreArray] = useState([])
    const [genreArrayTitle, setGenreArrayTitle] = useState('')

    // Search Area
    const [searchActive, setSearchActive] = useState(false)


    // For Search Bar
    const [ searchBarCancel, setSearchBarCancel ] = useState('Search Games')
    const [ searchBarTitle, setSearchBarTitle ] = useState('Search Games')
    const [ searchQuery, setSearchQuery ] = useState('')
    const [ searchType, setSearchType ] = useState('sgIGDBSearch')
    const actionGenreContext = useContext(homeScreenActionContext)
    const genreSpecFunc = useContext(homeScreenGenreContext)
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

    function homepageSpotlightCollection() {
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
        if (month == 1) return date.mayGames(consoleData, gameData1, gameData2, gameData3)
        if (month == 2) return date.mayGames(consoleData, gameData1, gameData2, gameData3)
        if (month == 3) return date.mayGames(consoleData, gameData1, gameData2, gameData3)
        if (month == 4) return date.mayGames(consoleData, gameData1, gameData2, gameData3)
        if (month == 5) return date.mayGames(consoleData, gameData1, gameData2, gameData3)
        if (month == 6) return date.mayGames(consoleData, gameData1, gameData2, gameData3)
        if (month == 7) return date.mayGames(consoleData, gameData1, gameData2, gameData3)
        if (month == 8) return date.mayGames(consoleData, gameData1, gameData2, gameData3)
        if (month == 9) return date.mayGames(consoleData, gameData1, gameData2, gameData3)
        if (month == 10) return date.mayGames(consoleData, gameData1, gameData2, gameData3)
        if (month == 11) return date.mayGames(consoleData, gameData1, gameData2, gameData3)
        if (month == 12) return date.mayGames(consoleData, gameData1, gameData2, gameData3)
    }

    const items = [
        { id: 1, consoleName: 'sgGenesis', gameSubgenre: 'Racing' },
        { id: 2, consoleName: 'sgGenesis', gameSubgenre: 'Basketball' },
        { id: 3, consoleName: 'sgGenesis', gameSubgenre: 'Platformer' },
        { id: 4, consoleName: 'sgGenesis', gameSubgenre: 'Football' },  
      ];
      
      function doSomething(item, setArrayForGames) {
        displayData(collectionName, `${item.consoleName}`, `${item.gameSubgenre}`, setArrayForGames)
      }

      function testing() {
        const array2 = [
            {id: 1, gameArrayToBeSet: setgamesArray3},
            {id: 2, gameArrayToBeSet: setgamesArray4},
            {id: 3, gameArrayToBeSet: setgamesArray5},
            {id: 4, gameArrayToBeSet: setgamesArray6},
          ];
        for (let i = 0; i < array2.length; i++) {
            doSomething(items[i], array2[i].gameArrayToBeSet);
        }
      }

    function testFunc() {
        const array1 = [
            { id: 1, consoleName: 'sgGenesis', gameSubgenre: 'Racing' },
            { id: 2, consoleName: 'sgGenesis', gameSubgenre: 'Basketball' },
            { id: 3, consoleName: 'sgGenesis', gameSubgenre: 'Platformer' },
            { id: 4, consoleName: 'sgGenesis', gameSubgenre: 'Football' },     
          ];
          
          const array2 = [
            {id: 1, gameArrayToBeSet: setgamesArray3},
            {id: 2, gameArrayToBeSet: setgamesArray4},
            {id: 3, gameArrayToBeSet: setgamesArray5},
            {id: 4, gameArrayToBeSet: setgamesArray6},
          ];
          
          const mergedArray = array1.map(item1 => {
            const item2 = array2.find(item2 => item2.id === item1.id);
            return { ...item1, ...item2 };
          });ray4
          
          for (let i = 0; i < array2.length; i++) {
            displayData(collectionName, mergedArray.consoleName, mergedArray.gameSubgenre, mergedArray.gameArrayToBeSet)
          }
    }
    

    async function homePageContentDisplay(consoleName, gameSubgenre, setGameArrayTest) {
        const sgConsoleName = 'sgGenesis'
        const gameExamples = [
            { id: 1, consoleName: 'sgGenesis', gameSubgenre: 'Racing' },
            { id: 2, consoleName: 'sgGenesis', gameSubgenre: 'Basketball' },
            { id: 3, consoleName: 'sgGenesis', gameSubgenre: 'Platformer' },
            { id: 4, consoleName: 'sgGenesis', gameSubgenre: 'Football' },
            { id: 5, consoleName: 'sgGenesis', gameSubgenre: 'Shooter' },     
          ];
        const gameArrays = [
            {id: 1, gameArrayToBeSet: setgamesArray3},
            {id: 2, gameArrayToBeSet: setgamesArray4},
            {id: 3, gameArrayToBeSet: setgamesArray5},
            {id: 4, gameArrayToBeSet: setgamesArray6},
        ]
        for (let i = 0; i < 4 && i < gameExamples.length; i++) {
            displayData(collectionName, 'sgGenesis', 'Racing')
            const item = gameExamples[i];
            items.push(<div key={item.id}>{item.name}</div>);
        }
        return displayData(collectionName, 'sgGenesis', 'Racing')
    }

    const objects = [
        { id: 1, name: 'Object 1' },
        { id: 2, name: 'Object 2' },
        { id: 3, name: 'Object 3' },
        { id: 4, name: 'Object 4' },
        { id: 5, name: 'Object 5' }
      ];
      
      function getRandomObjects(objects, count) {
        const selectedObjects = [];
        const updatedObjects = objects.slice();
        for (let i = 0; i < count; i++) {
          const index = Math.floor(Math.random() * updatedObjects.length);
          const selectedObject = updatedObjects[index];
          selectedObjects.push(selectedObject);
          updatedObjects.splice(index, 1);
        }
        return [selectedObjects, updatedObjects];
      }
      
      let [selectedObjects, remainingObjects] = getRandomObjects(objects, 3);
      console.log(selectedObjects);
      console.log(remainingObjects);

    useEffect(() => {  
        const fetchData = async () => {
            displayData(collectionName, 'sgGenesis', 'Racing', setGameArrayTest)
        }
        setTimeout(() => {
            setUserInfo(currentUID),
            setIsLoading(false)
          }, 2000)
        getRandomObjects(objects)
    }, [isFocused])

    function findLaymanConsoleName(consoleName) {
        if (consoleName == 'sgGenesis') return 'Sega Genesis'
        if (consoleName == 'sg1000') return 'Sega SG-1000'  
        if (consoleName == 'sgMS') return 'Sega Master System'
        if (consoleName == 'sgGG') return 'Sega Game Gear'
        if (consoleName == 'sgSat') return 'Sega Saturn'
        if (consoleName == 'sg32X') return 'Sega 32X'
        if (consoleName == 'sgCD') return 'Sega CD'
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
                                    <MainFont style={{alignItems: 'flex-start', justifyContent: 'center'}}>Logo goes here</MainFont>
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
                                    <MainFont style={{alignItems: 'flex-start', justifyContent: 'center'}}>Logo goes here</MainFont>
                                </View>
                            </ViewTopRow>
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
                    {spotlightSection()}
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
                    {sgGameSearch.searchTagsCollection(consolesSection, searchActive, setSearchActive)}
                </ScrollViewContainer>
            </View>
        )
    }

    function HomepageTotal() {
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

    /*-----------*/
    // App-Wide Header
    function backButton() {
        const stackName = 'Main'
        const backNeeded = true
        return (
            <TouchableOpacity onPress={() => {
                navigation.goBack(stackName)
            }}> 
            {backArrow(colorsPassThrough, backNeeded)}
            </TouchableOpacity>
            
        )
    }

    function homeScreenLogo() {
        const logoLink = 'https://reactnative.dev/img/tiny_logo.png'
        const logoImageData = {
            height: 45,
            width: 45,
            borderRadius: 5,
            contentFit: 'cover',
            transition: 1000,
            logoLink: logoLink
        }
        return images.HeaderLogo(logoImageData)
    }
    
    function HomeOptions() {
        const pageLoadedHeader = {
            title: 'SGParadise home',
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTransparent: true,
            label: false,
            headerLeft: isLoading == true
                ?   ''
                : (props) => (
                    backButton(props)
            ),
            headerTitle: isLoading == true
                ?   ''
                : (props) => (
                    homeScreenLogo(props)
            ),
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }
        const pageUnloadedHeader = {
            title: '',
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTransparent: true,
            label: false,
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }
        return isLoading !== true ? pageLoadedHeader : pageUnloadedHeader
    }

    /*-----------------------------------*/


    function HomeStack() {
        const Stack = createStackNavigator()
        return (
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen 
                    name="Home" 
                    component={HomepageTotal}
                    options={HomeOptions()}
                />
            </Stack.Navigator>
        )
    }

    return (
        HomeStack()
    )
}
import { useState, useEffect, useContext } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import {
    BackButtonBottomLayer,
    BackButtonTopLayer,
    Container,
    CurrentThemeContext,
    faChevronLeft,
    faCircle,
    FontAwesomeIcon,
    gameScreenContext,
    sgSearchScreen,
    useAuth,
} from 'index';
import { useIsFocused } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

export default function GameScreen({navigation}) {
    const { 
        sgDB, 
        sgImageStorage, 
        currentUser, 
        forwardToNextPage,
        currentUID,
        updateGameViewCount,
        updateGameViewCountReset,
    } = useAuth()
    const colors = useContext(CurrentThemeContext)
    const gameScreenFunc = useContext(gameScreenContext)
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read
    const [isLoading, setIsLoading] = useState(true)
    const [currentGameArray, setCurrentGameArray] = useState([])
    const [searchType, setSearchType] = useState('sgFirebaseSearch')
    const [consoleName, setConsoleName] = useState('sgGenesis')
    const [gameName, setGameName] = useState('streets-of-rage-2')
    const [gameGenre, setGameGenre] = useState('') //For recommended related games
    const [gameSubgenre, setGameSubgenre] = useState('') //For recommended related games
    const [gameReleaseDate, setGameReleaseDate] = useState('') //For recommended related games
    const [gameScreenshot1, setGameScreenshot1] = useState([])
    const [gameScreenshot2, setGameScreenshot2] = useState([])
    const [gameScreenshot3, setGameScreenshot3] = useState([])
    const gameScreenshots = [gameScreenshot1.toString(), gameScreenshot2.toString(), gameScreenshot3.toString()]
    const [gameHomeScreenShot, setGameHomeScreenShot] = useState('')
    const [gamePageNewHomeScreen, setGamePageNewHomeScreen] = useState('')
    const [gamePageView, setGamePageViews]  = useState('')
    const collectionName = 'sgAPI'
    const gamesCollection = 'games'

    useEffect(() => {
        function loadingTime() {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(
                    setIsLoading(false)
                    )
              }, 2000)
              getCurrentGameData()
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

    async function getCurrentGameData() {
        let currentGameData = []
        let currentGameGenre = ''
        let currentGameSubgenre = ''
        let currentGameReleaseDate = ''
        let currentGameHomeScreenshot = ''
        let currentGameScreenshot1 = []
        let currentGameScreenshot2 = []
        let currentGameScreenshot3 = []
        const gameRef = sgDB.collection(collectionName).doc(consoleName).collection(gamesCollection).doc(gameName)
        gameRef.get().then((doc) => {
            if (doc.exists) {
                currentGameData.push(doc.data())
                currentGameScreenshot1.push(doc.data().firebaseScreenshot1Url)
                currentGameScreenshot2.push(doc.data().firebaseScreenshot2Url)
                currentGameScreenshot3.push(doc.data().firebaseScreenshot3Url)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        setCurrentGameArray(currentGameData)
        setGameScreenshot1(currentGameScreenshot1)
        setGameScreenshot2(currentGameScreenshot2)
        setGameScreenshot3(currentGameScreenshot3)
    }

    function BackArrow() {
        return (
            <Container style={{paddingTop: 40}}>
                <View style={{ flex: 1, alignItems: 'left', justifyContent: 'center', backgroundColor: colors.primaryColor }}> 
                    <BackButtonTopLayer>
                        <FontAwesomeIcon 
                            icon={ faCircle } color={colors.primaryFontColor} size={50}
                            onPress={() => navigation.goBack('Main')}
                        />
                    </BackButtonTopLayer>
                    <BackButtonBottomLayer>
                        <FontAwesomeIcon 
                            icon={ faChevronLeft } color={colors.secondaryColor} size={25} 
                            onPress={() => navigation.goBack('Main')}
                        />
                    </BackButtonBottomLayer>
                </View>
            </Container>
        )
    }
    
    function chosenDataOption(item) {
        const toGameData = {
            searchType,
            clientIdIGDB: null,
            accessTokenIGDB: null,
            igdbConsoleId: null,
            gbConsoleId: null,
            selectedSystemLogo: null,
            navigationPass: navigation,
            keySearchData: item,
            nextPage: 'Page1'
        }
        forwardToNextPage(toGameData.nextPage, toGameData, toGameData.navigationPass)
    }

    /*----------------------------------------------*/
    // Changes page's background
    function selectedGameScreenshot(item) {
        return (
            setIsLoading(true),
            setTimeout(() => {
                    setIsLoading(false),
                    setGamePageNewHomeScreen(item)
              }, 2000)
        )
    }
     /*----------------------------------------------*/

    function gamePageScrollView() {
        return (
            <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{flexWrap: "wrap", paddingHorizontal: 20}}>
                    {gameScreenFunc.returnedGameInfo(currentGameArray, isLoading, setGameHomeScreenShot)}
                    {gameScreenFunc.returnedGameSummary(currentGameArray)}
                    {gameScreenFunc.returnedGameScreenshots(gameScreenshots, isLoading, selectedGameScreenshot, colors)}
                    {gameScreenFunc.returnedGamePubDevInfo(currentGameArray, chosenDataOption)}
                    {gameScreenFunc.returnedGameGenresAndModes(currentGameArray, chosenDataOption)}
            </ScrollView>
        )
    }

    function gamePageStructure() {
        if (gamePageNewHomeScreen == '') return gameScreenFunc.preDeterminedGameHomeScreen(gameHomeScreenShot, gamePageScrollView, isLoading, colors)
        if (gamePageNewHomeScreen != '') return gameScreenFunc.updatedGameHomeScreen(gamePageNewHomeScreen, gamePageScrollView, isLoading, colors)
    }

    function homeOptions() {
        return {
            title: '',
            headerTransparent: true,
            label: false,
            headerLeft: isLoading == true
                ?   ''
                : (props) => (
                    <TouchableOpacity onPress={() => {
                        updateGameViewCount(collectionName, consoleName, gamesCollection, gameName) // The view count is updated here, but falsely updated on the page. The process was done this way because there was next to no way to properly updated the state in Firebase and have that number represented on the page.
                        navigation.goBack('Main')
                    }}>
                        <BackArrow {...props} />
                    </TouchableOpacity>
                )
        }
    }

    function searchOptions() {
        return {
            title: '',
            headerTransparent: true,
            label: false,
            headerLeft: isLoading == true
                ?   ''
                : (props) => (
                    <TouchableOpacity onPress={() => {
                        navigation.goBack('Main')
                    }}>
                        <BackArrow {...props} />
                    </TouchableOpacity>
                )
        }
    }
    
    function selectedGameStack() {
        const Stack = createStackNavigator()
        return (
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen 
                    name="Home" 
                    component={gamePageStructure}
                    options={homeOptions()}
                />
                <Stack.Screen 
                    name="Page1" 
                    component={sgSearchScreen}
                    options={searchOptions()}
                />
            </Stack.Navigator>
        )
    }

  return (
    selectedGameStack()
  )
}
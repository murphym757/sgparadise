import { useState, useEffect, useContext } from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { CurrentThemeContext, gameScreenContext, SgSearchScreen, SgConsoleListScreen, useAuth } from 'index';
import { useIsFocused, useFocusEffect } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

export default function GameScreen({navigation, route}) {
    const { 
        sgDB,
        forwardToNextPage,
        currentUID,
        updateGameViewCount,
        backArrow,
        toNewStack
    } = useAuth()
    const colors = useContext(CurrentThemeContext)
    const gameScreenFunc = useContext(gameScreenContext)
    const { collectionName, gamesCollection, consoleName, gameName, gameImageCount, gameSummary, back2Search} = route.params
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read
    const [isLoading, setIsLoading] = useState(true)
    const [currentGameArray, setCurrentGameArray] = useState([])
    const [searchType, setSearchType] = useState('sgFirebaseSearch')
    const [gameGenre, setGameGenre] = useState('') //For recommended related games
    const [gameSubgenre, setGameSubgenre] = useState('') //For recommended related games
    const [gameReleaseDate, setGameReleaseDate] = useState('') //For recommended related games
    const [gameScreenshot1, setGameScreenshot1] = useState([])
    const [gameScreenshot2, setGameScreenshot2] = useState([])
    const [gameScreenshot3, setGameScreenshot3] = useState([])
    const gameScreenshots = [gameScreenshot1.toString(), gameScreenshot2.toString(), gameScreenshot3.toString()]
    const [gameHomeScreenCover, setGameHomeScreenCover] = useState('')
    const [gameHomeScreenShot, setGameHomeScreenShot] = useState('')
    console.log(gameHomeScreenShot)
    const [gamePageNewHomeScreen, setGamePageNewHomeScreen] = useState('')
    console.log(gamePageNewHomeScreen)
    const [gamePageView, setGamePageViews] = useState('')
    const navigationPass = navigation
    const colorsPassThrough = colors
    const [dataToBePassed, setDataToBePassed] = useState('')
    const nameOfGame = gameName

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
        //This code asks whether or not the game's data was passed in or not. This is really more useful when traversing between tabs (in the navbar)
        if (currentGameArray.length === 0)  {
            setCurrentGameArray(currentGameData)
            setGameScreenshot1(currentGameScreenshot1)
            setGameScreenshot2(currentGameScreenshot2)
            setGameScreenshot3(currentGameScreenshot3)
        }
    }


    function BackButton() {
        const backNeeded = true
        return (
            backArrow(colorsPassThrough, backNeeded)
        )
    }
    
    function chosenDataOption(item) {
        return (
          navigation.navigate('SgSearchSet', {
                gameDataToBePassed: item,
                gamePageLinkPressed: true
            })
        )
    }

    // Links to the search page
    function passDataToNextPage(item) {
        const gamePageLinkPressed = true
        return (
          navigation.navigate('SgSearchSet', {
                gameDataToBePassed: dataToBePassed,
                gamePageLinkPressed: true
            })
        )
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

     function setUpdoe() {
         return (
            setKeySearchDataPartOfArray(true)
         )
     }

    function gamePageScrollView() {
        if (gameImageCount === 0) {
            return (
                <ScrollView 
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{flexWrap: "wrap", paddingHorizontal: 20}}>
                        {gameScreenFunc.returnedGameInfo(currentGameArray, isLoading,setGameHomeScreenCover, setGameHomeScreenShot)}
                        {gameScreenFunc.returnedGameSummary(currentGameArray)}
                        {gameScreenFunc.returnedGamePubDevInfo(currentGameArray, chosenDataOption)}
                        {gameScreenFunc.returnedGameGenresAndModes(currentGameArray, chosenDataOption)}
                </ScrollView>
            )
        } else {
            return (
                <ScrollView 
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{flexWrap: "wrap", paddingHorizontal: 20}}>
                        {gameScreenFunc.returnedGameInfo(currentGameArray, isLoading, setGameHomeScreenCover, setGameHomeScreenShot)}
                        {gameScreenFunc.returnedGameSummary(currentGameArray)}
                        {gameScreenFunc.returnedGameScreenshots(gameScreenshots, isLoading, selectedGameScreenshot, colors)}
                        {gameScreenFunc.returnedGamePubDevInfo(currentGameArray, chosenDataOption)}
                        {gameScreenFunc.returnedGameGenresAndModes(currentGameArray, chosenDataOption)}
                </ScrollView>
            )
        }
        
    }

    function GamePageStructure() {
        if (gamePageNewHomeScreen == '') return gameScreenFunc.preDeterminedGameHomeScreen(gameHomeScreenCover, gameHomeScreenShot, gamePageScrollView, isLoading, colors)
        if (gamePageNewHomeScreen !== '') return gameScreenFunc.updatedGameHomeScreen(gamePageNewHomeScreen, gamePageScrollView, isLoading, colors)
    }

    /*----------------------------------------------*/
    // Back Button in Header
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
                        navigation.goBack()
                    }}>
                        <BackButton {...props} />
                    </TouchableOpacity>
                )
                
        }
    }
    /*----------------------------------------------*/
    
    function selectedGameStack() {
        const Stack = createStackNavigator()
        return (
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen 
                    name="Home" 
                    component={GamePageStructure}
                    options={homeOptions()}
                />
            </Stack.Navigator>
        )
    }

  return (
    selectedGameStack()
  )
}
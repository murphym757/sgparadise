import React, { useState, useEffect, useContext } from 'react'
import { ScrollView, Pressable, View } from 'react-native'
import { AppWideImageContext } from 'main/sgImageContext'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CurrentThemeContext } from 'index';
import { doc, getDoc } from "firebase/firestore"
import { gameScreenContext } from 'main/sgGameScreenContent/sgGameScreenContext'
import { useAuth } from 'auth/authContext'
import { useIsFocused } from '@react-navigation/native';

export default function GameScreen({navigation, route}) {
    const [ currentGameArray, setCurrentGameArray ] = useState([])
    const [ dataToBePassed, setDataToBePassed] = useState('')
    const [ gameHomeNewScreenShot, setGameHomeNewScreenShot ] = useState('')
    const [ gameHomeScreenCover, setGameHomeScreenCover ] = useState('')
    const [ gameHomeScreenShot, setGameHomeScreenShot ] = useState('')
    const [ gameScreenshot1, setGameScreenshot1 ] = useState([])
    const [ gameScreenshot2, setGameScreenshot2 ] = useState([])
    const [ gameScreenshot3, setGameScreenshot3 ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    const { collectionName, gamesCollection, consoleName, gameName, gameImageCount, gameSummary, back2Search } = route.params
    const { sgDB, currentUID, updateGameViewCount, backArrow, preLoadedData } = useAuth()
    const colors = useContext(CurrentThemeContext)
    const colorsPassThrough = colors
    const gameScreenFunc = useContext(gameScreenContext)
    const gameScreenshots = [ gameScreenshot1.toString(), gameScreenshot2.toString(), gameScreenshot3.toString() ]
    const images = useContext(AppWideImageContext)
    const isFocused = useIsFocused() //Needs to be outside of the useEffect to properly be read

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
        let currentGameScreenshot1 = []
        let currentGameScreenshot2 = []
        let currentGameScreenshot3 = []
        const gameRef = doc(sgDB, collectionName, consoleName, gamesCollection, gameName)
        const docSnap = await getDoc(gameRef)

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data())
            currentGameData.push(docSnap.data())
            currentGameScreenshot1.push(docSnap.data().firebaseScreenshot1Url)
            currentGameScreenshot2.push(docSnap.data().firebaseScreenshot2Url)
            currentGameScreenshot3.push(docSnap.data().firebaseScreenshot3Url)
        } else {
          // docSnap.data() will be undefined in this case
            console.log("No such document!")
        }
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
            setGameHomeNewScreenShot(item)
        )
    }
    /*----------------------------------------------*/

    function setUpdoe() {
        return (
            setKeySearchDataPartOfArray(true)
        )
    }

    //* PrimaryGamePageStructure
        function gamePageCoverImages(imageChosen) {
            const imageData = {
                height: 500,
                width: 400,
                contentFit: 'fill',
                borderRadius: 25,
                transition: 1000,
            }
            return images.gamePageCoverImage(imageData, imageChosen)
        }

        function PrimaryGamePageStructure() {
            const passingPrimaryGamePageData = {
                currentGameArray, gamePageCoverImages
            }
            return gameScreenFunc.gameLandingPage(passingPrimaryGamePageData)
        }
    //*--------------------PrimaryGamePageStructure-------------------------*/
    //* SecondaryGamePageStructure
        function gamePageGameplayImages(borderWidth, borderColor, item) {
            const imageData = {
                height: 70,
                width: 120,
                contentFit: 'fill',
                borderRadius: 5,
                borderWidth: borderWidth,
                borderColor: borderColor,
                transition: 1000,
            }
            return images.gamePageGameplayImages(imageData, item)
        }

        function gamePageGameplayImagesSelected(item) {
            return gamePageGameplayImages(7, colors.secondaryColor, item)
        }

        function gamePageGameplayImagesNotSelected(item) {
            return gamePageGameplayImages(0, null, item)
        }

        function gamePageGameplayImage(imageChosen) {
            const imageData = {
                height: 250,
                width: 400,
                contentFit: 'fill',
                borderRadius: 25,
                transition: 1000,
            }
            return images.gamePageGameplayImageBigDisplay(imageData, imageChosen)
        }

        function informationExcludedImages() {
            return (
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{flexWrap: "wrap", paddingHorizontal: 20}}>
                        {gameScreenFunc.returnedGameSummary(currentGameArray)}
                        {gameScreenFunc.returnedGameInfo(currentGameArray, isLoading,setGameHomeScreenCover, setGameHomeScreenShot)}
                        {gameScreenFunc.returnedGamePubDevInfo(currentGameArray, chosenDataOption)}
                        {gameScreenFunc.returnedGameGenresAndModes(currentGameArray, chosenDataOption)}
                </ScrollView>
            )
        }

        function allInformationIncluded() {
            return (
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{flexWrap: "wrap", paddingHorizontal: 20}}>
                        {gameScreenFunc.returnedGameSummary(currentGameArray)}
                        {gameScreenFunc.returnedGameInfo(currentGameArray, isLoading, setGameHomeScreenCover, setGameHomeScreenShot)}
                        {gameScreenFunc.returnedGameScreenshots(gameScreenshots, gameHomeNewScreenShot, selectedGameScreenshot, gamePageGameplayImagesSelected, gamePageGameplayImagesNotSelected)}
                        {gameScreenFunc.returnedGamePubDevInfo(currentGameArray, chosenDataOption)}
                        {gameScreenFunc.returnedGameGenresAndModes(currentGameArray, chosenDataOption)}
                </ScrollView>
            )
        }

        function gamePageScrollView() {
            return (
                gameImageCount === 0
                    ?   informationExcludedImages()
                    :   allInformationIncluded()
            )
        }
    //*--------------------SecondaryGamePageStructure-------------------------*/

    function SecondaryGamePageStructure() {
        const imageData = {
            currentGameArray, gameScreenshots, isLoading, colors, navigation
        }
        if (gameHomeNewScreenShot == '') return gameScreenFunc.preDeterminedGameHomeScreen(imageData, gameHomeScreenShot, gamePageScrollView, gamePageGameplayImage)
        if (gameHomeNewScreenShot !== '') return gameScreenFunc.updatedGameHomeScreen(imageData, gameHomeNewScreenShot, gamePageScrollView, gamePageGameplayImage)
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
                    <Pressable onPress={() => {
                        updateGameViewCount(collectionName, consoleName, gamesCollection, gameName) // The view count is updated here, but falsely updated on the page. The process was done this way because there was next to no way to properly updated the state in Firebase and have that number represented on the page.
                        navigation.goBack()
                    }}>
                        <BackButton {...props} />
                    </Pressable>
                )

        }
    }
    /*----------------------------------------------*/

    function selectedGameStack() {
        const Stack = createNativeStackNavigator()
        return (
            <Stack.Navigator initialRouteName="PrimaryGamePage">
                <Stack.Screen
                    name="PrimaryGamePage"
                    component={PrimaryGamePageStructure}
                    options={ homeOptions()}
                />
                <Stack.Screen
                    name="SecondaryGamePage"
                    component={SecondaryGamePageStructure}
                    options={homeOptions()}
                    screenOptions={{ presentation: 'modal' }}
                />
            </Stack.Navigator>
        )
    }

    function gamePageStructure() {
        const loadingScreenText = 'sgParadise'
        const loadingScreenTextColor = colors.secondaryColor
        const loaderColor = colors.primaryFontColor
        return (
            isLoading !== true
                ?   <View style={{ flex: 1 }}>
                        {selectedGameStack()}
                </View>
                :  <View style={{ flex: 1 }}>
                        {preLoadedData(loadingScreenText, loadingScreenTextColor, loaderColor)}
                </View>
        )
    }

    return (
        gamePageStructure()
    )
}